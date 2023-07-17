import DeckCard from './DeckCard'

const Decks = ({ decks, handleDeckEdit, handleDeckDelete }) => {

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} handleDeckEdit={handleDeckEdit} handleDeckDelete={handleDeckDelete} />))

    return (
        <div>
            {mappedDecks}
        </div>
    )
}
export default Decks