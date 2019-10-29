import React, { Component } from 'react';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBalance: 0,
            balance: 0,
            user: "",
            items: [],
            allItems: [],
            loading: true,
            quantity: [],
            selling: false,
            selectedItem: []
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

        fetch(process.env.REACT_APP_API + '/profile/' + localStorage.getItem("user") + '/getInv', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((data) => {
            let amount = []
            let test = []

            for (var i = 0; i < data.data.length; i++) {
                amount.push(data.data[i])
                for (var j = 0; j < amount[i].allItems.length; j++) {
                    test.push(amount[i].allItems[j])
                }
            }
            this.setState({
                allItems: amount,
                test: test
            })

        })
        .catch(error => console.error('Error:', error));

        fetch(process.env.REACT_APP_API + "/trade", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            let objects = []

            for (var i = 0; i < data.data.length; i++) {
                objects.push(data.data[i])
            }
            this.setState({
                items: objects,
                loading: false
            })
            // console.log(this.state)
        })
        .catch(error => console.error('Error:', error));
    }

    onChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({balance: e.target.value});
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({
            selling: true
        })

        fetch(process.env.REACT_APP_API + "/trade/" + e.target.textContent, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            let item = []

            for (var i = 0; i < data.data.length; i++) {
                item.push(data.data[i])
            }
            this.setState({
                selectedItem: item
            })
        })
        .catch(error => console.error('Error:', error));
        document.getElementById("item").style.display = "inline-block";

        for(var i = 0; i < this.state.test.length; i++) {
            // console.log(this.state.test[i])
            if(this.state.test[i].name === e.target.textContent) {
                this.setState({
                    oneItem: this.state.test[i]
                })
            }
        }
    }

    onSubmit = (e) => {
        // e.preventDefault();
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

    onSell = (e) => {
        e.preventDefault();
        console.log(e.target.textContent)
        const values = {
            "username": localStorage.getItem("user"),
            "item": this.state.selectedItem[0].name,
            "price": this.state.selectedItem[0].price,

        }
        fetch(process.env.REACT_APP_API + "/profile/sellItem", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

        fetch(process.env.REACT_APP_API + "/profile/sellItemBalance", {
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
                <div style={{"overflow": "auto"}} className="bgimg2">
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
                    {this.state.loading === true ?
                        <div className='sweet-loading'>
                            <BounceLoader
                              css={override}
                              sizeUnit={"px"}
                              size={150}
                              color={'red'}
                              loading={this.state.loading}
                            />
                            <p style={{"color": "white", "textAlign": "center"}}>Loading items</p>
                        </div>
                    :
                        <div style={{"width": "40%", "display": "inline-block", "color": "white"}}>
                            <h3>Your inventory</h3>
                            {this.state.test.map((item, i) => (
                                <div className="items" key={i}>
                                    <p onClick={this.onClick} key={item.name} style={{"cursor": "pointer"}}>{item.name}</p>
                                    <img key={item.img} src={`/icons/${item.img}`} alt=""/>
                                    <p key={item.quantity}>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    }
                    <div id="item" className="selectedItem">
                        <h3>Selected Item</h3>
                        {this.state.selectedItem.map((selected, i) =>(
                            <div key={i} className="items">
                                <p key={i}>{selected.name}</p>
                                <p style={{"color": "white"}}>Price: {selected.price}$</p>
                                <img key={selected.img} src={`/icons/${selected.img}`} alt=""/>
                                <p key={selected.name} style={{"color": "white"}}>Total stock: {selected.quantity}</p>
                                {this.state.oneItem.quantity === 0 ?
                                    <p>You don't have any items in your inventory</p>
                                :
                                    <button onClick={this.onSell}>Sell item</button>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
