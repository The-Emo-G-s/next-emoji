import { useEffect, useState, useRef } from 'react';

function Carousel ({ animojis }){
	const [displayIndex, setDisplayIndex] = useState(0);
	const autoPlayRef = useRef();
	
	const nextEmoji = ()=> {
		if (displayIndex === 24) {
			setDisplayIndex(0);
		} else {
			setDisplayIndex(displayIndex + 1);
		}
	}
	
	useEffect(()=> {
		autoPlayRef.current = nextEmoji
	})
	
	useEffect(()=> {
		const play = ()=> {
			autoPlayRef.current();
		}
		const interval = setInterval(play, 4000);
		return () => clearInterval(interval);
	}, [])
	
  return (
		<>
			<img id='carousel-pic' src={animojis[displayIndex].url} />
		</>
  )
}

export default Carousel
