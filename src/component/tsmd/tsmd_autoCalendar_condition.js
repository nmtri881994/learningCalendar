/**
 * Created by XuanVinh on 5/11/2017.
 */
import React, {Component} from 'react'

class Tsmd_AutoCalendar_Condition extends Component{
    constructor(props){
        super(props);

        this.state={
            content: "",
            disable: true,
            value: 0
        }

        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            content: this.props.content
        })
    }

    componentWillReceiveProps(nextProps){
    }

    onClickCheckbox(){
        var dk = this.refs.check.checked
        this.props.setDk(dk);
        this.setState({
            disable: !dk
        })
    }

    onValueChange(e){
        var value = e.target.value;
        this.setState({
            value: value
        })

        this.props.setValue(value);
    }

    render(){
        return(<div className="condition">
            <div className="condition-checkbox">
                <input type="checkbox" ref="check" onClick={this.onClickCheckbox}/>
            </div>
            <div className="condition-content">{this.state.content}</div>
            <div className="condition-value">
                <input type="number" className="width-50" value={this.state.value} onChange={this.onValueChange} disabled={this.state.disable}/>
            </div>
        </div>)
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

}

export default Tsmd_AutoCalendar_Condition;