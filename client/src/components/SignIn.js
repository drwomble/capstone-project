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
    <div className="px-40 bg-gray-100">
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900" for="emailField">Email</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            onChange={(e) => setEmail(e.target.value)}  
            />
            </div>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900" for="passwordField">Password</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="mb-6">
            <input className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' type='submit' />
            </div>
            <div className="mb-6">
            <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Sign Up</button>
            </div>
        </form>
    </div>
    )
}
export default SignIn