import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom'
// import Me from './Me';
import '../../style/App.css';

// const Week = ({ match }) => <p>{match.params.id}</p>


export default class WeekOne extends Component {
    render() {
        return (
            <div className="reports">
                <h1>Week 1</h1>
                <a href="https://github.com/markusholmberg/jsramverk">Link to GitHub repo</a>
                <br />
                <h2>How to install this project</h2>

                <p>The first thing you have to do is to clone the repo by using the command</p> <code>git clone</code>

                <p>Then run the command</p> <code>npm install</code><p> to install the dependencies.</p>

                <p>And lastly run the command</p> <code>npm start</code><p> to start the webpage at </p><a href="http://localhost:3000">http://localhost:3000</a>
            </div>
        )
    }
}
