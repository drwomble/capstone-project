import EditProfile from "./EditProfile"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const MyProfile = ({ user, handleUser }) => {
    const [toggleForm, setToggleEditForm] = useState(false)
    const history = useHistory()

    const handleToggle = () => setToggleEditForm(current => !current)
    

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then((r) => r.json())
        // .then((data) => handleUser(data))
    }, [])
    
    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.profile_picture} alt='profile photograph' />
            <p>{user.bio}</p>
            <button onClick={handleToggle}>Edit Profile</button>
            <div>{toggleForm ? <EditProfile key={user.id} user={user} handleUser={handleUser} handleToggle={handleToggle} /> : ''}</div>
        </div>
    )
}

export default MyProfile