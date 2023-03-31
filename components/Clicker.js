import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react'


export default function Clicker ({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getGame()
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
  async function getGame() {
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
        setAvatarUrl(data.avatar_url)
        setPoints(data.points)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  async function updateGame({ avatar_url, username, points, autoclicks }) {
    try {
      setLoading(true)
      points++
      setPoints(points)
      const updates = {
        id: user.id,
        username,
        avatar_url,
        autoclicks,
        points,

        updated_at: new Date().toISOString(),
      }

 await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function auto({points}) {
    try {
      setLoading(true)
      if(points >= 10){
const interval = setInterval(() => {
  setPoints((points) => points+ 1)
}, 1000)}
      const updates = {
        id: user.id,
        points: points,
        updated_at: new Date().toISOString(),
      }

 await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  async function save({points}) {
    try {
      console.log(points, 'first')
  setPoints(points)
  console.log(points, 'points')
      const updates = {
        id: user.id,
        points: points,
        updated_at: new Date().toISOString(),
      }

 await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
			{avatar_url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/'
				? <>
						<h1>Click Away{username && `, ${username}`}!</h1>
     		 		<p>Points: {points.toLocaleString("en-US")}</p>
              <button onClick={() => save({points})}> 🛟 Save</button>
              <br></br>
						<button
								id='emoji-button'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img src={avatar_url}/>
						</button>
						<br></br>
					</>
				: <div>
						<h1>Head to the ACCOUNT link above to set your ANIMOJI, then come back to start clicking!!!!</h1>
						{/* insert carousel for bored eyes */}
					</div>
			}


<button onClick={() => auto({points})}> 🚀 Activate Boost</button>
    </div>
  );
}

