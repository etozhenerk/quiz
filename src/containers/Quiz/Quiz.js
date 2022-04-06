import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/AcriveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export default class Quiz extends Component {
    state = {
        results: {}, // { id: 'success' or 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { id: 'success' or 'error' }
        quiz: [
            {
                question: "What color is the sky?",
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {
                        text: "Black",
                        id: 1,
                    },
                    {
                        text: "Blue",
                        id: 2,
                    },
                    {
                        text: "Red",
                        id: 3,
                    },
                    {
                        text: "Green",
                        id: 4,
                    },
                ],
            },
            {
                question: "What year was st petersburg founded?",
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {
                        text: "1700",
                        id: 1,
                    },
                    {
                        text: "1702",
                        id: 2,
                    },
                    {
                        text: "1703",
                        id: 3,
                    },
                    {
                        text: "1803",
                        id: 4,
                    },
                ],
            },
        ],
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];

            if (this.state.answerState[key] === "success") {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success";
                this.setState({
                    results,
                });
            }
            this.setState({
                answerState: {
                    [answerId]: "success",
                },
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = "error";
            this.setState({
                answerState: {
                    [answerId]: "error",
                },
                results,
            });
        }
    };

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {},
        });
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>
                    {this.state.isFinished ? (
                        <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.retryHandler} />
                    ) : (
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            questionNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}
