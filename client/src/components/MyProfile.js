import EditProfile from "./EditProfile"
import { useState, useEffect } from "react"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const MyProfile = ({ user, handleUser }) => {
    const [toggleForm, setToggleEditForm] = useState(false)

    const handleToggle = () => setToggleEditForm(current => !current)

    // useEffect(() => {
    //     fetch(`/users/${user.id}`)
    //     .then((r) => r.json())
    //     .then((data) => handleUser(data))
    // }, [])

    return (
        <div className="flex justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col items-center pb-10">
            <img src={user.profile_picture} alt='profile photograph' className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 ">{user.username}</h5>
            <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">{user.bio}</span>
            <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleToggle}>Edit Profile</button>
            <div className="">
                {toggleForm ? <EditProfile key={user.id} user={user} handleUser={handleUser} handleToggle={handleToggle} /> : ''}
                </div>
            </div>
        </div>
        </div>
    )
}
export default MyProfile