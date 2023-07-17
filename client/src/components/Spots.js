import SpotCard from './SpotCard'
import { useEffect, useState } from 'react'

const Spots = ({ spots }) => {
    const [userSpots, setUserSpots] = useState([])

    useEffect(() => {
        fetch('/my-spots')
        .then((r) => r.json())
        .then(data => setUserSpots(data))
    }, [])

    const mappedSpots = spots.map(spot => <SpotCard key={spot.id} spot={spot} userSpots={userSpots} />) 

    return(
        <div>
            {mappedSpots}
        </div>
    )
}

export default Spots