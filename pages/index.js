import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/ NavBar';
import Link from 'next/link';
import Account from '@/components/Account';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { useState } from 'react';
import Storefront from './storefront';

const Home = ({ data }) => {
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
        <Link href='/click2'>Your Game </Link>
        </button>
				<button className="button block">
        <Link href='/storefront'>Store </Link>
        </button>
        </>
      )}
			{/* <Navbar/> */}
			{/* <div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div> */}
			{/* <Storefront animojis={data}/> */}
    </div>
  )
}

export async function getStaticProps() {
	let { data: profiles } = await supabase.from('profiles').select('id, username, points')

	return {
		props: {
			profiles
		},
	}
}

export default Home;
