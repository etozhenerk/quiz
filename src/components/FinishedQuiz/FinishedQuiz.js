import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = ({ results, quiz, onRetry }) => {
    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === "success") {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {quiz.map((quizItem, i) => {
                    const cls = [
                        "fa",
                        results[quizItem.id] === "error" ? "fa-times" : "fa-check",
                        classes[results[quizItem.id]],
                    ];
                    return (
                        <li key={i}>
                            <strong>{i + 1}</strong>.&nbsp;{quizItem.question}
                            <i className={cls.join(" ")} />
                        </li>
                    );
                })}
            </ul>
            <p>
                correct {successCount} out of {quiz.length}
            </p>
            <div>
                <Button onClick={onRetry} type="primary">
                    Retry
                </Button>
                <Link to="/">
                    <Button type="succes">Go to test list</Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
