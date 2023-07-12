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
                alert('You have been signed in. Returning to home.')
                history.push('/')
            } else {
                //change alert to notif
                alert('Invalid email or password please try again')
            }
        })
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            />
            <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <input type='submit' />
        </form>
    </div>
    )
}
export default SignIn