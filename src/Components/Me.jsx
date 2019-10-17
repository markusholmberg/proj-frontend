import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react';
// import '../style/App.css';
import logo from "../markus.jpg";

export default class Me extends Component {
    render() {
        return (
            <div className="first">
                <div className="about">
                    <h1>About me</h1>
                    <p>My name is Markus Holmberg, I am 21 years old and born in Singapore where I lived for about 4 months until I moved to Sweden.<br />
                    I am studying the third year of Webprogramming at Blekinge Institute of Technology.
                    In my freetime I like to play videogames, hang out with friends, go to the gym or go skiing in the winter.
                    </p>
                </div>
                <img src={logo} alt="Me" className="img"/>
            </div>
        )
    }
}
