/**
 * Created by XuanVinh on 4/20/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'

//import APIs
import * as API from '../../apiUtility/studentApi'

class Student_Time extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canRegister: false,
            registerTime: null,
            timeLeft: "",

            intervalId: 0
        }

        this.refreshTimeLeft = this.refreshTimeLeft.bind(this);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        var canRegister = nextProps.canRegister;
        if(canRegister && canRegister.canRegister){
            var intervalId = setInterval(this.refreshTimeLeft,1000);
            this.setState({
                intervalId: intervalId
            })
            API.getRegisterTimeByRegisterTimeId(canRegister.registerTimeId ,(registerTime) => {
                var ms = moment(registerTime.endTime).diff(moment());
                var d = moment.duration(ms);
                var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                this.setState({
                    canRegister: canRegister,
                    registerTime: registerTime,
                    timeLeft: s
                })
            }, (error) => {
                console.log(error);
            })
        }else{
            clearInterval(this.state.intervalId);
            this.setState({
                canRegister: false,
                registerTime: null,
                timeLeft: ""
            })
        }
    }

    render() {
        var content = "";
        if (this.state.canRegister) {
            content = <div className="student-time">
                Thời gian đăng ký còn lại: {this.state.timeLeft}
            </div>
        }
        return (<div>
            {content}
        </div>)
    }

    refreshTimeLeft(){
        if(this.state.registerTime && this.state.registerTime != null){
            var ms = moment(this.state.registerTime.endTime).diff(moment());
            var d = moment.duration(ms);
            var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

            this.setState({
                timeLeft: s
            })
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

}

export default Student_Time;