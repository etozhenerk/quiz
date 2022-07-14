import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/AcriveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";
class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true,
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

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false,
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {this.state.loading ? (
                        <Loader />
                    ) : this.state.isFinished ? (
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

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const params = useParams();
    return <Quiz params={params} />;
};
