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
        <section className="grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
            <div className="product">
                <img src={deck.image} alt='Skateboard Deck' className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"/>
                <div className='flex flex-col justify-between p-4 leading-normal'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{deck.deck_name}</h5>
                    <a className="mb-2 text-1xl font-bold tracking-tight text-gray-900">by <span>{deck.brand}</span></a>
                    <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900">Price: ${deck.price}</h5>
                </div>
            </div>
            <form action='/create-checkout-session' method='POST'>
                <button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' type='submit'>Buy Now</button>
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
                    <button  className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleEditToggle}>Edit Listing</button>
                    <div>{editToggle ? <EditDeck key={deck.id} deck={deck} handleEditToggle={handleEditToggle}/> : null}</div>
                    <button onClick={handleDelete} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete Listing</button>
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