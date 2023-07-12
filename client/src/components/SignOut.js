//TODO change alerts to something better and make this happen when sign out nav button is clicked

import { useHistory } from "react-router-dom"

const SignOut = ({ handleUser }) => {

    const history = useHistory()

    const handleSignOut = () => {
        fetch('/signout', {
            method: 'DELETE',
        }).then((r) => {
            if(r.ok){
                handleUser(null)
                alert('SignOut successful. Returning to home...')
                history.push('/')
            } else {
                alert('Something went wrong. Please try again.')
            }
        });
    }

    const handleNo = () => {
        alert('Very well. Returning you home...') 
        history.push('/')
    }

    return (
        <div>
            <h1>Are you sure you want to sign out?</h1>
            <button onClick={handleSignOut}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>
    )
}
export default SignOut