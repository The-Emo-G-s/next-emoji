import { supabase } from './../lib/supabaseClient';

function Clicker({ emotes }) {
    return (
			<div>{emotes[0].name}</div>
      
    );
  }

  export async function getServerSideProps() {
    let { data } = await supabase.from('emotes').select()

    return {
      props: {
       emotes: data
      },
    }
  }

export default Clicker;
