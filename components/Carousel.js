import { useEffect, useState } from 'react';
import Navbar from '@/components/ NavBar';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';

function Carousel ({ animojis }){
	const [displayIndex, setDisplayIndex] = useState(0);
	const [list, setList] = useState(animojis);

	const nextEmoji = (idx)=> {
		const isLast = displayIndex === animojis.length - 1;
		const nextIndex = isLast ? 0 : displayIndex + 1;
		setDisplayIndex(nextIndex);
	}

	// const sliderStyles = {
	// 	height: 100%,
	// 	position: relative
	// }

	// const emojiStyles = {
	// 	width: 100%,
	// 	height: 100%,
	// 	position: relative
	// }

	// useEffect
	setInterval(nextEmoji, 1365);

  return (
		<div>
			<div>{animojis[displayIndex].emoji}</div>
		</div>
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