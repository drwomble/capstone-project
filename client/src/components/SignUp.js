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
        } else {
            alert('Something went wrong, please try again.')
        }
    })
    }

    const handleButton = () => history.push('/signin')

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                />
                <input 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                />
                <input 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                />
                <input 
                onChange={(e) => setProfilePicture(e.target.value)}
                placeholder='Profile Picture'
                />
                <input 
                onChange={(e) => setBio(e.target.value)}
                placeholder='Bio'
                />
                <input type='submit' />
            </form>
            <button onClick={handleButton}>I already have an account</button>
        </div>
    )
}
export default SignUp