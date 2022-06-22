import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./QuizCreator.module.css";
export default class QuizCreator extends Component {
    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = () => {};

    createQuizHandler = () => {};

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create Quiz</h1>

                    <form onSubmit={this.submitHandler}>
                        <Input />
                        <hr />
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <select></select>
                        <Button type="primary" onClick={this.addQuestionHandler}>
                            Add question
                        </Button>
                        <Button type="success" onClick={this.createQuizHandler}>
                            Create quiz
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
