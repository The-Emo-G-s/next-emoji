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
    <Link href='/earth' className='right'>Earth Em🌏jis</Link>
    <Link href='/wind' className='right'>Wind Em🌬jis</Link>
    <Link href='/fire' className='left'>Fire Em🔥jis</Link>
    <Link href='/water' className='left'>Water Em💦jis</Link>
    <Link href='/heart' className='left'>Heart Em❤️jis</Link>
    </div>
    </div>
    )
    }

export default Home;
