import DeckCard from './DeckCard'
import { useContext } from 'react'
import { DeckContext } from './context/deckContext'

const Decks = () => {
    const {decks} = useContext(DeckContext)

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} />))

    return (
        <div>
            {mappedDecks}
        </div>
    )
}
export default Decks