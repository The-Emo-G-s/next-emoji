import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../styles/globals.css'
import Navbar from '@/components/ NavBar'

function MyApp({ Component, pageProps, animojis }) {
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #000000',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            alignSelf: 'flex-start',
            marginBottom: '1rem',
          }}
          onClick={toggleMode}
        >
          Swap Color Theme
        </button>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}

export default MyApp
