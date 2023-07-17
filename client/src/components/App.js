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
import EditDeck from "./EditDeck";
import EditSpot from "./EditSpot";

function App() {
  const [spots, setSpots] = useState([])
  const [user, setUser] = useState(null)

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

  const addSpot = (newSpot) => setSpots([...spots, newSpot])

  return (
  <main>
    <Nav user={user}/>
    <Switch>
      <Route exact path='/decks'>
        <Decks />
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
        <NewDeck />
      </Route>
      <Route path='/spots/new' >
        <NewSpot addSpot={addSpot} user={user} />
      </Route>
      <Route path='decks/edit/:id'>
        <EditDeck />
      </Route>
      <Route path='spots/edit/:id'>
        <EditSpot />
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
