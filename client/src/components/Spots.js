import SpotCard from './SpotCard'
// import { useEffect, useState } from 'react'

const Spots = ({ spots }) => {

    const mappedSpots = spots.map(spot => <SpotCard key={spot.id}          spot={spot}  />) 

    return(
        <body className="grid grid-cols-3 w-screen min-h-screen p-10 bg-gray-100 text-gray-800">
            {mappedSpots}
        </body>
    )
}

export default Spots