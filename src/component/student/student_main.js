import React, {Component} from 'react'

//import components
import Header from "../header"
import Student_navSideBar from './student_navSideBar'
import Footer from '../footer'
import Student_Time from './student_time'

//Import actions
import {authenLogin2} from '../../action/loginAction'

//import APIs
import * as API from '../../apiUtility/userApi'

class SV_MainComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            accountName: ""
        }
    }

    componentWillMount() {
        authenLogin2(localStorage.getItem('role'));
    }

    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header currentUserName={this.props.currentUserName}/>
                    <Student_Time/>
                    <div id="content">
                        <Student_navSideBar/>
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
}

export default SV_MainComponent;