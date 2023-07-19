import DeckCard from './DeckCard'
import { useContext } from 'react'
import { DeckContext } from './context/deckContext'

const Decks = ({user}) => {
    const {decks} = useContext(DeckContext)

    const mappedDecks = decks.map((deck => <DeckCard key={deck.id} deck={deck} user={user} />))

    return (
        <body className="flex flex-col w-screen min-h-screen p-10 bg-gray-100 text-gray-800">
            <h1 className="text-3xl">Decks For Sale</h1>
            {mappedDecks}
        </body>
    )
}
export default Decks