import React from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = ({ answers }) => (
    <ul className={classes.AnswersList}>
        {answers.map((answer, i) => (
            <AnswerItem key={i} answer={answer} />
        ))}
    </ul>
);

export default AnswersList;
