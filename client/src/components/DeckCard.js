import EditDeck from "./EditDeck"
import { useState, useContext } from "react"
import { DeckContext } from "./context/deckContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

//TODO Buttons need to conditionally render
const DeckCard = ({ deck }) => {
    const [editToggle, setEditToggle] = useState(false)
    const history = useHistory()
    const {handleDeckDelete} = useContext(DeckContext)

    const handleEditToggle = () => setEditToggle(current => !current)

    const handleDelete = () => {
        fetch(`/decks/${deck.id}`, {
            method: 'DELETE',
        }).then((r) => {
            if(r.ok){
                handleDeckDelete(r)
                alert('Listing deleted.')
                history.push('/decks')
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    return(
        <div>
            <h3>{deck.deck_name}</h3>
            <span>{deck.brand}</span>
            <img src={deck.image} alt='picture of deck' />
            <span>{deck.price}</span>
            <button onClick={handleEditToggle}>Edit Listing</button>
            <div>{editToggle ? <EditDeck key={deck.id} deck={deck} handleEditToggle={handleEditToggle}/> : null}</div>
            <button onClick={handleDelete}>Delete Listing</button>
        </div>
    )
}

export default DeckCard