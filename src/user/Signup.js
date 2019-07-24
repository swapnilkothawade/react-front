import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            about: "",
            recaptcha: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password, about } = this.state;
        const user = {
            name,
            email,
            password,
            about
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        about: "",
                        open: true
                    });
            });
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signupForm = (name, email, password, recaptcha, about) => (
        <form>
            <div className="form-group">
                <label>Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <div className="form-group">
                <label>Interests</label>
                <textarea
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    placeholder="cricket,football,basketball"
                    value={about}
                />
            </div>
            <div className="form-group">
                <label>
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open, recaptcha } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                {/* <hr />
                <SocialLogin />

                <hr /> */}
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password, recaptcha)}
            </div>
        );
    }
}

export default Signup;
