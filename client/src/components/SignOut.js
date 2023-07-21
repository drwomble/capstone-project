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
        <div className="flex justify-center bg-gray-100">
            <h1 className="mb-2 mr-4 text-2xl font-bold text-gray-900">Are you sure you want to sign out?  </h1>
            <div className="flex justify-center">
            <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleSignOut}>Yes</button>
            <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleNo}>No</button>
        </div>
        </div>
    )
}

export default SignOut