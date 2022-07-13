import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";
import axios from "axios";

export default class QuizList extends Component {
    state = {
        quizes: [],
    };

    renderQuizes = () => {
        return this.state.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    };

    componentDidMount = async () => {
        try {
            const response = await axios.get(
                "https://reactquiz-1b3f8-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
            );

            const quizes = [];

            Object.keys(response.data).forEach((key, i) => {
                quizes.push({
                    id: key,
                    name: `Тест №${i + 1}`,
                });
            });

            this.setState({
                quizes,
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>{this.renderQuizes()}</ul>
                </div>
            </div>
        );
    }
}
