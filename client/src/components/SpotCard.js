import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SpotCard = ({spot, userSpots, handleSpotEdit, handleSpotDelete}) => {
    // const [toggle, setToggle] = useState(false)

    // const handleEdit = () => {
    //     const mappedUserSpots = userSpots.map(userSpot => {
    //         return userSpot
    //     })
    //     if(mappedUserSpots.spots === spot.id){
    //         setToggle(true)
    //     }
    //     // debugger
    // }
    

    return(
        <div>
            <h3>{spot.name}</h3>
            <span>{spot.location}</span>
            <img src={spot.image} alt='picture of spot' />
            <span>{spot.description}</span>
            <button onClick={() => handleSpotEdit()} >Edit Spot</button>
            <button onClick={() => handleSpotDelete()} >Delete Spot</button>
        </div>
    )
}

export default SpotCard