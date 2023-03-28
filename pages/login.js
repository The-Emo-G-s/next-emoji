import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account';
import Link from 'next/link';
import Navbar from '@/components/ NavBar';
import Storefront from './storefront';
import { supabase } from '../lib/supabaseClient';
import Clicker from '@/pages/clicker';

const Login = ({ animojis }) => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
    <Navbar/>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>

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
        <Link href='/clicker'>Your Game</Link>
				<Storefront animojis={animojis} />
        </button>
        </>
      )}
    </div>
    </div>
  )
}

export async function getServerSideProps() {
  let { data } = await supabase.from('emotes').select()

  return {
    props: {
    	animojis: data
    },
  }
}

export default Login
