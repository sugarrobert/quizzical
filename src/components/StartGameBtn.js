import React from "react";

export default function Box(props) {
    const btnText = props.btnText

    function startGame() {
        console.log("start")
    }

    return (
        <button className="action primary"
                onClick={startGame}>
                {btnText}
        </button>
    )
}