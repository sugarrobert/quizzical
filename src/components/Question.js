import { React, useState } from "react";
import {nanoid} from "nanoid";

function Question(props) {
    return (
        <div className="question__wrapper">
            <div className="question__container">
                <p className="quizzical__question">{props.question}</p>
                <ul className="answers__container">
                    {props.answers.map(answer => 
                        <li key={nanoid()} className="quizzical__question-item">
                            <button
                                className={`action answer 
                                    ${answer.isSelected ? "selected" : ""} 
                                    ${answer.isIncorrectSelected ? "incorrect" : ""} 
                                    ${answer.isCorrectAnswer ? "correct" : ""}`}
                                data-value={answer.value}
                                data-id={props.id}
                                onClick={props.selectAnswers}
                                disabled={answer.disabled}
                                >
                                    {answer.value}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Question;
