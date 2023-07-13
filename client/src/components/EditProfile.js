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
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setEditedUsername(e.target.value)} value={editedUsername} placeholder="Username"/>
                <input onChange={(e) => setProfilePicture(e.target.value)} value={profile_picture} placeholder='Profile Picture'/>
                <input onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Bio"/>
                <input type='submit'/>
            </form>
        </div>
    )
}
export default EditProfile