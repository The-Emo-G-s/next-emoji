import Link from "next/link"
import Carousel from './Carousel'
import { getStaticProps } from "@/pages";
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';

const Navbar = ({ animojis }) => {
	// const containerStyles = {
	// 	width: 5%,
	// 	height: 30%,
	// 	margin: 0 auto
	// }

return (
  <div className="container-nav">
		{animojis[0].emoji}
    <span><Link href='/' className="link-home"><h1>CLICKER KINGD<span style={containerStyles}><Carousel slides={animojis.filter(emoji => emoji.O-like)} /></span>M</h1></Link></span>
		{animojis[animojis.length - 1].emoji}
  </div>
)
}
export default Navbar

export async function getServerSideProps() {
  let { data } = await supabase.from('animojis').select()

  return {
    props: {
     animojis: data
    },
  }
}