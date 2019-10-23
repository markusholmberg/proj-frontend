import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react';
import { Route, NavLink } from 'react-router-dom'
import ReportsView from './Reports/ReportsView';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

// import '../style/App.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true
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
                <div className="bgimg2">
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
                    <div>
                        <h3 style={{"color": "white"}}>Items up for trade</h3>
                        {this.state.items.map((item, i) => (
                            <div key={i} className="items">
                                <p key={item.name} style={{"color": "white"}}>{item.name} Price: {item.price}$</p>
                                <p key={item.i} style={{"color": "white"}}>User: {item.user}</p>
                                <img key={item.img} src={`/icons/${item.img}`} alt=""/>
                                {localStorage.getItem("access_token") !== null ?
                                    <NavLink activeClassName="activeReport" to={`/trade/${item._id}`}>Trade </NavLink>
                                : null
                                }
                            </div>
                        ))}
                        <Route path="/reports/week/:id" component={ReportsView} />
                    </div>
                    }

                </div>
            </div>
        )
    }
}
