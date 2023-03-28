// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// import Account from '@/components/Account';
// import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/ NavBar';
import Link from 'next/link';
import { useState } from 'react';
import Storefront from './storefront';

const Home = ({ data }) => {
  	// const vouchers = log(sum(user.clicks)) - user.clickers.length;
	const [list, setList] = useState(data);
	const [filteredByEarth, setFilteredByEarth] = useState(1);
	const [filteredByFire, setFilteredByFire] = useState(1);
	const [filteredByWind, setFilteredByWind] = useState(1);
	const [filteredByWater, setFilteredByWater] = useState(1);
	const [filteredByHeart, setFilteredByHeart] = useState(1);

  return (
    <div className='container-home'>
			<Navbar/>
			{/* <div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div> */}
			<Storefront animojis={data}/>
    </div>
  )
}

export async function getServerSideProps() {
	let { data } = await supabase.from('emotes').select()

	return {
		props: {
			data: data
		},
	}
}

export default Home;
