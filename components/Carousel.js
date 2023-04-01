import { useEffect, useState } from 'react';
import Navbar from '@/components/ NavBar';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';

function Carousel ({ animojis }){
	const [list, setList] = useState(animojis);
	const [displayIndex, setDisplayIndex] = useState(0);
	// let displayIndex = 0;

	const nextEmoji = ()=> {
		const isLast = displayIndex === animojis.length - 1;
		const nextIndex = isLast ? 0 : displayIndex + 1;
		setDisplayIndex(nextIndex);
		// displayIndex = nextIndex;
	}

	setInterval(nextEmoji, 10000);
	clearInterval(nextEmoji);
	// const sliderStyles = {
	// 	height: 100%,
	// 	position: relative
	// }

	// const emojiStyles = {
	// 	width: 100%,
	// 	height: 100%,
	// 	position: relative
	// }

	useEffect(()=> {
	})

  return (
		<span>
			<span>{animojis[displayIndex].emoji}</span>
		</span>
  )
}
// export async function getServerSideProps() {
//   let { data } = await supabase.from('animojis').select()

//   return {
//     props: {
//      turtlepuff: data
//     },
//   }
// }

export default Carousel