import { useState, useEffect } from "react"
import MySpotsCard from "./MySpotsCard"

const MySpots = ({addSpot}) => {
    const [userSpots, setUserSpots] = useState([])
    
    useEffect(() => {
        fetch('/my-spots/:id')
        .then((r) => r.json())
        .then((data) => setUserSpots(data))
    }, [])

    const mappedUserSpots = userSpots.map(spot => <MySpotsCard spot={spot}
    key={spot.id} />)

    return (
        <div>
            {mappedUserSpots}
        </div>
    )
}

export default MySpots