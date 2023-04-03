import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Clicker from '../components/Clicker';


const Home = () => {
	const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
        providers={["github", "google", "slack", "discord"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark" />
      ) : (
        <>
        {/* <Account session={session} /> */}
        {/* <button className="button block">
        <Link href='/click2'>Your Game </Link>
        </button> */}
        <Link href='/account'>
				<button className="button block">Account</button>
        </Link>
        <Link href='/leaderboard'>
				<button className="button block">LeaderBoard</button>
        </Link>
        <Clicker/>
        </>
      )}
			{/* <Navbar/> */}
			{/* <div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div> */}

    </div>
  )
}

// export async function getStaticProps() {
// 	let { data: profiles } = await supabase.from('profiles').select('id, username, points')

// 	return {
// 		props: {
// 			profiles
// 		},
// 	}
// }
export async function getStaticProps() {
	let { data: animojis } = await supabase.from('animojis').select(`*`)

	return {
		props: {
			animojis
		},
	}
}
// export async function getServerSideProps() {
// 	let { data } = await supabase.from('animojis').select()

// 	return {
// 		props: {
// 			animojis: data
// 		},
// 	}
// }

export default Home;
