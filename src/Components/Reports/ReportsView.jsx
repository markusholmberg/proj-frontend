import React, { Component } from "react";
import '../../style/App.css';
// require("dotenv").config();

const marked = require("marked");

export default class ReportsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            report: "",
            editing: false
        }
    }

    componentDidMount = () => {
        fetch(process.env.REACT_APP_API + '/reports/week/' + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((data) => {
            if (data.data.length === 0) {
                this.setState({data: ""})
                console.log(data.data.length)
            } else {
                this.setState({ data: data.data[0].report });
                console.log(this.state)
                // console.log('Success:', data.data[0].report);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            fetch(process.env.REACT_APP_API + '/reports/week/' + this.props.match.params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.data.length === 0) {
                    this.setState({data: ""})
                    console.log(data.data.length)
                } else {
                    this.setState({ data: data.data[0].report });
                    console.log(this.state)
                    console.log('Success:', data.data[0].report);
                }
            })
            .catch(error => console.error('Error:', error));
            this.setState({
                editing: false
            })
            window.location.reload();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.report)
        const data = {
            "week": this.props.match.params.id,
            "report": this.state.report
        }
        fetch(process.env.REACT_APP_API + "/reports/week/:id", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        this.setState({
            editing: false
        })
        window.location.reload();
    }

    onChange = (e) => {
        this.setState({
            report: this.refs.report.value
        })
        console.log(this.state.report)
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({
            editing: true
        })
        if (this.state.editing !== true) {
            this.refs.editButton.style.display = "none";
        }
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            editing: false
        })
        if (this.state.editing === false) {
            this.refs.editButton.style.display = "block";
        }
    }

    onEdit = (e) => {
        e.preventDefault();
        console.log(this.state.report)
        const data = {
            "week": this.props.match.params.id,
            "report": this.state.report,
            "token": localStorage.getItem("access_token")
        }
        fetch(process.env.REACT_APP_API + "/reports/week/:id/update", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        this.setState({
            editing: false
        })
        window.location.reload();
    }

    render() {
        const data = this.state.data
        const markedReport = marked(data)
        console.log(this.state);
        return (
            <div className="reports">
                <h1>Week {this.props.match.params.id}</h1>
                {this.state.data.length === 0 && localStorage.getItem("access_token") !== null ?
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Create a report</label>
                        <textarea ref="report" name="report" className="reportField" onChange={this.onChange}/>
                        <input value="Create" type="submit" name="create" className="btn btn-primary"/>
                    </div>
                </form>
                :
                this.state.data.length !== 0 && localStorage.getItem("access_token") !== null ?
                <div>
                    <div dangerouslySetInnerHTML={{__html: markedReport}} />
                    <button ref="editButton" className="btn btn-primary" onClick={this.onClick}>Edit report</button>
                </div>
                :
                <div>
                    <div dangerouslySetInnerHTML={{__html: markedReport}} />
                </div>
                }
                {this.state.data.length !== 0 && localStorage.getItem("access_token") === null ?
                    <h4>You need to be logged in to be able to edit a report</h4>
                : null}
                {this.state.data.length === 0 && localStorage.getItem("access_token") === null ?
                    <h4>You need to be logged in to able to create a report</h4>
                : null}

                {this.state.editing === true ?
                    <form onSubmit={this.onEdit}>
                        <div className="form-group">
                            <label>Edit a report</label>
                            <textarea ref="report" name="report" className="reportField" defaultValue={data} onChange={this.onChange}/>
                            <input type="submit" name="edit" className="btn btn-primary" value="Done"/>
                        </div>
                    </form>
                : null
                }
            </div>
        )
    }
}
