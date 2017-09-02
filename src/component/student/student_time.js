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
            daysLeft: 0,
            hoursLeft: 0,
            minsLeft: 0,
            secondsLeft: 0,

            intervalId: 0
        }

        this.refreshTimeLeft = this.refreshTimeLeft.bind(this);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        var canRegister = nextProps.canRegister;
        if (canRegister && canRegister.canRegister) {
            var intervalId = setInterval(this.refreshTimeLeft, 1000);
            this.setState({
                intervalId: intervalId
            })
            API.getRegisterTimeByRegisterTimeId(canRegister.registerTimeId, (registerTime) => {

                var seconds = moment(registerTime.endTime).diff(moment()) / 1000;
                var days = Math.floor(seconds / 86400);
                seconds = seconds % 86400;
                var hours = Math.floor(seconds / 3600);
                seconds = seconds % 3600;
                var mins = Math.floor(seconds / 60);
                seconds = Math.floor(seconds % 60);


                this.setState({
                    canRegister: canRegister,
                    registerTime: registerTime,

                    daysLeft: days,
                    hoursLeft: hours,
                    minsLeft: mins,
                    secondsLeft: seconds
                })
            }, (error) => {
                console.log(error);
            })
        } else {
            clearInterval(this.state.intervalId);
            this.setState({
                canRegister: false,
                registerTime: null,
            })
        }
    }

    render() {
        var content = "";
        if (this.state.canRegister) {
            content = <div>
                <div className="time-title">Thời gian đăng ký còn lại</div>
                <div className="time-content">
                    <div className="time-item time-day">
                        <div className="time-number">{this.state.daysLeft}</div>
                        <div className="time">ngày</div>
                    </div>

                    <div className="time-item">
                        <div className="time-number">{this.state.hoursLeft<10?"0"+this.state.hoursLeft:this.state.hoursLeft}</div>
                        <div className="time">giờ</div>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-item">
                        <div className="time-number">{this.state.minsLeft<10?"0"+this.state.minsLeft:this.state.minsLeft}</div>
                        <div className="time">phút</div>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-item">
                        <div className="time-number">{this.state.secondsLeft<10?"0"+this.state.secondsLeft:this.state.secondsLeft}</div>
                        <div className="time">giây</div>
                    </div>
                </div>
            </div>
        }
        return (<div>
            {content}
        </div>)
    }

    refreshTimeLeft() {
        if (this.state.registerTime && this.state.registerTime != null) {
            var seconds = moment(this.state.registerTime.endTime).diff(moment()) / 1000;
            var days = Math.floor(seconds / 86400);
            seconds = seconds % 86400;
            var hours = Math.floor(seconds / 3600);
            seconds = seconds % 3600;
            var mins = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);

            this.setState({
                daysLeft: days,
                hoursLeft: hours,
                minsLeft: mins,
                secondsLeft: seconds
            })
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

}

export default Student_Time;