import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

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


}


export default App;
