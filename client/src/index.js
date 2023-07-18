import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { DeckProvider } from "./components/context/deckContext";

ReactDOM.render(
    <DeckProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DeckProvider>,
    document.getElementById("root")
);