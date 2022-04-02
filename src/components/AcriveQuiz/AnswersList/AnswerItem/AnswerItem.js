import React from "react";
import classes from "./AnswerItem.module.css";

const AnswerItem = ({ answer }) => {
    return <li className={classes.AnswerItem}>{answer.text}</li>;
};

export default AnswerItem;
