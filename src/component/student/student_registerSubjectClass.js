/**
 * Created by Tri on 4/21/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {APP_URL} from '../../configuration/appConfig'


//import APIs
import * as API from '../../apiUtility/studentApi'

//import components
import Student_ShowAllRegisterClasses from './student_showAllRegisterClasses'
import Student_RegisteredClassCalendar from './student_registeredClassCalendar'

class Student_RegisterSubjectClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stompClient: null,
            classes: [],
            content: "",
            canRegister: null
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {

        var canRegister = nextProps.canRegister;

        var content = "";
        if (canRegister && canRegister.canRegister) {

            API.getClassesCanRegister(canRegister.registerTimeId, (classes) => {
                if (classes.length == 0) {
                    content = "Bạn không có lớp nào để đăng ký trong đợt đăng ký này"
                } else {
                    this.setState({
                        canRegister: canRegister,
                        classes: classes
                    })
                }
            }, (error) => {
                console.log(error);
            })
        } else {
            content = <div className="error-message">Bây giờ không phải thời gian đăng ký của bạn</div>;
        }

        this.setState({
            content: content
        })
    }

    render() {
        return (<div>
            {this.state.content}
            <Student_ShowAllRegisterClasses classes={this.state.classes}/>
            <Student_RegisteredClassCalendar classes={this.state.classes}/>
        </div>)
    }

    refreshClasses(classId) {
        var content = "";
        var classes = this.state.classes;
        var canRegister = this.state.canRegister;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].class.id == classId) {
                API.getClassesCanRegister(canRegister.registerTimeId, (classes) => {
                    if (classes.length == 0) {
                        content = "Bạn không có lớp nào để đăng ký trong đợt đăng ký này"
                    } else {
                        this.setState({
                            classes: classes
                        })
                    }
                }, (error) => {
                    console.log(error);
                })
            }
        }
        this.setState({
            content: content
        })
    }

    componentDidMount() {

        var refreshClasses = (classId) => this.refreshClasses(classId);

        var socket = SockJS(`${APP_URL}/student/register`); // <3>
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/student/register", function (message) {
                refreshClasses(JSON.parse(message.body).classId);
            });
        });
        this.setState({
            stompClient: stompClient
        })

    }

    componentDidUpdate() {
    }
}

export  default Student_RegisterSubjectClass