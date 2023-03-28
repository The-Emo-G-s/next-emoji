import { supabase } from "@/utils/supabaseClient";

const UserProfile = ({profile}) => {
  return <pre>{JSON.stringify(profile, null, 2)}</pre>

}

export const getStaticPaths = async () => {
	let { data: profiles } = await supabase.from('profiles').select('id')

  const paths = profiles.map(({id}) => ({
    params: {
      id,
    },
  }))

	return {
		paths: {
			fallback: false
		},
	}
}

export async function getStaticProps({ params: {id}}) {
	let { data: profile } = await supabase
  .from('profiles')
  .select('id, username, points, emoji')
  .match({ id })
  .single()

	return {
		props: {
			profile
		},
	}
}

export default UserProfile
