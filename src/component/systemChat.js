/**
 * Created by XuanVinh on 3/24/2017.
 */
import React, {Component} from 'react'
import {sendChat} from '../apiUtility/testApi'

class SystemChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatLog: "",
            chatMess: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount(){
        this.connection = new WebSocket('ws://localhost:8080/chats');
        this.connection.onmessage = evt => {
            console.log("received: ", evt.data);
        }
    }

    handleInputChange(e) {
        this.setState({
            chatMess: e.target.value
        });
    }

    handlePost() {
        this.connection.send(this.state.chatMess);
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