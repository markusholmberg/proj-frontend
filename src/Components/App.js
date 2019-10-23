import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
// import '../style/App.css';
import Me from './Me';
import Register from './Register';
import Login from './Login';
import Trade from './Trade';
import Profile from './Profile';

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="nav">
                            <ul>
                                <li>
                                    <NavLink activeClassName="active" exact={true} to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active" to="/trade">Trade</NavLink>
                                </li>
                                {localStorage.getItem("access_token") !== null ?
                                    null
                                :
                                <li>
                                    <NavLink activeClassName="active" to="/register">Register</NavLink>
                                </li>
                                }
                                {localStorage.getItem("access_token") !== null ?
                                    <li>
                                        <NavLink activeClassName="active" to="/login">Logout</NavLink>
                                    </li>
                                :
                                    <li>
                                        <NavLink activeClassName="active" to="/login">Login</NavLink>
                                    </li>
                                }
                                {localStorage.getItem("access_token") !== null ?
                                    <li>
                                        <NavLink activeClassName="active" to={`/profile/${localStorage.getItem('user')}`}>Profile</NavLink>
                                    </li>
                                : null
                                }
                            </ul>
                        </nav>
                    <Route exact path="/" component={Me} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/trade" component={Trade} />
                    <Route path="/profile/:username" component={Profile} />
                  </div>
                </Router>
            </div>
        );
    }
}
