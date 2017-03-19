import React, {Component} from 'react'
import Header from "./header"
import NavSideBar from './navSideBar'
import Footer from './footer'

class SV_MainComponent extends Component {
    render() {
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

export default SV_MainComponent;