import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'

const Nav = ({ user }) => {

    const handleMyProfile = () => {
        return (
            <li>
                <Link to={`/users/${user.id}`}>My Profile</Link>
            </li>
        )
    }
    return (
        <nav>
            <Link to='/'>
                {/* TODO add logo in when styling and  */}
                {/* src='Logo.png' */}
                <img alt='logo goes here' />
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
                    <Link to='/decks/new'>New Listing</Link>
                </li>
                <li>
                    <Link to='/spots/new'>New Spot</Link>
                </li>
                {user ? handleMyProfile() : null}
                <li>
                    <Link to={user ? '/signout' : '/signin'}>
                        {user ? 'SignOut' : 'SignIn'}
                    </Link>
                </li>
                <li>
                    <Link to='/signup'>SignUp</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav