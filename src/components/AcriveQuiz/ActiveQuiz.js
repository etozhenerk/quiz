import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = ({ answers }) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>2.</strong>&nbsp;Test
            </span>
            <small>4 из 12</small>
        </p>

        <AnswersList answers={answers} />
    </div>
);

export default ActiveQuiz;
