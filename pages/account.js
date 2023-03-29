import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account';
import Link from 'next/link';
import { supabase } from '../utils/supabaseClient';


const Login = ({animojis}) => {
  const session = useSession()
  const supabase = useSupabaseClient()

  
  return (
    <div>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>

      {!session ? (
        <Auth
        providers={["google"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark" />
      ) : (
        <>
        <Account session={session} animojis={animojis} />
        <button className="button block">
        <Link href='/clicker'>Your Game</Link>
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
