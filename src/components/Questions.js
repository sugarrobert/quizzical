import { React, useState, useEffect } from "react";
import Question from "./Question";
import StartScreen from "./StartScreen";
import StartGameBtn from "./StartGameBtn";
import shuffle from "../common/utils/shuffle";
import {nanoid} from "nanoid";
import he from "he";

function Questions() {
    const [triviaItemsData, setTriviaItemsData] = useState([]);
    const [triviaItem, setTriviaItem] = useState([]);
    const [gameState, setGameState] = useState({
        score: 0,
        state: "start" 
    });

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setTriviaItemsData(data.results))
    }, [])

    const { score, state } = gameState;
    let pageContent;

    const restartGame = () => {
        setGameState({
            score: 0,
            state: "newGame"
        });
        getNewQuestions();
    };

    const getNewQuestions = () => {
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
        });

        setGameState({ ...gameState, state: "newGame"});
    } 

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
        let newScore = 0;

        if (selected.length >= 5) {
            const setCorrectAnswers = triviaItem.map(trivia => {
                trivia.answers.map(answer => {
                    if (answer.isCorrect === true) {
                        answer.isCorrectAnswer = true;
                    } 
                    
                    if (answer.isCorrect === true && answer.isSelected === true) {
                        newScore ++;
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
            setGameState({ state: "restart", score: newScore});
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

    if (state === "start") {
        pageContent = <StartScreen onPlayClick={getNewQuestions} />;
    } else if (state === "newGame") {
        pageContent = (
            <div className="quizzical__game__wrapper">
                <div className="quizzical__questions__wrapper">
                    {setAllTriviaItems}
                </div>
                <button className="action primary"
                    onClick={checkAnswers}>
                        Check answers
                </button>
            </div>
        );
    } else {
        pageContent = (
            <div className="quizzical__game__wrapper">
                <div className="quizzical__questions__wrapper">
                    {setAllTriviaItems}
                </div>
                <span className="quizzical__score">You scored {score}/5 correct answers</span>
                <StartGameBtn btnText="Play again" onPlayClick={restartGame} />
            </div>
        );
    }
    
    return (
        <>
            {pageContent}
        </>
    );
}

export default Questions;