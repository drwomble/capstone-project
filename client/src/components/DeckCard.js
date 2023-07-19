import EditDeck from "./EditDeck"
import { useState, useContext, useEffect } from "react"
import { DeckContext } from "./context/deckContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Checkout from "./Checkout"



const DeckCard = ({ deck, user }) => {
    const [editToggle, setEditToggle] = useState(false)
    const history = useHistory()
    const {handleDeckDelete} = useContext(DeckContext)
    const [message, setMessage] = useState("")

    const ProductDisplay = () => (
        <section>
            <div className="product">
                <img src={deck.image} alt='Skateboard Deck' />
                <div className='description'>
                    <h3>{deck.deck_name}</h3>
                    <a>by <span>{deck.brand}</span></a>
                    <h5>Price: ${deck.price}</h5>
                </div>
            </div>
            <form action='/create-checkout-session' method='POST'>
                <button type='submit'>Buy Now</button>
            </form>
            {user ? handleDisplayButtons() : null}
        </section>
    );

    const Message = ({ message }) => (
        <section>
            <p>{message}</p>
        </section>
    )

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)

        if (query.get('success')) {
            setMessage('Order placed! You will recieve an email confirmation.')
        }

        if (query.get('canceled')) {
            setMessage("Order canceled -- continue to shop and checkout when you're ready.")
        }
    }, [])


    const handleEditToggle = () => setEditToggle(current => !current)

    const handleDelete = () => {
        fetch(`/decks/${deck.id}`, {
            method: 'DELETE',
        }).then((r) => {
            if(r.ok){
                handleDeckDelete(r)
                alert('Listing deleted.')
                history.push('/')
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    const handleDisplayButtons = () => {
        if (user.id === deck.user_id){
            return (
                <div>
                    <button onClick={handleEditToggle}>Edit Listing</button>
                    <div>{editToggle ? <EditDeck key={deck.id} deck={deck} handleEditToggle={handleEditToggle}/> : null}</div>
                    <button onClick={handleDelete}>Delete Listing</button>
                </div>
            )
        } else {
            return null
        }
    }

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    )
}

export default DeckCard