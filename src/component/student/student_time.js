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
        if(canRegister){
            var intervalId = setInterval(this.refreshTimeLeft,1000);
            this.setState({
                intervalId: intervalId
            })
            alert(intervalId);
            API.getStudentRegisterTimes((registerTimes) => {
                for (var i = 0; i < registerTimes.length; i++) {
                    if (registerTimes[i].status) {
                        var ms = moment(registerTimes[i].endTime).diff(moment());
                        var d = moment.duration(ms);
                        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                        this.setState({
                            canRegister: canRegister,
                            registerTime: registerTimes[i],
                            timeLeft: s
                        })
                        break;
                    }
                };

            }, (error) => {
                console.log(error);
            })
        }else{
            alert(this.state.intervalId);
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
        console.log(1);
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