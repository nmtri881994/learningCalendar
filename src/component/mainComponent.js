import React, {Component} from 'react'

class MainComponent extends Component{
    render(){
        return(
            <div>
                <b>Header here</b><br/>
                { React.cloneElement(this.props.children, this.props) }
                <b>Footer here</b>
            </div>
        );
    }
}

export default MainComponent;