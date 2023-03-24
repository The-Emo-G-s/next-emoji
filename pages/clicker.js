import { supabase } from './../lib/supabaseClient';

function Clicker({ emojis }) {
    return (
      <ul>
        {emojis.map((emoji) => (
          <li key={emoji.id}><img src={emoji.imageUrl} alt=''/></li>
        ))}
      </ul>
    );
  }

  export async function getServerSideProps() {
    let { data } = await supabase.from('emojis').select()

    return {
      props: {
       emojis: data
      },
    }
  }

export default Clicker;