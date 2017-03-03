import React, {Component} from 'react'
import Header from "./header"
import Footer from './footer'
import NavSideBar from './navSideBar'

class MainComponent extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="wrapper">
                    <NavSideBar/>
                    <main>
                        <div id="main-content">
                            { React.cloneElement(this.props.children, this.props) }
                        </div>

                    </main>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default MainComponent;