import SpotCard from './SpotCard'

const Spots = ({ spots }) => {

    const mappedSpots = spots.map(spot => <SpotCard key={spot.id} spot={spot} />) 

    return(
        <div>
            {mappedSpots}
        </div>
    )
}

export default Spots