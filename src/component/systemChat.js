/**
 * Created by XuanVinh on 3/24/2017.
 */
import React, {Component} from 'react'
import {sendChat} from '../apiUtility/testApi'

class SystemChat extends Component{
    constructor(props){
        super(props);
        this.state = {
            chatLog: "",
            chatMess: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleInputChange(e){
        this.setState({
            chatMess: e.target.value
        });
    }

    handlePost(){
        console.log("Trigger api");
        console.log(this.state.chatMess);
        sendChat(this.state.chatMess);
    }

    render(){
        var source = new EventSource('http://localhost:8080/api/test/chats');
        var chatLog = this.state.chatLog;
        source.addEventListener('response', function(event){
            console.log("Auto received: ",event.data);
        });
        return(
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