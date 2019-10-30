import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            loggedIn: 0,
            errors: []
        }
    }


    validate = (user, pass) => {
        // we are going to store errors for all fields
        // in a signle array
        const errors = [];

        if (user.length === 0) {
            errors.push("Email can't be empty");
        }

        if (pass.length === 0) {
            errors.push("Password can't be empty");
        }

        return errors;
    }


    onChangeUsername = (e) => {
        this.setState({
            user: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            pass: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const values = {
            "email": this.refs.user.value,
            "password": this.refs.password.value
        }

        const { user, pass } = this.state;
        const errors = this.validate(user, pass);

        if (errors.length > 0) {
            document.getElementById("error").style.display = "block";
            this.setState({ errors });
            return;
        } else {
            fetch(process.env.REACT_APP_API + "/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then((response) => {
                localStorage.setItem("user", response.data[0].username)
                localStorage.setItem("access_token", response.token)
                console.log(response)
            })
            .catch(error => console.error('Error:', error));
            document.getElementById("green").style.display = "block";
            document.getElementById("error").style.display = "none";
            window.location.href="/"
        }
    }

    onClick = (e) => {
        e.preventDefault();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.reload();
    }

    render() {
        const { errors } = this.state;
        console.log(localStorage)
        return (
            <div className="register">
                <div className="registerForm">
                    {localStorage.getItem("access_token") === null ?
                        <div>
                            <h1>Login here</h1>
                            <form onSubmit={this.onSubmit}>
                                <div id="green" className="success" style={{display: "none"}}>You're now logged in!</div>
                                <div id="error" className="errors" style={{display: "none"}}>
                                    {errors.map(error => (
                                        <p key={error}>Error: {error}</p>
                                    ))}
                                </div>
                                <div className="form-group">
                                    <label>E-Mail</label>
                                    <input ref="user" type="text" name="username" onChange={this.onChangeUsername} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input ref="password" type="password" name="password" onChange={this.onChangePassword} className="form-control"/>
                                </div>
                                <input type="submit" value="Login" name="submit" className="btn btn-primary"/>
                                <div id="loggedIn"></div>
                            </form>
                        </div>
                    : <div>
                        <h3>You are logged in as {localStorage.getItem("user")}!</h3>
                        <input type="submit" value="Logout" name="logout" onClick={this.onClick} className="btn btn-primary"/>
                    </div>
                }
                </div>
            </div>
        )
    }
}
