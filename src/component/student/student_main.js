import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import components
import Header from "../header"
import Student_navSideBar from './student_navSideBar'
import Footer from '../footer'
import Student_Time from './student_time'

//Import actions
import {authenLogin2} from '../../action/loginAction'
import {checkCanRegister, setCanRegister} from '../../action/studentAction'

//import APIs
import * as API from '../../apiUtility/studentApi'


class SV_MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            canRegister: false,
            stompClient: null,
            registerTimes: []
        }
    }

    componentWillMount() {
        authenLogin2(localStorage.getItem('role'));
        checkCanRegister();
        API.getStudentRegisterTimes((registerTimes) => {
            this.setState({
                registerTimes: registerTimes
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header currentUserName={this.props.currentUserName}/>
                    <Student_Time canRegister={this.props.canRegister}/>
                    <div id="content">
                        <Student_navSideBar />
                        <div className="page-panel">
                            <div className="page-panel-inner">
                                <div className="page-panel-content">
                                    {this.props.children}
                                </div>
                                <div className="page-panel-right-slide-bar">
                                    <div className="right-slide-bar-header">
                                        Ghi chú
                                    </div>
                                    <div className="right-slide-bar-content">
                                        <div className="note">
                                            <div className="note-symbol note-morning">
                                            </div>
                                            <div className="note-meaning">
                                                Buổi sáng
                                            </div>
                                        </div>
                                        <div className="note">
                                            <div className="note-symbol note-afternoon">
                                            </div>
                                            <div className="note-meaning">
                                                Buổi chiều
                                            </div>
                                        </div>
                                        <div className="note">
                                            <div className="note-symbol note-ly-thuyet">
                                            </div>
                                            <div className="note-meaning">
                                                Lý thuyết
                                            </div>
                                        </div>
                                        <div className="note">
                                            <div className="note-symbol note-thuc-hanh">
                                            </div>
                                            <div className="note-meaning">
                                                Thực hành
                                            </div>
                                        </div>
                                        <div className="note">
                                            <div className="note-symbol lesson-happening">
                                            </div>
                                            <div className="note-meaning">
                                                Đang diễn ra
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

    checkCanRegister(canRegister) {
        var registerTimes = this.state.registerTimes;

        for (var i = 0; i < registerTimes.length; i++) {
            if(registerTimes[i].id = action.registerTimeId){
                if(canRegister.canRegister){
                    setCanRegister(canRegister);
                }else{
                    setCanRegister(canRegister);
                }
                break;
            }
        }
    }

    componentDidMount() {
        var socket = SockJS('http://localhost:8080/register'); // <3>
        var stompClient = Stomp.over(socket);
        var checkCanRegister = (action) => this.checkCanRegister(action);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/register", function (message) {
                checkCanRegister(JSON.parse(message.body));
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default SV_MainComponent;