import React, {Component} from 'react'
import Header from "./header"
import NavSideBar from './navSideBar'
import PagePanel from './pagePanel'
import Footer from './footer'

class MainComponent extends Component {
    render() {
        return (
            <div id="page">
                <div className="wrapper">
                    <Header/>
                    <div id="content">
                        <NavSideBar/>
                        <PagePanel/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MainComponent;