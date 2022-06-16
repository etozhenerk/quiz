import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {
        to: "/",
        label: "Quiz list",
        end: true,
    },
    {
        to: "/auth",
        label: "Authorization",
        end: false,
    },
    {
        to: "/quiz-creator",
        label: "Create quiz",
        end: false,
    },
];

class Drawer extends Component {
    renderLinks() {
        return links.map((link, i) => (
            <li key={i}>
                <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    onClick={this.props.onClose}
                >
                    {link.label}
                </NavLink>
            </li>
        ));
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <>
                {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
                <nav className={cls.join(" ")}>
                    <ul>{this.renderLinks()}</ul>
                </nav>
            </>
        );
    }
}

export default Drawer;
