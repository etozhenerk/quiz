import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import classes from "./QuizCreator.module.css";
import { createControl, validate, validateForm } from "../../form/formFramework";
import { Auxilliary } from "../../hoc/Auxilliary/Auxilliary";
import axios from "axios";

const createOptionControl = (number) => {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: "Значение не может быть пустым",
            id: number,
        },
        { required: true },
    );
};

const createFormControls = () => {
    return {
        question: createControl(
            { label: "Введите вопрос", errorMessage: "Вопрос не может быть пустым" },
            { required: true },
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
};
export default class QuizCreator extends Component {
    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id,
                },
                {
                    text: option2.value,
                    id: option2.id,
                },
                {
                    text: option3.value,
                    id: option3.id,
                },
                {
                    text: option4.value,
                    id: option4.id,
                },
            ],
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
    };

    createQuizHandler = async (e) => {
        e.preventDefault();

        try {
            axios.post(
                "https://reactquiz-1b3f8-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
                this.state.quiz,
            );

            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls(),
            });
        } catch (error) {
            console.error(error);
        }
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        });
    };

    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: parseInt(e.target.value),
        });
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxilliary key={i}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(e) => {
                            this.changeHandler(e.target.value, controlName);
                        }}
                    />
                    {i === 0 && <hr />}
                </Auxilliary>
            );
        });
    };

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create Quiz</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        <Select
                            label={"Выберите правильный ответ"}
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {
                                    text: "1",
                                    value: 1,
                                },
                                {
                                    text: "2",
                                    value: 2,
                                },
                                {
                                    text: "3",
                                    value: 3,
                                },
                                {
                                    text: "4",
                                    value: 4,
                                },
                            ]}
                        />
                        <Button type="primary" onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>
                            Add question
                        </Button>
                        <Button type="success" onClick={this.createQuizHandler} disabled={this.state.quiz.length === 0}>
                            Create quiz
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
