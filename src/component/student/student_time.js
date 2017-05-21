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
        console.log(nextProps);
        if(canRegister && canRegister.canRegister){
            var intervalId = setInterval(this.refreshTimeLeft,1000);
            this.setState({
                intervalId: intervalId
            })
            API.getRegisterTimeByRegisterTimeId(canRegister.registerTimeId ,(registerTime) => {

                var seconds = moment(registerTime.endTime).diff(moment())/1000;
                var days = Math.floor(seconds/86400);
                seconds = seconds%86400;
                var hours = Math.floor(seconds/3600);
                seconds = seconds%3600;
                var mins = Math.floor(seconds/60);
                seconds = Math.floor(seconds%60);

                this.setState({
                    daysLeft: days,
                    hoursLeft: hours,
                    minsLeft: mins,
                    secondsLeft: seconds
                })
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
        }else{
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
            content = <div className="student-time">
                <div>Thời gian đăng ký còn lại</div>
                <div><center>{this.state.daysLeft} ngày {this.state.hoursLeft}h:{this.state.minsLeft}m:{this.state.secondsLeft}s</center></div>
            </div>
        }
        return (<div>
            {content}
        </div>)
    }

    refreshTimeLeft(){
        if(this.state.registerTime && this.state.registerTime != null){
            var seconds = moment(this.state.registerTime.endTime).diff(moment())/1000;
            var days = Math.floor(seconds/86400);
            seconds = seconds%86400;
            var hours = Math.floor(seconds/3600);
            seconds = seconds%3600;
            var mins = Math.floor(seconds/60);
            seconds = Math.floor(seconds%60);

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