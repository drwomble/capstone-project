import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Decks from "./Decks";
import Spots from "./Spots";
import SignOut from "./SignOut";
import SignIn from './SignIn';
import SignUp from "./SignUp";


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

  const handleUser = (currentUser) => setUser(currentUser)

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
  </main>
  )


}


export default App;
