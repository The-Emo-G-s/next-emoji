import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/supabaseClient'

export default function Profile({ profiles }) {
  return <div>Hello {profiles.username}</div>
}

// export const getServerSideProps = async () => {
//   // Create authenticated Supabase Client
// const response = await supabase.from('profiles')
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (!session)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }

//   return {
//     props: {
//       initialSession: session,
//       profiles: session.profiles,
//     },
//   }
// }
