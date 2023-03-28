import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';
import Storefront from '@/pages/storefront';

function Account({ session, animojis }) {
  const supabase = useSupabaseClient()
  const user = useUser()
	const [data, setData] = useState(animojis);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [url, setUrl] = useState(null)
  const [emoji, setEmoji] = useState(null)
  const [points, setPoints] = useState(0)

  useEffect(() => {
		getProfile();
  }, [session])

async function getCurrentUser() {
  const{
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    throw error
  }
  if(!session?.user){
    throw new Error('you are not logged in')
  }
  return session.user
}
  async function getProfile() {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setUrl(data.avatar_url)
        setEmoji(data.emoji)
        setPoints(points)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, points, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        avatar_url,
        points,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <h1>Welcome back, {username}!</h1>
        {/* <Avatar
        uid={user.id}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, avatar_url: url })
            }}
				data={animojis}
        /> */}
				<img src={url} />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="points">Points:</label>
        <input
          id="points"
          type="number"
          value={points || ''}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, points, avatar_url: url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
			<div className='store'>
				{data.sort((a,b) => a.name.localeCompare(b.name)).map((emoji) => {
					return (
						<button 
							key={`product-${emoji.name}`}
							onClick={(event)=> {
								setUrl(event.target.src)
							}}
						>
							<img src={emoji.imageUrl} alt={emoji.name} />
						</button>	
					)
				})}
			</div>
    </div>
  )
}

export default Account

