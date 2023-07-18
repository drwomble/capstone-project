import DeckCard from './DeckCard'
import { useContext } from 'react'
import { DeckContext } from './context/deckContext'

const Decks = ({user}) => {
    const {decks} = useContext(DeckContext)

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} user={user} />))

    return (
        <body>
        <div>
            {mappedDecks}
        </div>
        </body>
    )
}
export default Decks