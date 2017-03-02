import React, {Component} from 'react'
import Header from "./header"
import Footer from './footer'
import NavSideBar from './navSideBar'

class MainComponent extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div>
                    <NavSideBar/>
                    <div id="mainContent">
                        { React.cloneElement(this.props.children, this.props) }
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComponent;