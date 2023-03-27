import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Navbar from '../components/ NavBar';
import Link from 'next/link';
import Account from '@/components/Account';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Navbar/>
      {!session ? (
        <Auth
        providers={["github", "google", "twitter"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark" />
      ) : (
        <>
        <Account session={session} />
        <button className="button block">
        <Link href='/clicker'>Your Game </Link>
        </button>
        </>
      )}
    </div>
  )
}

export default Home;
