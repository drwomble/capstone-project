//TODO change alerts to something better and add form validations

import { useState } from "react"
import { useHistory } from "react-router-dom"

const SignIn = ({ handleUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const userObj = {email: email, password: password}
        fetch('/signin', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then((r) => {
            if(r.ok){
                r.json().then(data => handleUser(data))
                //change alert to text notif
                alert('You have been signed in. Returning to home...')
                history.push('/')
            } else {
                //change alert to notif
                alert('Invalid email or password please try again')
            }
        })
    }

    return (
    <body className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
        <h1 className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">Welcome Back!</h1>
        <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={handleSubmit}>
            <label className="font-semibold text-xs" for="emailField">Email</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            onChange={(e) => setEmail(e.target.value)}  
            />
            <label className="font-semibold text-xs mt-3" for="passwordField">Password</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            onChange={(e) => setPassword(e.target.value)}
            />
            <input className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" type='submit' />
            <div className="flex mt-6 justify-center text-xs">
                <button className="text-blue-400 hover:text-blue-500">Sign Up</button>
            </div>
        </form>
    </body>
    )
}
export default SignIn