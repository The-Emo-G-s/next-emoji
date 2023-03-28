
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react';

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    fetchProfile()
  }, [])
  async function update() {
    const { user, error } = await supabase.from('profiles').update({
      data: {
        points: points
      }
    })
    console.log('user:', user);
  }
  async function fetchProfile() {
    const profileData = await supabase.from('profiles').user()
    console.log("profileData: ", profileData)
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }
  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }
  if (!profile) return null
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={update}>Set Attribute</button>
    </div>
  )
}
