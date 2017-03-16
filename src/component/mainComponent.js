import React, {Component} from 'react'
import Header from "./header"
import NavSideBar from './navSideBar'
import Footer from './footer'
import {test} from '../action/testAction'

class MainComponent extends Component {
    render() {
        test();
        console.log("component ",this.props.userLogined)
        return (
            <div id="page">
                <div className="wrapper">
                    <Header/>
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

export default MainComponent;