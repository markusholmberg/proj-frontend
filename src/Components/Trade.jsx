import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';
import Chart from 'chart.js';
import io from "socket.io-client";

const socket = io('http://localhost:8300');
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Trade extends Component {
    constructor(props) {
        super(props);
        this.myRef=null
        this.state = {
            items: [],
            loading: true,
            trading: false,
            selectedItem: [],
            userBalance: 0,
            user: ""
        }
    }

    componentDidMount = () => {
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

        fetch(process.env.REACT_APP_API + '/profile/' + localStorage.getItem("user"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                userBalance: data.data[0].balance,
                user: data.data[0].username
            })
        })
        .catch(error => console.error('Error:', error));

        socket.on("buy item", function(price) {
            const priceText = document.getElementById("price");
            // const priceTwo = document.getElementById("priceTwo");
            priceText.textContent = price;
            // priceTwo.textContent = price;
        })
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({
            trading: true
        })
        document.getElementById("item").style.display = "inline-block";
        console.log(e.target.textContent)
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
        .then(data => {
            let ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Price change',
                        data: this.state.selectedItem[0].history,
                        fill: false,
                        borderColor:
                            'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }

    buyItem = (e) => {
        const values = {
            "username": localStorage.getItem("user"),
            "item": this.state.selectedItem[0].name,
            "price": this.state.selectedItem[0].price,
            "quantity": this.state.selectedItem[0].quantity
        }
        fetch(process.env.REACT_APP_API + "/trade/updatePrice", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

        fetch(process.env.REACT_APP_API + "/trade/updateQuantity", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            const price = response.affected.value.price;
            socket.emit("buy item", price);
        })
        .catch(error => console.error('Error:', error));

        fetch(process.env.REACT_APP_API + "/trade/yourQuantity", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
        console.log("Item bought")
    }

    render() {
        console.log(this.state)
        return (
            <div className="trade">
                <div className="background">
                    <div className="caption">
                        <span>Welcome to the trading page</span>
                    </div>
                </div>
                <div style={{"color": "#777", "backgroundColor": "white", "padding": "50px 80px", "textAlign": "justify"}}>
                    <h3 style={{"textAlign": "center"}}>All listed items at this time</h3>
                </div>
                <div style={{"overflow": "auto"}} className="bgimg2">
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
                    <div style={{"width": "40%", "display": "inline-block"}}>
                        <h3 style={{"color": "white"}}>Items up for trade</h3>
                        {this.state.items.map((item, i) => (
                            <div key={i} className="items">
                                <p onClick={this.onClick} key={item.name} style={{"color": "white", "cursor": "pointer"}}>{item.name} </p>
                                <p id="priceTwo" style={{"color": "white"}}>Price: {item.price}$</p>
                                <img key={item.img} src={`/icons/${item.img}`} alt=""/>
                                <p key={item.quantity} style={{"color": "white"}}>Stock: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    }
                    <div id="item" className="selectedItem">
                        <h3>Selected Item</h3>
                        {this.state.selectedItem.map((selected, i) =>(
                            <div key={i} className="items">
                                <p key={i}>{selected.name}</p>
                                <p id="price" style={{"color": "white"}}>Price: {selected.price}$</p>
                                <img key={selected.img} src={`/icons/${selected.img}`} alt=""/>
                                <p key={selected.name} style={{"color": "white"}}>Stock: {selected.quantity}</p>
                                { this.state.userBalance < selected.price ?
                                    <p>You don't have enough money for this item</p>
                                :
                                    <button onClick={this.buyItem}>Buy item</button>
                                }
                                <canvas id="myChart" width="400" height="400"></canvas>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
