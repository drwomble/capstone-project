import DeckCard from './DeckCard'

const Decks = ({ decks }) => {

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} />))

    return (
        <div>
            {mappedDecks}
        </div>
    )
}
export default Decks