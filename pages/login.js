import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account';
import Link from 'next/link';
import Navbar from '@/components/ NavBar';
import Storefront from './storefront';
import { supabase } from '../utils/supabaseClient';
import Clicker from '@/pages/clicker';
import { useRouter } from 'next/router';


const Login = ({animojis}) => {
  const session = useSession()
  const supabase = useSupabaseClient()


  return (
    <div>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>

      {!session ? (
        <Auth
        providers={["github", "google", "twitter"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark" />
      ) : (
        <>
        <Account session={session} animojis={animojis} />
        <button className="button block">
        <Link href='/click2'>Your Game</Link>
				{/* <Storefront animojis={animojis} /> */}
        </button>
        </>
      )}
    </div>
    </div>
  )
}

export async function getServerSideProps() {
  let { data } = await supabase.from('animojis').select()

  return {
    props: {
     animojis: data
    },
  }
}

export default Login
