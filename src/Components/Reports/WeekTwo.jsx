import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom'
// import Me from './Me';
import '../../style/App.css';

// const Week = ({ match }) => <p>{match.params.id}</p>
const admin = localStorage.getItem("loggedIn")


export default class WeekTwo extends Component {
    render() {
        return (
            <div className="reports">
                <h1>Week 2</h1>
                <a href="https://github.com/markusholmberg/jsramverk">Link to GitHub repo</a>
                <p>I didn't really have any insiration for my date picker. I google around on different designs but there wasn't really anything that cought my eye.
                Many of the designs I found were also npm packages and I didn't want to install anything for my date picker. In the end I ended up just having
                three different dropdowns menus for year, month and day. And then added some Bootstrap classes to that. For the validation I found a tutorial that explained a good
                way how to do validation in React not using any dependencies. And then I wanted to show the errors in a good way and I found the Bootrap alert style to be a good way to
                make the errors pop and easy to notice.
                </p>
                {admin === "1" ? <button>Edit</button> : null}
            </div>
        )
    }
}
