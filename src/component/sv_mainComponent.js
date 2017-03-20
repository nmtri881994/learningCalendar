import React, {Component} from 'react'
import Header from "./header"
import NavSideBar from './navSideBar'
import Footer from './footer'

//Import actions
import {authenLogin2} from '../action/loginAction'

class SV_MainComponent extends Component {

    componentWillMount(){
        authenLogin2(localStorage.getItem('role'));
    }

    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header currentUserName={this.props.currentUserName}/>
                    <div id="content">
                        <NavSideBar/>
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

export default SV_MainComponent;