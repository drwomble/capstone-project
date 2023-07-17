import DeckCard from './DeckCard'

const Decks = ({ decks, handleDeckEdit }) => {

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} handleDeckEdit={handleDeckEdit} />))

    return (
        <div>
            {mappedDecks}
        </div>
    )
}
export default Decks