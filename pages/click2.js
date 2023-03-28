import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react'
import Navbar from '@/components/ NavBar';



export default function Home({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(null);
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
  // const clicker = () => {
  //   points++
  // };

  async function updateGame({ avatar_url, username, points }) {
    try {
      setLoading(true)
      points++
      setPoints(points)
      const updates = {
        id: user.id,
        username,
        avatar_url,
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
  const handleReset = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ points: 0 })
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setPoints(data.points);
  };


  return (
    <div>
      <Navbar/>
      <h1>Welcome, {username}!</h1>
      <p>Points: {points}</p>
      <button
          className="button primary block"
          onClick={() => updateGame({points})}
          disabled={loading}
        >
          <img src={avatar_url}/>
        </button>
      <button onClick={handleReset}>Reset Points</button>

    </div>
  );
}

