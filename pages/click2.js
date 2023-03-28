import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import {  useUser, useSession  } from '@supabase/auth-helpers-react'


// Create a function to handle inserts


export default function Home() {
  const handleInserts = (payload) => {
    console.log('Change received!', payload)
  }

  // Listen to inserts

  const session = useSession()
async function login ({ id }){
  const { data, error } = await supabase.auth.getSession()
  if(session){
  let { id } = await supabase
  .from('profiles')
      .update({ points })
      .eq('id', user.id)
      // console.log(id)
    if (error) {
      console.error(error);
      return;
    }
    setPoints(clicker);
  }
}
  const router = useRouter();
  const [points, setPoints] = useState(0);

  const clicker = () => {
    setPoints(points + 1);
  };


  // const session = useSession();
  // if(session){
  //   user = session.user.id

  // }


  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   router.push('/login');
  // };

  // const handleClick = async ({points}) => {
  //   const { data, error } = await supabase

  //     .from('profiles')
  //     .update({ points })
  //     .eq('id', id)
  //     console.log(id)
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }
  //   setPoints(clicker);
  // };

  // const handleReset = async () => {
  //   const { data, error } = await supabase
  //     .from('users')
  //     .update({ points: 0 })
  //     .eq('id', user.id)
  //     .single();

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   setPoints(data.points);
  // };

  return (
    <div>
      <h1>Clicker Game</h1>
      <p>Points: {points}</p>
      {/* <button onClick={clicker}>get points</button> */}
       <button onClick={login}>Click Me!</button>
      {/* <button onClick={handleReset}>Reset Points</button>
      <button onClick={handleLogout}>Log Out</button> */}
    </div>
  );
}
