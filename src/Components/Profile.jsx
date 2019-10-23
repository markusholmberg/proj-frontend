import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBalance: 0,
            balance: 0,
            user: "",
            items: []
        }
    }
    componentDidMount = () => {
        fetch(process.env.REACT_APP_API + '/profile/' + localStorage.getItem("user"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                activeBalance: data.data[0].balance,
                user: data.data[0].username
            })
        })
        .catch(error => console.error('Error:', error));

        fetch(process.env.REACT_APP_API + '/profile/' + localStorage.getItem("user") + "/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((items) => {
            let objects = []

            for (var i = 0; i < items.data.length; i++) {
                objects.push(items.data[i])
            }
            this.setState({
                items: objects
            })
            console.log(items)
        })
        .catch(error => console.error('Error:', error));
    }

    onChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({balance: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("You have added " + this.state.balance)
        const values = {
            "username": this.state.user,
            "balance": parseInt(this.state.balance)
        }
        fetch(process.env.REACT_APP_API + "/profile/:username/update", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }

    render() {
        console.log(this.state)
        return(
            <div className="trade">
                <div className="background">
                    <div className="caption">
                        <span>Welcome to your profile {localStorage.getItem("user")}</span>
                    </div>
                </div>
                <div style={{"color": "#777", "backgroundColor": "white", "padding": "50px 80px", "textAlign": "justify"}}>
                    <h3 style={{"textAlign": "center"}}>Here you can find all of your listed items and also add money to your wallet</h3>
                </div>
                <div className="bgimg2">
                    <h3 style={{"color": "white"}}>Your balance: {this.state.activeBalance}$</h3>
                    <div className="form-group">
                        <form onSubmit={this.onSubmit}>
                            <select name="balance" className="form-control" onChange={this.onChange}>
                                <option hidden>Add balance to your wallet</option>
                                <option value="10">10</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                            </select>
                            <input type="submit" name="submit" value="Add balance"/>
                        </form>
                    </div>
                    <h3 style={{"color": "white"}}>Your active listings</h3>
                    {this.state.items.map((item, i) => (
                        <div key={i} className="items">
                            <p key={item.name} style={{"color": "white"}}>{item.name} Price: {item.price}$</p>
                            <img key={item.img} src={`/icons/${item.img}`} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
