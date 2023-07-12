import { Link } from 'react-router-dom'
import { useState } from 'react'

const Nav = ({ user }) => {
    // const [toggleButton, setToggleButton] = useState(false)

    // const handleToggle = () => setToggleButton(current => !current)

    return (
        <nav>
            <Link to='/'>
                <img alt='logo goes here'/>
                <span>Skate Exchange</span>
            </Link>
            <ul>
                <li>
                    <Link to='/decks'>Decks</Link>
                </li>
                <li>
                    <Link to='/spots'>Spots</Link>
                </li>
                <li>
                    <Link to={user ? '/signout' : '/signin'}>
                        {user ? 'SignOut' : 'SignIn'}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav