import React, { Component } from "react";
// import '../style/App.css';
// require("dotenv").config();

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            errors: []
        }
    }

    validate = (username, email, password) => {
        // we are going to store errors for all fields
        // in a signle array
        const errors = [];

        if (username.length === 0) {
            errors.push("Username can't be empty");
        }

        if (email.length < 5) {
            errors.push("Email should be at least 5 charcters long");
        }
        if (email.split("").filter(x => x === "@").length !== 1) {
            errors.push("Email should contain a @");
        }
        if (email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot");
        }

        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }

        return errors;
    }

    onClick = () => {
        if (document.getElementById("pass").type === "password") {
            document.getElementById("pass").type = "text";
        } else {
            document.getElementById("pass").type = "password";
        }
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }

    onChangePass = (e) => {
        this.setState({password: e.target.value})
    }

    onChangeMail = (e) => {
        this.setState({email: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const values = {
            "username": this.refs.username.value,
            "email": this.refs.email.value,
            "password": this.refs.password.value,
        }
        const {username, email, password} = this.state;

        const errors = this.validate(username, email, password);
        if (errors.length > 0) {
            document.getElementById("error").style.display = "block";
            this.setState({ errors });
            return;
        } else {
            fetch(process.env.REACT_APP_API + "/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));

            fetch(process.env.REACT_APP_API + "/register/addItems", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
            // console.log("You're now registered")
            // document.getElementById("green").style.display = "block";
            // document.getElementById("error").style.display = "none";
        }
    }

    render() {
        // console.log(this.state)
        const { errors } = this.state;
        // console.log(this.state)

        return (
            <div className="register">
                <div className="registerForm">
                    <h1>Register here</h1>
                    <form onSubmit={this.onSubmit}>
                        <div id="green" className="success" style={{display: "none"}}>You're now registered!</div>
                        <div id="error" className="errors" style={{display: "none"}}>
                            {errors.map(error => (
                                <p key={error}>Error: {error}</p>
                            ))}
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input ref="username" type="text" name="username" className="form-control" placeholder="Enter your username here" onChange={this.onChangeUsername}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input ref="password" id="pass" type="password" name="password" className="form-control" placeholder="Enter password here" onChange={this.onChangePass}/>
                            <p style={{"marginBottom": 0, "marginTop": "0.5em"}}>Password needs to be atleast 6 characters long</p>
                            <label><input type="checkbox" name="check" onClick={this.onClick} style={{marginTop: "1em"}}/>Show password</label>
                        </div>
                        <div className="form-group">
                            <label>E-Mail</label>
                            <input ref="email" type="email" name="email" className="form-control" placeholder="Enter E-Mail here" onChange={this.onChangeMail}/>
                            <p style={{"marginBottom": 0, "marginTop": "0.5em"}}>E-Mail has to be atleast 5 characters long, contain a @ and atleast one dot.</p>
                        </div>
                        <input type="submit" value="Register" name="submit" className="btn btn-primary"/>
                        <div id="registered"></div>
                    </form>
                </div>
            </div>
        )
    }
}
