import { Link } from 'react-router-dom'
// import {NavBar, MobileNav, Typography, Button, IconButton} from '@material-tailwind/react';
// import { useState, useEffect } from 'react'

const Nav = ({ user }) => {

    const handleMyProfile = () => {
        return (
            <li>
                <Link to={`/users/${user.id}`} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>My Profile</Link>
            </li>
        )
    }
    return (
        <nav className='bg-white border-gray-200'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <Link to='/' className="flex items-center">
                <img alt='SkateExchange Logo' src='Logo.png' className='h-40 mr-3'/>
            </Link>
            <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li>
                    <Link to='/decks' className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Decks</Link>
                </li>
                <li>
                    <Link to='/spots' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>Spots</Link>
                </li>
                <li>
                    <Link to='/decks/new' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>New Listing</Link>
                </li>
                <li>
                    <Link to='/spots/new' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>New Spot</Link>
                </li>
                {user ? handleMyProfile() : null}
                <li>
                    <Link to={user ? '/signout' : '/signin'} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
                        {user ? 'SignOut' : 'SignIn'}
                    </Link>
                </li>
                <li>
                    <Link to='/signup' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>SignUp</Link>
                </li>
            </ul>
            </div>
            </div>
        </nav>
    )
}
export default Nav