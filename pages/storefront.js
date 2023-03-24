import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

function Storefront ({ animojis }){
	// const vouchers = log(sum(user.clicks)) - user.clickers.length;

  return (
		<>
			<div className='wealth-indicator'>
				{`vouchers > 0 ? vouchers > 1 ? You can afford VOUCHERS clickers right now! : You can afford a clicker right now! : You cannot afford another clicker right now. 😿`}
			</div>
			<div className='sort-menu'>Sort by:
				<p>
					<span>🪨EARTH🪨</span>
					<span>🔥FIRE🔥</span>
					<span>🌬WIND🌬</span>
					<span>🌊WATER🌊</span>
					<span>💝HEART💝</span>
				</p>
			</div>
			<div className='store'>
				{animojis.map((emoji) => {
					return (
						<img key={`product-${emoji.id}`} src={emoji.imageUrl} alt={emoji.name} />
					)
				})}
			</div>
		</>
  )
}
export async function getServerSideProps() {
  let { data } = await supabase.from('emotes').select()

  return {
    props: {
     animojis: data
    },
  }
}

export default Storefront

/*

<style jsx></style>

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
*/
