import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Decks from "./Decks";
import Spots from "./Spots";
import SignOut from "./SignOut";
import SignIn from './SignIn';
import SignUp from "./SignUp";
import MyProfile from "./MyProfile";
import Footer from "./Footer";


function App() {
  const [decks, setDecks] = useState([])
  const [spots, setSpots] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/decks')
    .then(r => r.json())
    .then(data => setDecks(data))
  }, [])

  useEffect(() => {
    fetch('/spots')
    .then(r => r.json())
    .then(data => setSpots(data))
  }, [])

  useEffect(() => {
    fetch('/checksession').then(r => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      } else {
        setUser(null)
      }
    });
  }, []);
  
  const editUserProfile = (editedUser) => {
    setUser(editedUser)
  } 
  
  const handleUser = (currentUser) => setUser(currentUser)

  // const userId = 

  return (
  <main>
    <Nav user={user}/>
    <Switch>
      <Route exact path='/decks'>
        <Decks decks={decks} />
      </Route>
      <Route exact path='/spots'>
        <Spots spots={spots} />
      </Route>
      <Route path='/users/:id'>
        <MyProfile user={user} handleUser={handleUser}/>
      </Route>
      <Route exact path='/signin'>
        <SignIn handleUser={handleUser} />
      </Route>
      <Route exact path='/signup'>
        <SignUp handleUser={handleUser} />
      </Route>
      <Route exact path='/signout'>
        <SignOut handleUser={handleUser} />
      </Route>
    </Switch>
    <Footer />
  </main>
  )


}


export default App;
