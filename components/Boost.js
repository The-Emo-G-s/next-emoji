import React from 'react'

const Boost = ({ power, onActivate }) => {
	return (
		<div>
			Would you like to upgrade your clicks to get {power} points per click??
			<button onClick={()=> onActivate()}>👍🏽</button>
		</div>
	)
}

export default Boost
