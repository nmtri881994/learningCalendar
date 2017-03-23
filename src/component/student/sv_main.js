import React, {Component} from 'react'
import Header from "../header"
import SV_NavSideBar from './sv_navSideBar'
import SV_RightSideBar from './sv_rightSideBar'
import Footer from '../footer'

//Import actions
import {authenLogin2} from '../../action/loginAction'

class SV_MainComponent extends Component {

    componentWillMount() {
        authenLogin2(localStorage.getItem('role'));
    }

    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header currentUserName={this.props.currentUserName}/>
                    <div id="content">
                        <SV_NavSideBar/>
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