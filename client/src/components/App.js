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
import EditProfile from "./EditProfile";
import NewDeck from "./NewDeck";
import NewSpot from "./NewSpot";

function App() {
  const [decks, setDecks] = useState([])
  const [spots, setSpots] = useState([])
  const [user, setUser] = useState({})

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
        setUser({})
      }
    });
  }, []);

  const handleUser = (currentUser) => setUser(currentUser)

  const addDeck = (newDeck) => setDecks([...decks, newDeck]) 

  const addSpot = (newSpot) => setSpots([...spots, newSpot])

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
      <Route path='/users/edit/:id'>
        <EditProfile user={user} handleUser={handleUser}/>
      </Route>
      <Route path='/decks/new'>
        <NewDeck addDeck={addDeck} />
      </Route>
      <Route path='/spots/new' >
        <NewSpot addSpot={addSpot} user={user} decks={decks} />
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
