// import {useState, useEffect, createContext} from 'react'

// const UserContext = createContext()

// const UserProvider = ({children}) => {
//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         fetch('/checksession').then(r => {
//         if (r.ok) {
//             r.json().then((user) => setUser(user))
//         } else {
//             setUser(null)
//         }
//         });
//     }, []);

//     const handleUser = (currentUser) => setUser(currentUser)

//     return (
//         <UserContext.Provider value={{user, handleUser, setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }
// export {UserContext, UserProvider}