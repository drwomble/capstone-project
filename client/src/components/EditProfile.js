//TODO change alerts, add validations, form should autofill with current info

import { useState } from "react"


const EditProfile = ({ user, handleUser, handleToggle }) => {
    const [editedUsername, setEditedUsername] = useState("")
    const [profile_picture, setProfilePicture] = useState("")
    const [bio, setBio] = useState("")

    const handleSubmit = (e) => {
        console.log(user)
        e.preventDefault()
        const editedUserObj = {
            username: editedUsername,
            profile_picture: profile_picture,
            bio: bio
        }
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUserObj)
        })
        .then((r) => {
            if(r.ok){
                r.json().then(data => {
                    handleUser(data) 
                    handleToggle()
                })
                alert('Profile successfully updated')
            } else {
                alert('something went wrong please try again')
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input onChange={(e) => setEditedUsername(e.target.value)} value={editedUsername} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <label className="block mb-2 text-sm font-medium text-gray-900">Profile Picture </label>
                <input onChange={(e) => setProfilePicture(e.target.value)} value={profile_picture} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <label className="block mb-2 text-sm font-medium text-gray-900">Bio </label>
                <input onChange={(e) => setBio(e.target.value)} value={bio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <input type='submit' className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"/>
            </form>
        </div>
    )
}
export default EditProfile