import { supabase } from '../utils/supabaseClient';
// import Image from 'next/image';
import { useState } from 'react';

function Storefront ({ animojis }){

	// const vouchers = log(sum(user.clicks)) - user.clickers.length;
	const [list, setList] = useState(animojis);
	const [filteredByEarth, setFilteredByEarth] = useState(1);
	const [filteredByFire, setFilteredByFire] = useState(1);
	const [filteredByWind, setFilteredByWind] = useState(1);
	const [filteredByWater, setFilteredByWater] = useState(1);
	const [filteredByHeart, setFilteredByHeart] = useState(1);

  return (
		<>
			{/* <div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div> */}
			<div className='sort-menu'>Sort by:
				<p>
					<button
						onClick={()=> {
							setList(animojis.filter(emoji => emoji.department === "earth"));
							setFilteredByEarth(true);
						}}
					>🪨EARTH🪨</button>
					<button
						onClick={()=> {
							setList(animojis.filter(emoji => emoji.department === "fire"));
							setFilteredByFire(true);
						}}
					>🔥FIRE🔥</button>
					<button
						onClick={()=> {
							setList(animojis.filter(emoji => emoji.department === "wind"));
							setFilteredByWind(true);
						}}
					>🌬WIND🌬</button>
					<button
						onClick={()=> {
							setList(animojis.filter(emoji => emoji.department === "water"));
							setFilteredByWater(true);
						}}
					>🌊WATER🌊</button>
					<button
						onClick={()=> {
							setList(animojis.filter(emoji => emoji.department === "heart"));
							setFilteredByHeart(true);
						}}
					>💝HEART💝</button>
				</p>
			</div>
			<div className='store'>
				{list.sort((a,b) => a.name.localeCompare(b.name)).map((emoji) => {
					return (
						<button
							key={`product-${emoji.name}`}
							// value={emoji.imageUrl}
							onClick={(event)=> {
								console.log(event.target.src)
								// console.log(event.target.value)
							}}
						>
							<img src={emoji.imageUrl} alt={emoji.name} />
						</button>
					)
				})}
			</div>
		</>
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

export default Storefront
