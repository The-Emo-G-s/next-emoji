import { supabase } from '../lib/supabaseClient';

function Earth ({ emotes }){
  return (
      <ul>
        {emotes.map(emote => (
          <ul key={emote.id}><img src={emote.imageUrl} alt=''/></ul>
        ))}
      </ul>
  )
}
export async function getServerSideProps() {
  let { data } = await supabase.from('emotes').select('department')

  return {
    props: {
     emotes: data
    },
  }
}

export default Earth
