import {
    Box,
    Button,
    Heading, ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack, Text,
    UnorderedList,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {quizData} from "./questions.jsx";
import {quizDataEn} from "./questions-en.js";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import Resultado from "./Resultado.jsx";
import {useTranslation} from "react-i18next";
import i18n from "../../lang/i18n.js";

function ModalQuiz() {

    const { isOpen, onOpen, onClose: baseOnClose } = useDisclosure();
    const {createEuMeExpresso, emptyCoffee} = useSubscription()

    const onClose = () => {
        emptyCoffee();
        baseOnClose();
    };

    useEffect(() => {
        emptyCoffee()
        onOpen();
    }, [onOpen]);

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [firstSlide, setFirstSlide] = useState(true)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [results, setResults] = useState([]) // New state variable for results

    const [payment, setPayment] = useState('3');
    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };

    const {questions} = i18n.language === 'en' ? quizDataEn : quizData
    const {question, choices, correctAnswer} = questions[activeQuestion]

    const onClickNext = () => {
        setResults(results => [...results, selectedAnswerIndex]); // Store the selected answer index
        setSelectedAnswerIndex(null)
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }
    
    function finishSubscription() {
        createEuMeExpresso(results[3] === 0 ? "beans" : results[3] === 2 ? "expresso" : "frenchpress", payment)
    }
    
    function getPaymentText() {
        switch (payment) {
            case '1':
                return '€25.00 / mês';
            case '3':
                return '€75.00 / trimestre';
            case '6':
                return '€150.00 / semestre';
            case '12':
                return '€300.00 / ano';
            default:
                return '';
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        setSelectedAnswer(answer)
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    const {t} = useTranslation();

    return (
        <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={showResult ? "6xl" : "2xl"}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />

            {firstSlide ? (
                <ModalContent>
                    <ModalHeader>
                        <Box as='span'>{t('modalQuiz.newHere')}</Box>
                    </ModalHeader>
                    <ModalBody>
                        <Stack>
                            <Box as='span'>
                                {t('modalQuiz.helpQuiz')}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            {t('modalQuiz.notNow')}
                        </Button>
                        <Button colorScheme='blue' onClick={() => setFirstSlide(false)}>
                            {t('modalQuiz.letsGo')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            ) : !showResult ? (
                <ModalContent>
                    <ModalHeader>
                        <Box as='span' className="active-question-no">{addLeadingZero(activeQuestion + 1)}</Box>
                        <Box as='span' className="total-question">/{addLeadingZero(questions.length)}</Box>
                    </ModalHeader>
                    <ModalBody alignSelf={"center"}>
                        <Stack className="quiz-container">
                            <Heading as='h2' size='3xl'>{question}</Heading>
                            <UnorderedList>
                                {choices.map((answer, index) => (
                                    <ListItem
                                        onClick={() => onAnswerSelected(answer, index)}
                                        key={answer}
                                        className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                                        {answer}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                            {activeQuestion === questions.length - 1 ? t('modalQuiz.finish') : t('modalQuiz.next')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            ) : (
                <ModalContent>
                    <ModalHeader>
                        <Box as='span' className="active-question-no">{t('modalQuiz.result')}</Box>
                    </ModalHeader>
                    <ModalBody>
                        <Stack  direction={['column', 'row']}>
                            <Stack m={4}>
                                <Resultado
                                    exp={results[0]}
                                    sabor={results[1]}
                                    uso={results[2]}
                                />
                            </Stack>
                            <Stack mx={4} align={"end"}>
                                <Text className="ms-auto fw-bold" fontSize={"md"}>
                                    {t('subscription.frequency')}
                                </Text>
                                <Select width={"sm"} value={payment} onChange={handleChangePayment}>
                                    <option value='3'>{t('subscription.quarterlyPayments')}</option>
                                    <option value='6'>{t('subscription.semiannualPayments')}</option>
                                    <option value='12'>{t('subscription.annualPayments')}</option>
                                </Select>
                                <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                    {getPaymentText()}
                                </Text>
                                <Text className="ms-auto " fontSize={"2xl"}>
                                    {t('meexpresso.pricePerMonth')}
                                </Text>
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            {t('modalQuiz.ratherChoose')}
                        </Button>
                        <Button colorScheme='blue' onClick={() => finishSubscription()}>
                            {t('modalQuiz.letsGo')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            )
            }
        </Modal>
    )
}

export default ModalQuiz
