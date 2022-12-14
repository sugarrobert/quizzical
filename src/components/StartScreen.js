import { React } from "react";
import StartGameBtn from "./StartGameBtn";

function StartScreen(props) {
    const onPlayClick = props.onPlayClick;

    return (
        <div className="start-screen__wrapper">
            <h1 className="quizzical__title">Quizzical</h1>
            <p className="quizzical__description">Answer five quiz questions as quickly and as accurately as possible and check your knowledge.</p>
            <StartGameBtn btnText="Start quiz" onPlayClick={onPlayClick} />
        </div>
    );
}

export default StartScreen;
