import { useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/auth';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';
import 'animate.css';
import JSConfetti from 'js-confetti'

export default function Clicker ({session}) {
  const jsConfetti = new JSConfetti()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
	const [levelUps, setLevelUps] = useState(0);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
	const [arrOfBoosts, setArrOfBoosts] = useState([]);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [powerOf10, setPowerOf10] = useState(0);


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
  }


  async function updateGame({ points }) {
		try {
			setLoading(true)
			points = points + (1 * clickMultiplier);
      		setPoints(points);
			setPowerOf10(Math.floor(Math.log10(points)));
			console.log("points are", points, "powerOf10 is", powerOf10)
			if(powerOf10 > 0 && !arrOfBoosts.includes(powerOf10)) {
				setArrOfBoosts([...arrOfBoosts, powerOf10])
			}
		} catch (error) {
			alert('Error updating the data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
		console.log("The Boosts array is:");
		console.log(arrOfBoosts)
	}


	async function save({points}) {
		try {
			setPoints(points)
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

	const activateBoost = (power)=> {
		// usedBoost[power] = true;
		setClickMultiplier(power+1)
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
								className='pointss'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img
										src={avatar_url}/>
						</button>
						<br></br>
						<button onClick={() => save({points})}> 🛟 Save</button>
							<button style={{backgroundColor:"firebrick"}}onClick={() => resetGame(points)}>Reset Points</button>
							{/* <button onClick={() => auto({points})}> 🚀 Activate Boost</button> */}
						<h2>🚀 Boosts:</h2>
						<div className='boost-container'>
							{arrOfBoosts.length
							?
							<>
									Horray, you've unlocked a boost! You're next boost comes after {Math.pow(10, arrOfBoosts[arrOfBoosts.length - 1] + 1).toLocaleString("en-US")} - keep clicking!!
									{arrOfBoosts?.map((power)=> {
										return(
											<div key={`boost-${power}`} className='boost-bar' style={{borderColor:"white", borderWidth: "2px", borderStyle: "dotted"}}>
												<h3>You've unlocked a Boost! Activate to make every click worth {power + 1} points!</h3>
												<button
													className='boost-button'
													onClick={(event)=> {
                            jsConfetti.addConfetti({
                              emojis: ['🎉', '🎊', '🥳'],
                           })
														console.log(event.target)
														activateBoost(power)
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


// if(points > 1 && Math.floor(Math.log10(points)) === Math.floor(Math.log10(points - 1)) + 1) {
// 	console.log('leveling up')
// 	setArrOfBoosts([...arrOfBoosts, levelUps + 1])
// 	setLevelUps(Math.floor(Math.log10(points)));
// }


	// const updateBoosts = (points)=> {
	// 	console.log('The updateBoosts function is running on', points, "points.")
	// 	if(points > 1) {
	// 		console.log("Points IS greater than 1, so we'll set the levelUps to be:");
	// 		console.log(Math.floor(Math.log10(points)));
	// 		levelUps = Math.floor(Math.log10(points))
	// 		setLevelUps(levelUps);
	// 	}
	// 	// for(let i = 0; i < levelUps; i++) {
	// 	// 	setArrOfBoosts([...arrOfBoosts, levelUps + 1]);
	// 	// }
	// }



		// async function auto({points}) {
	// 	const interval = setInterval(async()=> {
	// 		try {
	// 			setLoading(true)
	// 			const interval = setInterval(async() => {
	// 				setPoints((points) => points+ 1)
	// 				const updates = {
	// 					id: user.id,
	// 					points: points,
	// 					updated_at: new Date().toISOString(),
	// 				}
	// 				await supabase.from('profiles').upsert(updates)
	// 				console.log('Good thing happened!')
	// 			}, 1000)
	// 		} catch (error) {
	// 			alert('Error updating the data!')
	// 			console.log(error)
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}, 1000)
	// }
