import { useState, useEffect } from "react"

const Checkout = ({deck, user}) => {
    const [message, setMessage] = useState("")

    const ProductDisplay = () => (
        <section>
            <div className="product">
                <img src={deck.image} alt='Skateboard Deck' />
                <div className='description'>
                    <h3>{deck.name}</h3>
                    <h5>{deck.price}</h5>
                </div>
            </div>
            <form action='/create-checkout-session' method='POST'>
                <button type='submit'>Checkout</button>
            </form>
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

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    )
}
{/* <div>
            <h3>{deck.deck_name}</h3>
            <a>by </a>
            <span>{deck.brand}</span>
            <img src={deck.image} alt='picture of deck' />
            <span>Price: ${deck.price}</span>
            {user ? handleDisplayButtons() : null}
            <button onClick={() => handlePayement()} >BUY NOW</button>
        </div> */}
export default Checkout