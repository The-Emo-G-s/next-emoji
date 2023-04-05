import { useEffect, useState } from 'react';
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';
import 'animate.css';
import JSConfetti from 'js-confetti'
import Stack from '@mui/material/Stack';

export default function Clicker ({session}) {
  const jsConfetti = new JSConfetti()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activated, setActivated] = useState(false);
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
				setPowerOf10(Math.floor(Math.log10(data.points)));
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
			if(powerOf10 < Math.floor(Math.log10(points))) {
				setPowerOf10(Math.floor(Math.log10(points)));
				setActivated(false);
			}
		} catch (error) {
			alert('Error updating the data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
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
	
	const activateBoost = ()=> {
		setActivated(true);
		if(powerOf10 === 3) {
			setClickMultiplier(10 * (1 + powerOf10) ** 2);
		} else if (powerOf10 > 3) {
			setClickMultiplier((10 ** (powerOf10 - 3) * (1 + powerOf10) ** 2) / (powerOf10 - 3));
		} else {
			setClickMultiplier((1 + powerOf10) ** 2);
		}
	}
	
	return (
		<div>
			{avatar_url?.slice(0, 35)==='https://em-content.zobj.net/thumbs/'
				? <>
						<h1 className='title-'>Click Away{username && `, ${username}`}!</h1>
     		 		<p className='title-'>Points: {points.toLocaleString("en-US")}</p>
              <br></br>
			  		<div className='emoji'>
						<button
								className='pointss'
								onClick={() => updateGame({points})}
								disabled={loading}>
									<img className="animoji"
										src={avatar_url}/>
						</button>
					</div>
						<br></br>
						<Stack
							direction="row"
							spacing={3}
							justifyContent='center'>
						<button onClick={(event) => {jsConfetti.addConfetti({emojis: ['💾'],}) && save({points})}}> 🛟 Save</button>
						</Stack>
     		 		<p className='title-'>Points per click: {clickMultiplier}</p>
						<h2>🚀 Boosts:</h2>
						<div className='boost-container'>
							{powerOf10 >= 1
							?
							<>
									You're next boost comes after {(10 ** (1 + Math.floor(Math.log10(points)))).toLocaleString("en-US")} - keep clicking!!
											<div className='boost-bar' style={{borderColor:"white", borderWidth: "2px", borderStyle: "dotted"}}>
												<h3>{!activated && `Horray, you've unlocked a boost! Activate increase your points per click!`}</h3>
												<button
													className={`boost-button${activated ? '-activated' : null}`}
													onClick={(event)=> {
														jsConfetti.addConfetti({emojis: ['🎉', '🎊', '🥳'],})
														activateBoost()}}
													>{activated ? '🎉 🎊 🥳 🎊 🎉' : 'Activate'}</button>
											</div>
								</>
							: null
						}
						</div>
						<style jsx>
							{`
							.emoji {
								display: flex;
								justify-content: center;
							}
							`}
						</style>
					</>
				: <div>
						<h1>Head to your ACCOUNT page to set your ANIMOJI, then come back to start clicking!!!!</h1>
						{/* insert carousel for bored eyes */}
					</div>
			}
    </div>
  );
}
