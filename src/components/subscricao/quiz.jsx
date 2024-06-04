import { useState } from 'react'

import {quizData} from "./questions.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {Stack} from "@chakra-ui/react";

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [results, setResults] = useState([]) // New state variable for results


    const { questions } = quizData
    const { question, choices } = questions[activeQuestion]

    const onClickNext = () => {
        setResults(results => [...results, {
            question: question,
            selectedAnswer: selectedAnswer
        }]);
        setSelectedAnswerIndex(null)
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        setSelectedAnswer(answer)
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <SidebarWithHeader>
        <Stack className="quiz-container" justifySelf={"center"}>
            {!showResult ? (
                <Stack>
                    <Stack className="quiz-container">
                        <Stack>
                            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                            <span className="total-question">/{addLeadingZero(questions.length)}</span>
                        </Stack>
                        <h2>{question}</h2>
                        <ul>
                            {choices.map((answer, index) => (
                                <li
                                    onClick={() => onAnswerSelected(answer, index)}
                                    key={answer}
                                    className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <Stack className="flex-right">
                            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </Stack>
                    </Stack>
                </Stack>
            ) : (
                <Stack className="result">
                    <h3>Result</h3>
                    <p>
                        Total Question: <span>{questions.length}</span>
                    </p>
                    <Stack>
                        {results.map((result, index) => (
                            <Stack key={index}>
                                <p>Question: {result.question}</p>
                                <p>Selected Answer: {result.selectedAnswer}</p>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Stack>
        </SidebarWithHeader>
    )
}

export default Quiz