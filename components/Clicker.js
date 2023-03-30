import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react'


const upgrades = [
  { name: "🐌 Boost", description: "+1 point per click", cost: 100 },
  {
    name: "🐛 Boost",
    description: "Automatically click every 2 seconds",
    cost: 1000,
  },
  { name: "🦋 Boost", description: "+1 point per second", cost: 10000 },
];

export default function Clicker ({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [clickerCount, setClickerCount] = useState(0);
  const [autoCount, setAutoCount] = useState(0);
  const [idleCount, setIdleCount] = useState(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState({});

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
    try {
      setLoading(true)
      points++
      setPoints(points)
      const updates = {
        id: user.id,
        username,
        avatar_url,
        autoclicks,
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
  }

	async function resetGame() {
		try {
			setLoading(true)
			setPoints(0)
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
  // const handleReset = async () => {
  //   const { data, error } = await supabase
  //     .from('users')
  //     .update({ points: 0 })
  //     .eq('id', user.id)
  //     .single();

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   setPoints(data.points);
  // };
  const purchaseUpgrade = (upgrade) => {
    if (points >= upgrade.cost) {
      setPoints(points - upgrade.cost);

      switch (upgrade.name) {
        case "Click Boost":
          setClickerCount(clickerCount + 1);
          break;
        case "Auto Clicker":
          setAutoCount(autoCount + 1);
          break;
        case "Idle Boost":
          setIdleCount(idleCount + 1);
          break;
        default:
          break;
      }

      setPurchasedUpgrades({
        ...purchasedUpgrades,
        [upgrade.name]: purchasedUpgrades[upgrade.name] + 1 || 1,
      });
    }
  };

  return (
    <div>
			{avatar_url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/' 
				? <>
						<h1>Click Away{username && `, ${username}`}!</h1>
     		 		<p>Points: {points.toLocaleString("en-US")}</p>
						<button
								id='emoji-button'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img src={avatar_url}/>
						</button>
						<br></br>
						<h2> 🌬 Boost:</h2>
						{upgrades.map((upgrade) => (
							<button key={upgrade.name}
								onClick={() => purchaseUpgrade(upgrade)}
								disabled={points < upgrade.cost}>
								{upgrade.name} ({upgrade.cost} points):{" "}
								{purchasedUpgrades[upgrade.name] || 0} purchased (
								{upgrade.description})
							</button>
						))}
					</> 
				: <div>
						<h1>Head to the ACCOUNT link above to set your ANIMOJI, then come back to start clicking!!!!</h1>
						{/* insert carousel for bored eyes */}
					</div>
			}

		<button onClick={() => resetGame(points)}>Reset Points</button>
			

    </div>
  );
}

