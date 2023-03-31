import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';
import Boost from './Boost';

export default function Clicker ({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
	const [levelUps, setLevelUps] = useState(0);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState({});
	const [arrOfBoosts, setArrOfBoosts] = useState([]);





	async function resetGame() {
		try {
			setLoading(true)
			setPoints(0);
			setArrOfBoosts([]);
			setLevelUps(0);
			console.log(points)
			const updates = {
				id: user.id,
				points,
				updated_at: new Date().toISOString(),
			}

 await supabase.from('profiles').upsert(updates)
			console.log('Point added!')
		} catch (error) {
			alert('Error updating the data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}







  useEffect(() => {
    getGame()
  }, [session])

async function getCurrentUser() {
  const{
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    throw error
  }
  if(!session?.user){
    throw new Error('you are not logged in')
  }
  return session.user
}
  async function getGame() {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setPoints(data.points)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateGame({ points }) {
		// console.log('points.init:', points, "levelUps.init:", levelUps)
		try {
			setLoading(true)
			points++
      setPoints(points);
			if(points > 1 && Math.floor(Math.log10(points)) === Math.floor(Math.log10(points - 1)) + 1) {
				console.log('leveling up')
				setArrOfBoosts([...arrOfBoosts, levelUps + 1])
				setLevelUps(levelUps + 1 );
			}
      const updates = {
				id: user.id,
        points,
        updated_at: new Date().toISOString(),
      }
			await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
			alert('Error updating the data!')
      console.log(error)
    } finally {
			setLoading(false)
    }
		console.log("The level is:", levelUps, "The Boosts array is:");
		console.log(arrOfBoosts)
  }
  async function auto({points}) {
    try {
      setLoading(true)
      if(points >= 10){
const interval = setInterval(() => {
  setPoints((points) => points+ 1)
}, 1000)}
      const updates = {
        id: user.id,
        points: points,
        updated_at: new Date().toISOString(),
      }

 await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  async function save({points}) {
    try {
      console.log(points, 'first')
  setPoints(points)
  console.log(points, 'points')
      const updates = {
        id: user.id,
        points: points,
        updated_at: new Date().toISOString(),
      }

 await supabase.from('profiles').upsert(updates)
      // alert('Point added!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
			{avatar_url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/'
				? <>
						<h1>Click Away{username && `, ${username}`}!</h1>
     		 		<p>Points: {points.toLocaleString("en-US")}</p>
              <button onClick={() => save({points})}> 🛟 Save</button>
              <br></br>
						<button
								id='emoji-button'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img src={avatar_url}/>
						</button>
						<br></br>
						<h2> 🛗 Boosts:</h2>
						{levelUps > 0
						? 
							<>
								fyi, this is working... Don't ask what "this" means
								{}
							</> 
						: null
						}
						{/* {upgrades.filter(upgrade => upgrade.level >= level).map((upgrade) => (
							<button key={upgrade.name}
								onClick={() => purchaseUpgrade(upgrade)}
								disabled={points < upgrade.cost}>
								{upgrade.name} ({upgrade.cost} points):{" "}
								{purchasedUpgrades[upgrade.name] || 0} purchased (
								{upgrade.description})
							</button>
						))} */}
						<button style={{backgroundColor:"firebrick"}}onClick={() => resetGame(points)}>Reset Points</button>
					</> 
				: <div>
						<h1>Head to the ACCOUNT link above to set your ANIMOJI, then come back to start clicking!!!!</h1>
						{/* insert carousel for bored eyes */}
					</div>
			}

			


<button onClick={() => auto({points})}> 🚀 Activate Boost</button>
    </div>
  );
}

