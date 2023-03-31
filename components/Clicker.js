import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import { useRouter } from 'next/router';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';

export default function Clicker ({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
	const [levelUps, setLevelUps] = useState(0);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
	const [arrOfBoosts, setArrOfBoosts] = useState([]);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [boostActivated, setBoostActivated] = useState(0);





	async function resetGame() {
		try {
			setLoading(true)
			setPoints(0);
			setArrOfBoosts([]);
			setLevelUps(0);
			setClickMultiplier(1);
			console.log(points)
			const updates = {
				id: user.id,
				points,
				updated_at: new Date().toISOString(),
			}
			await supabase.from('profiles').upsert(updates)
			console.log('Points reset!')
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
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setPoints(data.points);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
		updateBoosts({points})
  }

	const updateBoosts = ({points})=> {
		if(points > 1) {
			setLevelUps(Math.floor(Math.log10(points)));
		}
		for(let i = 0; i < levelUps; i++) {
			setArrOfBoosts([...arrOfBoosts, levelUps + 1]);
		}
	}

  async function updateGame({ points }) {
		try {
			setLoading(true)
			points = points + (1 * clickMultiplier);
      setPoints(points);
			if(points > 1 && Math.floor(Math.log10(points)) === Math.floor(Math.log10(points - 1)) + 1) {
				console.log('leveling up')
				setArrOfBoosts([...arrOfBoosts, levelUps + 1])
				setLevelUps(Math.floor(Math.log10(points)));
			}
      const updates = {
				id: user.id,
        points,
        updated_at: new Date().toISOString(),
      }
			await supabase.from('profiles').upsert(updates)
      // alert('Type an alert description here!')
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
		const interval = setInterval(async()=> {
			try {
				setLoading(true)
				if(points >= 10){
					const interval = setInterval(async() => {
						setPoints((points) => points+ 1)
						const updates = {
							id: user.id,
							points: points,
							updated_at: new Date().toISOString(),
						}
						await supabase.from('profiles').upsert(updates)
						console.log('Good thing happened!')
					}, 1000)}
			} catch (error) {
				alert('Error updating the data!')
				console.log(error)
			} finally {
				setLoading(false)
			}
		}, 1000)
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

	const activateBoost = async(power)=> {
		if (power % 2 !== 0) {
			auto();
		}
		else {
			setClickMultiplier(power)
		}
	}

  return (
    <div>
			{avatar_url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/'
				? <>
						<h1>Click Away{username && `, ${username}`}!</h1>
     		 		<p>Points: {points.toLocaleString("en-US")}</p>
              <br></br>
						<button
								id='emoji-button'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img src={avatar_url}/>
						</button>
						<br></br>
						<button onClick={() => save({points})}> 🛟 Save</button>
							<button style={{backgroundColor:"firebrick"}}onClick={() => resetGame(points)}>Reset Points</button>
							<button onClick={() => auto({points})}> 🚀 Activate Boost</button>
						<h2>🚀 Boosts:</h2>
						<div className='boost-container'>
							{levelUps > 0
							?
								<>
									Horray, you've unlocked a boost! You're next boost comes at {Math.pow(10, arrOfBoosts[arrOfBoosts.length - 1] + 1).toLocaleString("en-US")}
									{arrOfBoosts?.map((power)=> {
										return(
											<div key={`boost-${power}`} className='boost-bar' style={{borderColor:"white", borderWidth: "2px", borderStyle: "dotted"}}>
												<h3>You've unlocked a Boost! Activate to {power % 2 === 0 
													? 
														`make every click worth ${power} points!`
													: 
														`have your clicker click for you ${power} time every second!` 
												}</h3>
												{/* clever text for ? even numbers : odd numbers */}
												<button 
													className='boost-button'
													onClick={()=> {
														if(power % 2 !== 0) {
															auto({ points });
														} else {
															activateBoost(power);;
														}
													}}
													>Activate</button>
											</div>
										)
									})}
								</> 
							: null
							}
						</div>
					</>
				: <div>
						<h1>Head to the ACCOUNT link above to set your ANIMOJI, then come back to start clicking!!!!</h1>
						{/* insert carousel for bored eyes */}
					</div>
			}
    </div>
  );
}

