import EditDeck from "./EditDeck"
import { useState } from "react"

//TODO Buttons need to conditionally render
const DeckCard = ({ deck, handleDeckEdit }) => {
    const [editToggle, setEditToggle] = useState(false)

    const handleEditToggle = () => setEditToggle(current => !current)

    const handleDelete = () => null

    return(
        <div>
            <h3>{deck.deck_name}</h3>
            <span>{deck.brand}</span>
            <img src={deck.image} alt='picture of deck' />
            <span>{deck.price}</span>
            <button onClick={handleEditToggle}>Edit Listing</button>
            <div>{editToggle ? <EditDeck key={deck.id} deck={deck} handleDeckEdit={handleDeckEdit} handleEditToggle={handleEditToggle}/> : null}</div>
            <button onClick={handleDelete}>Delete Listing</button>
        </div>
    )
}

export default DeckCard