import React, {Component} from 'react'
import Header from "../header"
import TSMD_NavSideBar from './tsmd_navSideBar'
import Footer from '../footer'

//Import actions
import {authenLogin2} from '../../action/loginAction'

class TSMD_Main extends Component {

    componentWillMount() {
        authenLogin2(localStorage.getItem('role'));
    }

    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header currentUserName={this.props.currentUserName}/>
                    <div id="content">
                        <TSMD_NavSideBar/>
                        <div className="page-panel">
                            <div className="page-panel-inner">
                                <div className="page-panel-content">
                                    {this.props.children}
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

export default TSMD_Main;