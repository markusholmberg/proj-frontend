import React, { Component } from "react";
import io from "socket.io-client";

const socket = io('https://socket-server.mahm.me');
// const socket = io('http://localhost:8300');
//
// const mongo = require("mongodb").MongoClient;
// const dsn = "mongodb://localhost:27017/chat";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            nick: "",
            allUsers: [],
            messages: [],
            message: ""
        }
    }

    componentWillUnmount = () => {
        socket.on('disconnect', function() {
            console.log("Disconnected");
        });
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            nick: e.target.value
        })
    }

    messageChange = (e) => {
        e.preventDefault();
        this.setState({
            message: e.target.value
        })
        console.log(this.state)
    }

    componentDidMount = () => {
        socket.on("chat message", (message) => {
            const allMessages = document.getElementById("all-messages");
            const newMessage = document.getElementById("new-message");
            let addedMessage = document.createElement("p");
            addedMessage.textContent = message.time + " " + message.user + ": " + message.message;
            allMessages.appendChild(addedMessage);
            newMessage.value = "";
        })
    }

    sendMessage = (e) => {
        e.preventDefault();
        socket.emit('chat message', this.state.message)
        let time = new Date();

        let values = {
            message: this.state.message,
            user: this.state.nickname,
            time:
                (time.getHours() < 10
                    ? '0' + time.getHours()
                    : time.getHours()) +
                ':' +
                (time.getMinutes() < 10
                    ? '0' + time.getMinutes()
                    : time.getMinutes()),
        }
        fetch(process.env.REACT_APP_API + "/chat", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        console.log(this.state)
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            nickname: this.state.nick,
            nick: ""
        }, () => {
            const allMessages = document.getElementById("all-messages");

            socket.on("send-nickname", (message) => {
                let addedMessage = document.createElement("p");
                addedMessage.textContent = message.time + ". " + message.user + message.message;
                allMessages.appendChild(addedMessage);
            })
            socket.emit("send-nickname", this.state.nickname);

            console.log(this.state)
        });

        fetch(process.env.REACT_APP_API + "/chat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.data.length; i++) {
                const allMessages = document.getElementById("all-messages");
                let addedMessage = document.createElement("p");
                addedMessage.textContent = data.data[i].time + "." + data.data[i].user + ": " + data.data[i].message;
                allMessages.appendChild(addedMessage);
            }

            console.log(data.data)
        })
        .catch(error => console.error('Error:', error));


        socket.on('connect', function() {
            console.log("Connected");
        });
    }

    render() {
        return (
            <div className="chat">
                <h1>Chat with other users</h1>
                {this.state.nickname === "" ?
                    <div className="form-group">
                            <label>Nickname</label>
                            <input ref="nickname" type="text" name="nickname" className="form-control" placeholder="Enter your nickname here" onChange={this.onChange}/>
                            <input type="submit" name="setnick" className="btn btn-primary" value="Done" onClick={this.onSubmit}/>
                    </div>
                :
                    <div>
                        <h2>Messages:</h2>

                        <div id="all-messages" className="all-messages" style={{"overflow": "auto"}}></div>

                        <p><strong>Write new message:</strong></p>
                        <input id="new-message" name="message" className="new-message" onChange={this.messageChange} defaultValue=""/>
                        <button type="button" id="send" className="btn btn-primary" onClick={this.sendMessage}>Send message</button>
                    </div>
                }

            </div>
        )
    }
}
