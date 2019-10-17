import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
// import WeekOne from './Reports/WeekOne';
// import WeekTwo from './Reports/WeekTwo';
// import WeekThree from './Reports/WeekThree';
import ReportsView from './Reports/ReportsView';
// import '../style/App.css';

export default class Reports extends Component {
    render() {
        return (
            <div className="reports">
                <h1>Reports</h1>
                <strong>Pick a week</strong>
                <div className="list">
                    <ul>
                      <li>
                        <NavLink activeClassName="activeReport" to="/reports/week/1">Week 1 </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="activeReport" to="/reports/week/2">Week 2 </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="activeReport" to="/reports/week/3">Week 3 </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="activeReport" to="/reports/week/4">Week 4 </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="activeReport" to="/reports/week/5">Week 5 </NavLink>
                      </li>
                    </ul>
                    <Route path="/reports/week/:id" component={ReportsView} />
                </div>
            </div>
        )
    }
}
