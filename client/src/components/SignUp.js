//TODO change alert and add validations

import { useState } from 'react';
import { useHistory } from 'react-router-dom/';

const SignUp = ({ handleUser }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [bio, setBio] = useState("")
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUserObj = {
            username: username,
            email: email,
            password_hash: password,
            profile_picture: profilePicture,
            bio: bio
        }
        fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserObj)
    })
    .then((r) => {
        if(r.ok){
            r.json().then(handleUser)
            alert('Account successfully created. Returning you to home...')
            history.push('/')
            window.location.reload()
        } else {
            alert('Something went wrong, please try again.')
        }
    })
    }

    const handleButton = () => history.push('/signin')

    return (
        <div className="px-40">
            <form onSubmit={handleSubmit}>
                <div className="mb-6" >
                <label className='block mb-2 text-sm font-medium text-gray-900'>Username</label>
                <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="mb-6" >
                <label className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-6" >
                <label className='block mb-2 text-sm font-medium text-gray-900'>Profile Picture</label>
                <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => setProfilePicture(e.target.value)}
                />
                </div>
                <div className="mb-6" >
                <label className='block mb-2 text-sm font-medium text-gray-900'>Bio</label>
                <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => setBio(e.target.value)}
                />
                </div>
                <div className="mb-6" >
                <label className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <input type='submit' className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'/>
            </form>
            <button onClick={handleButton} className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>I already have an account</button>
        </div>
    )
}
export default SignUp