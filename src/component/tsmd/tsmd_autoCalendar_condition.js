/**
 * Created by XuanVinh on 5/11/2017.
 */
import React, {Component} from 'react'

class Tsmd_AutoCalendar_Condition extends Component{
    constructor(props){
        super(props);

        this.state={
            content: ""
        }
    }

    componentWillMount(){
        this.setState({
            content: this.props.content
        })
    }

    componentWillReceiveProps(nextProps){
    }

    render(){
        return(<div className="condition">
            <div className="condition-checkbox">
                <input type="checkbox"/>
            </div>
            <div className="condition-content">{this.state.content}</div>
            <div className="condition-value">
                <input type="number"  className="condition-input"/>
            </div>
        </div>)
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

}

export default Tsmd_AutoCalendar_Condition;