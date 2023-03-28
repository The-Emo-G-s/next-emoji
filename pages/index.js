import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/ NavBar';
import Link from 'next/link';
import Account from '@/components/Account';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { useState } from 'react';
import Storefront from './storefront';

const Home = ({ animojis }) => {
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
				<button className="button block">
        <Link href='/storefront'>Store </Link>
        </button>
        </>
      )}
			<Navbar/>
			{/* <div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div> */}
			<Storefront animojis={animojis}/>
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

export default Home;
