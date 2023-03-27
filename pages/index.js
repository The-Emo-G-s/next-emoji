// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// import Account from '@/components/Account';
// import Link from 'next/link';
import Navbar from '../components/ NavBar';
import Link from 'next/link';

const Home = () => {

  return (
    <div className='container-home'>
    <Navbar/>
    <div className='container-dept'>
    <div><Link href='/earth' className='right'>Earth Emojis</Link></div>
    <div><Link href='/wind' className='right'>Wind Emojis</Link></div>
    <div><Link href='/fire' className='left'>Fire Emojis</Link></div>
    <div><Link href='/water' className='left'>Water Emojis</Link></div>
    <div><Link href='/heart' className='left'>Heart Emojis</Link></div>
    </div>
    </div>
    )
    }

export default Home;
