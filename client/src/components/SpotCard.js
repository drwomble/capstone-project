
const SpotCard = ({spot}) => {

    return(
        <div>
            <h3>{spot.name}</h3>
            <span>{spot.location}</span>
            <img src={spot.image} alt='picture of spot' />
            <span>{spot.description}</span>
        </div>
    )
}
export default SpotCard