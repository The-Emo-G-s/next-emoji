import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account';
import Link from 'next/link';

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
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
        <Link href='/page'>Blog</Link>
        </button>
        </>
      )}
    </div>
  )
}

export default Home