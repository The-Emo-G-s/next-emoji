import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../styles/globals.css'
import Navbar from '@/components/ NavBar'

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mode') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    if (mode === 'light') {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#000000'
    } else {
      document.body.style.backgroundColor = '#1c1c1c'
      document.body.style.color = '#ffffff'
    }
    localStorage.setItem('mode', mode)
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}>
        <Navbar/>
        <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp
