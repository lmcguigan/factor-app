import React, { Component } from "react";
import "./LoginForm.css"
import API from "../../utils/API";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            type: "",
            messageShow: false,
            errorMessage: "Either your username or password are incorrect."
        };
    }

    componentDidMount() {
        this.setState({ type: this.props.type })
    }

    captureInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log(this.state);
        API.login(this.state).then((response) => {
            console.log(response);
            console.log(response.data.response._id)
            //if true, and password matches
            //otherwise alert them that password doesn't match
            let passwordCorrect = response.data.user;
            console.log(passwordCorrect);
            if (passwordCorrect === true) {
                return window.location.assign("/factor/" + response.data.response._id)
            }
            else {
                this.setState({ errorMessage: "Either your username or password are incorrect.", messageShow: true })
            }
        })
    }

    handleRegister = (event) => {
        event.preventDefault();
        API.register(this.state).then((response) =>{
            console.log(response);
            console.log(response.data.code)
            let validRegistration = true;
            if (response.data.code === 11000){
                validRegistration = false;
            }
            if (validRegistration === true) {
                return window.location.assign("/factor/" + response.data._id)
            }
            else {
                this.setState({ errorMessage: "The username is already in use.", messageShow: true })
            }
        })
    }

    render() {
        return (
            <form id="loginform" className="login-form">
                {this.state.messageShow === true ? (
                    <p className = "error-message">{this.state.errorMessage}</p>
                ):(
                    <div></div>
                )}
                <div className="row">
                    <div className="col-12">
                        <input className="login-input" name="username" type="text" placeholder="Username" onChange={this.captureInput} ></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input className="login-input" name="password" type="password" placeholder="Password" onChange={this.captureInput} ></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 button-holder">
                        {this.state.type === "register" ? (
                            <button className="btn login-btn" onClick={this.handleRegister}>Register</button>
                        ) : (
                                <button className="btn login-btn" onClick={this.handleLogin}>Log In</button>
                            )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        {this.state.type === "register" ? (
                            <div></div>
                        ) : (
                                <p className="login-message">Don't have an account? Register <a href="/register">here</a>.
                            </p>
                            )}
                    </div>
                </div>
            </form>
        )
    }
};

export default LoginForm;
