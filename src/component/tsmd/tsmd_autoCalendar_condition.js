/**
 * Created by XuanVinh on 5/11/2017.
 */
import React, {Component} from 'react'

class Tsmd_AutoCalendar_Condition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            content: "",
            disable: true,
            value: 0,
            min: 0,
            max: 0,

            message: ""
        }

        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentWillMount() {
        var condition = this.props.condition;
        this.setState({
            id: condition.id,
            content: condition.noiDung,
            min: condition.minPoint,
            max: condition.maxPoint
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    onClickCheckbox() {
        var dk = this.refs.check.checked
        this.props.setCondition(this.state.id, dk);
        this.setState({
            disable: !dk
        })
    }

    onValueChange(e) {
        var value = e.target.value;
        var mess = "";
        if(value<this.state.min || value>this.state.max){
            mess = "Giá trị nhập vào nằm ngoài khoảng ["+this.state.min+","+this.state.max+"]"
            this.props.setCanRun(false);
        }else{
            this.props.setCanRun(true);
        }
        this.setState({
            value: value,
            message: mess
        })

        this.props.setConditionValue(this.state.id, value);
    }

    render() {
        return (<div>
            <div className="condition">
                <div className="condition-checkbox">
                    <input type="checkbox" ref="check" onClick={this.onClickCheckbox}/>
                </div>
                <div className="condition-content">{this.state.content}</div>
                <div className="condition-value">
                    <input type="number" className="width-50" value={this.state.value} onChange={this.onValueChange}
                           disabled={this.state.disable}/>
                </div>
                <br/>
            </div>
            <div className="error-message margin-left-20">{this.state.message}</div>
        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

}

export default Tsmd_AutoCalendar_Condition;