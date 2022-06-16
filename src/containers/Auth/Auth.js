import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

export default class Auth extends Component {
    loginHandler = () => {};

    registerHandler = () => {};

    submitHandler = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        <Input label="Email" />
                        <Input label="Password" />
                        <Button type="success" onClick={this.loginHandler}>
                            Login
                        </Button>
                        <Button type="primary" onClick={this.registerHandler}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
