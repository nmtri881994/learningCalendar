/**
 * Created by XuanVinh on 4/20/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'

//import APIs
import * as API from '../../apiUtility/userApi'

class Student_Time extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canRegister: false,
            registerTime: null,
            timeLeft: ""
        }

        this.refreshTimeLeft = this.refreshTimeLeft.bind(this);
    }

    componentWillMount() {
        clearInterval(this.state.intervalId);
        API.getStudentRegisterTimes((registerTimes) => {
            for (var i = 0; i < registerTimes.length; i++) {
                if (registerTimes[i].status) {
                    var ms = moment(registerTimes[i].endTime).diff(moment());
                    var d = moment.duration(ms);
                    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                    this.setState({
                        canRegister: true,
                        registerTime: registerTimes[i],
                        timeLeft: s
                    })
                    break;
                }
            };

        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {
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
        // var refreshTimeLeft = () => this.refreshTimeLeft();
        var intervalId = setInterval(this.refreshTimeLeft,1000);
        this.setState({
            intervalId: intervalId
        })
    }

    componentDidUpdate() {

    }

}

export default Student_Time;