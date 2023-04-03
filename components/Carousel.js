import { useEffect, useState, useRef } from 'react';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';

function Carousel ({ animojis }){
	const [list, setList] = useState(animojis);
	const [displayIndex, setDisplayIndex] = useState(0);
	const autoPlayRef = useRef();
	
	const nextEmoji = ()=> {
		// const isLast = displayIndex === animojis.length - 1;
		// const nextIndex = isLast ? 0 : displayIndex + 1;
		// setDisplayIndex(nextIndex);
		if (displayIndex === 24) {
			setDisplayIndex(0);
		} else {
			setDisplayIndex(displayIndex + 1);
		}
	}
	
	// setInterval(nextEmoji, 10000);
	// clearInterval(nextEmoji);
	
	useEffect(()=> {
		autoPlayRef.current = nextEmoji
	})
	
	useEffect(()=> {
		const play = ()=> {
			autoPlayRef.current();
		}
		const interval = setInterval(play, 1000);
		return () => clearInterval(interval);
	}, [])
	
  return (
		<>
			<img id='carousel-pic' src={animojis[displayIndex].url} />
		</>
  )
}

export default Carousel