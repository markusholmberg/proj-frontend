import React, { Component } from 'react';

// import { BrowserRouter as Router, Route, Link } from 'react';
// import '../style/App.css';


export default class Me extends Component {
    render() {
        return (
            <div>
                <div className="background">
                    <div className="caption">
                        <span>Buy and sell WoW gold and items</span>
                    </div>
                </div>
                <div style={{"color": "#777", "backgroundColor": "white", "padding": "50px 80px", "textAlign": "justify"}}>
                    <h3 style={{"textAlign": "center"}}>Welcome to best page for trading WoW items!</h3>
                    <p style={{"textAlign": "center"}}>Here you can trade different items from World of Warcraft with other users. Go to the trading link in
                        the navigation field and start trading with other people! Scroll down for a guide on how to get started. We never ever scam our users.
                    </p>
                </div>
                <div className="bgimg2">
                    <div className="caption">
                        <span style={{"backgroundColor": "transparent", "fontSize": "25px", "color": "#f7f7f7"}}>How to get started?</span>
                    </div>
                </div>
            </div>
        )
    }
}
