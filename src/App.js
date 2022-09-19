import React from "react"
import './App.scss';
import StartScreen from "./components/StartScreen"
import Questions from "./components/Questions"

function App() {
    return (
        <main className="main__content">
            <StartScreen />
            <Questions />
        </main>
    );
}

export default App;
