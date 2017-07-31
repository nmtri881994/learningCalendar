/**
 * Created by XuanVinh on 3/24/2017.
 */
import React, {Component} from 'react'
// import SockJS from 'sockjs-client'
// require('stomp-websocket')
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
// var SockJS = require('sockjs-client'); // <1>
// var Stomp = require('stompjs'); // <2>



import {sendChat} from '../apiUtility/testApi'
import stompClient from '../websocket/websocket-listener'

class SystemChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatLog: "",
            chatMess: "",
            connection: null,
            stompClient: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.abc = this.abc.bind(this);
    }

    componentDidMount() {
        var socket = SockJS('http://localhost:8080/questions'); // <3>
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
            stompClient.subscribe("/socket/questions", function (message) {
                alert(message.body);
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }

    abc(message){
        console.log("received: ",message.data);
    }

    handleInputChange(e) {
        this.setState({
            chatMess: e.target.value
        });
    }

    handlePost() {
        // alert(1);
        this.state.stompClient.send("/socket/questions", {}, this.state.chatMess);
    }

    render() {
        var chatLog = this.state.chatLog;
        return (
            <div style={{width: "100%"}}>
                This is system chat <br/>
                <input onChange={this.handleInputChange} value={this.state.chatMess}/>
                <button onClick={this.handlePost}>Post</button>
                {this.state.chatLog}
            </div>
        );
    }
}

export default SystemChat;