import React, { Component } from "react";
import '../../style/App.css';


export default class WeekThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            data: ""
        }
    }

    componentDidMount() {
        const href = "http://localhost:3000/reports/week/3"
        const last = new URL(href).pathname.split('/').pop();
        console.log(last);

        // fetch('http://localhost:8333/reports/week/' + week)
        //     .then(response => response.json())
        //     .then(data => this.setState({ data }));
    }
    render() {
        console.log(this.state.data)
        return (
            <div className="reports">
                <h1>Week 3</h1>
                <form>
                    <div className="form-group">
                        <label>Create a report</label>
                        <textarea ref="report" name="report" className="reportField" placeholder=""/>
                        <input type="submit" name="create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
