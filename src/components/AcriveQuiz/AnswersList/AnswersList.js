import React from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = ({ answers, onAnswerClick, state }) => (
    <ul className={classes.AnswersList}>
        {answers.map((answer, i) => (
            <AnswerItem key={i} answer={answer} onAnswerClick={onAnswerClick} state={state ? state[answer.id] : null} />
        ))}
    </ul>
);

export default AnswersList;
