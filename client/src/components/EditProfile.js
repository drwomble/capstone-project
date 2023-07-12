//TODO change alerts, add validations, form should autofill with current info

import { useState } from "react"
import { useHistory } from "react-router-dom"


const EditProfile = ({ user, handleUser }) => {
    const [username, setUsername] = useState("")
    const [profile_picture, setProfilePicture] = useState("")
    const [bio, setBio] = useState("")
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const editedUserObj = {
            username: username,
            email: user.email,
            password_hash: user.password_hash,
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
                r.json().then(data => handleUser(data) && history.push(`/users/${data.id}`))
                alert('Profile successfully updated')
                // history.push(`/users/${data.id}`)

            } else {
                alert('something went wrong please try again')
            }
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e.target.value)}>
                <input onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                <input onChange={(e) => setProfilePicture(e.target.value)} placeholder='Profile Picture'/>
                <input onChange={(e) => setBio(e.target.value)} placeholder="Bio"/>
                <input type='submit'/>
            </form>
        </div>
    )
}
export default EditProfile