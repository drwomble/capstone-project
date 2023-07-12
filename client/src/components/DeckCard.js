
const DeckCard = ({ deck }) => {

    return(
        <div>
            <h3>{deck.deck_name}</h3>
            <span>{deck.brand}</span>
            <img src={deck.image}/>
            <span>{deck.price}</span>
        </div>
    )
}
export default DeckCard