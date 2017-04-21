/**
 * Created by Tri on 4/21/2017.
 */
import React, {Component} from 'react'

class Student_RegisterSubjectClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        }
    }

    componentWillMount() {
        var canRegister = this.props.canRegister;

        var content = "";
        if(canRegister){
        }else{
            content = <div className="error-message">Bây giờ không phải thời gian đăng ký của bạn</div>;
        }

        this.setState({
            content: content
        })
    }

    componentWillReceiveProps(nextProps) {
        var canRegister = nextProps.canRegister;

        var content = "";
        if(canRegister){
        }else{
            content = <div className="error-message">Bây giờ không phải thời gian đăng ký của bạn</div>;
        }

        this.setState({
            content: content
        })
    }

    render() {
        return (<div>
            {this.state.content}
        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export  default Student_RegisterSubjectClass