import {useState, useEffect, createContext} from 'react'

const DeckContext = createContext()

const DeckProvider = ({children}) => {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        fetch('/decks')
        .then(r => r.json())
        .then(data => setDecks(data))
    }, [])
    
    const addDeck = (newDeck) => setDecks([...decks, newDeck])

    const handleDeckDelete = (deckToDelete) => {
        setDecks(decks => decks.filter((deck) => deck.id !== deckToDelete.id))
    }

    const handleDeckEdit = (updatedDeck) => {
        const updatedDecks = decks.map((deck) => {
        if (deck.id === updatedDeck.id){
            return updatedDeck
        } else {
            return deck 
        }
        });
        setDecks(updatedDecks)
    }



    return (
        <DeckContext.Provider value={{decks, addDeck, handleDeckDelete, handleDeckEdit}}>
            {children}
        </DeckContext.Provider>
    )
}

export {DeckContext, DeckProvider}