import EditProfile from "./EditProfile"
import { useState } from "react"

const MyProfile = ({ user, handleUser }) => {
    const [toggleForm, setToggleForm] = useState(false)

    const handleClick = () => <EditProfile key={user.id} user={user} handleUser={handleUser}/>

    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.profile_picture}/>
            <p>{user.bio}</p>
            <button onClick={handleClick}>Edit Profile</button>
        </div>
    )
}

export default MyProfile