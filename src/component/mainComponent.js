import React, {Component} from 'react'
import Header from "./header"
import Footer from './footer'

class MainComponent extends Component{
    render(){
        return(
            <div>
                <Header/>
                { React.cloneElement(this.props.children, this.props) }
                <Footer/>
            </div>
        );
    }
}

export default MainComponent;