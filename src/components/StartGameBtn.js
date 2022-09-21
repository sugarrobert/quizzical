import React from "react";

export default function Box(props) {
    const btnText = props.btnText;
    const onPlayClick = props.onPlayClick;

    return (
        <button className="action primary"
                onClick={onPlayClick}>
                {btnText}
        </button>
    )
}