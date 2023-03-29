import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function Account({ session, animojis }) {
  const supabase = useSupabaseClient()
  const user = useUser()

	const [data, setData] = useState(animojis);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [url, setUrl] = useState(null)
  const [emoji, setEmoji] = useState(null)
	const [filtered, setFiltered] = useState(true);
	const [isFilteredBy, setIsFilteredBy] = useState('');

	const lookupObj = {
		earth: 'Here are animals that typically live on the ground!',
		fire: "Here are animals that don't currently exist.",
		wind: "Here are animals that fly!",
		water: "Here are animals that live in water!",
		heart: "Here are close-ups or variations of animals found in other categories!"
	}

	const filterAnimojis = (value)=> {
		if (isFilteredBy === value) {
			setData(animojis);
			setIsFilteredBy('');
		} else {
			setIsFilteredBy(value);
			setData(animojis.filter(emoji => emoji.department === value));
		}
	}


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
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        avatar_url,
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
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, avatar_url: url })}
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
				<h1>WHICH EMOJI ARE YOU??</h1>
				<div className='sort-menu'>Sort by:
					<p>
						<button 
							className={isFilteredBy === 'earth' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("earth")}} >
								🪨 EARTH 🪨
						</button>
						<button 
							className={isFilteredBy === 'fire' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("fire")}} >
								🔥 FIRE 🔥
						</button>
						<button 
							className={isFilteredBy === 'wind' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("wind")}} >
								🌬 WIND 🌬
						</button>
						<button 
							className={isFilteredBy === 'water' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("water")}} >
								🌊 WATER 🌊
						</button>
						<button 
							className={isFilteredBy === 'heart' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("heart")}} >
								💝 HEART 💝
						</button>
					</p>
					<p className='filter-description'>
						{isFilteredBy && lookupObj[isFilteredBy]}
					</p>
				</div>
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

export async function getServerSideProps() {
  let { data } = await supabase.from('animojis').select()

  return {
    props: {
     animojis: data
    },
  }
}