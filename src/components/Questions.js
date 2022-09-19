import { React, useState, useEffect } from "react";
import Question from "./Question"
import shuffle from "../common/utils/shuffle";
import {nanoid} from "nanoid";
import he from "he";

function Questions() {
    const [triviaItemsData, setTriviaItemsData] = useState([]);
    const [triviaItem, setTriviaItem] = useState([]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setTriviaItemsData(data.results))
    }, [])

    
    useEffect(() => {
        setTriviaItem([]);
        triviaItemsData.map((item) => {
            const { question, correct_answer, incorrect_answers } = item;
            const allAnswers = [correct_answer, ...incorrect_answers];
            const shuffledAnswers = shuffle(allAnswers);
            const id = nanoid();

            const objAll = {
                id: id,
                question: he.decode(question),
                answers: shuffledAnswers.map(item => {
                    return {
                        id: id,
                        value: he.decode(item),
                        isCorrect: item === correct_answer ? true : false,
                        isSelected: false,
                        isCorrectAnswer: null,
                        isIncorrectSelected: null,
                        disabled: null
                    }
                })
            }

            return setTriviaItem(prevTriviaItem => ([
                ...prevTriviaItem,
                objAll
            ]))
        })
    }, [triviaItemsData])

    const selectAnswers = (e) => {
        e.preventDefault();
        const { id, value } = e.target.dataset

        const newTriviaItem = triviaItem.map(trivia => {
            if (trivia.id === id) {
                trivia.answers.map(answer => {
                    answer.isSelected = false;
                    if (answer.value === value) {
                        answer.isSelected = true
                    }

                    return answer;
                })
            }

            return trivia
        })

        setTriviaItem(newTriviaItem)
    }

    const checkAnswers = (e) => {
        const selected = document.querySelectorAll(".selected");

        if (selected.length >= 5) {
            const setCorrectAnswers = triviaItem.map(trivia => {
                trivia.answers.map(answer => {
                    if (answer.isCorrect === true) {
                        answer.isCorrectAnswer = true;
                    } 
                    
                    if (answer.isSelected === true && answer.isCorrect === false) {
                        answer.isIncorrectSelected = true;
                    } 
    
                    answer.disabled = true;

                    return answer
                })

                return trivia
            })
            
            setTriviaItem(setCorrectAnswers);
        } else {
            alert("Check all answers");
            return
        } 
    }

    const setAllTriviaItems = triviaItem.map(trivia => (
        <Question 
            key={trivia.id}
            id={trivia.id}
            question={trivia.question}
            answers={trivia.answers}
            selectAnswers={selectAnswers}
        />
        )
    )

    return (
        <div className="new-game">
            {setAllTriviaItems}
            <button className="action primary"
            onClick={checkAnswers}>
                    Check answers
            </button>
        </div>
    );
}

export default Questions;