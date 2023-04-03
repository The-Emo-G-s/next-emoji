import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

function Account({ session, animojis }) {
  const supabase = useSupabaseClient()
  const user = useUser()

	const [data, setData] = useState(animojis);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [url, setUrl] = useState(null)
	const [isFilteredBy, setIsFilteredBy] = useState('');


	const filterAnimojis = (value)=> {
		if (isFilteredBy === value) {
			setData(animojis.filter(emoji => emoji.department === ''));
			setIsFilteredBy('');
		} else {
			setIsFilteredBy(value);
			setData(animojis.filter(emoji => emoji.department === value));
		}
	}


  useEffect(() => {
		getProfile();
		filterAnimojis();
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
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
    <div className="form-widget">
      <h1 className="username-title">Welcome{username && ` back, ${username}`}!</h1>
			<div id = 'avatar'>{url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/' && <img className='username-img' src={url} />}</div>
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
        <button className="button primary block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
				<Link className="button primary block" href='/'>My Clicker Game!</Link>
        <Link className="button primary block" href='/leaderboard'>LeaderBoard</Link>
      </div>
			<div className='store'>
				<h1>Choose a category below to find your ANIMOJI!</h1>
				<div className='sort-menu'>
					<p>
          <div className='buttons'>
          <Stack direction="row" spacing={2}> 
						<button
              id='filerButton' 
							className={isFilteredBy === 'earth' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("earth")}} >
								🪨 EARTH 🪨
						</button>
						<button 
              id='filerButton'
							className={isFilteredBy === 'fire' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("fire")}} >
								🔥 FIRE 🔥
						</button>
						<button 
              id='filerButton'
							className={isFilteredBy === 'wind' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("wind")}} >
								🌬 WIND 🌬
						</button>
						<button 
              id='filerButton'
							className={isFilteredBy === 'water' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("water")}} >
								🌊 WATER 🌊
						</button>
						<button 
              id='filerButton'
							className={isFilteredBy === 'heart' ? 'active-filter-button' : 'filter-button'}
							onClick={()=> {filterAnimojis("heart")}} >
								💝 HEART 💝
						</button>
          </Stack>
          </div>
					</p>

				</div>
            <Grid container rowSpacing={6} columnSpacing={{ xs: 6}} wrap='wrap'>              
				{data.sort((a,b) => a.name.localeCompare(b.name)).map((emoji) => {
					return (
            <Grid xs={3} wrap='wrap'>
              <button id = "emoji-select"
                key={`product-${emoji.name}`}
                onClick={(event)=> {
                  setUrl(event.target.src)}}>
                <img src={emoji.imageUrl} alt={emoji.name} />
              </button>         
               </Grid>
          )})}

        </Grid>
			</div>
    </div>
    <style jsx>{`
      h1 {
        display: flex;
        justify-content: center;
      }
      
      #filterButton:active {
        background-color: white;
      }
      
      #avatar {
        display: flex;
        justify-content: center;
      }`}
    </style>
    </>
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
