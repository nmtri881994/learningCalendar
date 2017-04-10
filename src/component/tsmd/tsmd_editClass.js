/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import actions

//import components
import TSMD_ClassCalendarEdit from './tsmd_classCalendarEdit'
import TSMD_ClassCalendarCreate from './tsmd_classCalendarEditCreate'

//import Apis
import * as API from '../../apiUtility/calendarApi'

class TSMD_EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            stompClient2: null,
            classId: 0,
            className: "",
            classType: 0,
            calendars: [],
            weekDays: [],
        }

        this.refreshCalendar = this.refreshCalendar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId != 0) {
            API.getWeekCalendarOfClass(nextProps.classId, (calendars) => {
                this.setState({
                    classId: nextProps.classId,
                    className: nextProps.className,
                    calendars: calendars
                });
            }, (error) => {
                console.log(error);
            });
        }

    }

    refreshCalendar(cl){
        if(cl.classId = this.state.classId){
            API.getWeekCalendarOfClass(this.props.classId, (calendars) => {
                this.setState({
                    calendars: calendars
                });
            }, (error) => {
                console.log(error);
            });
        }

    }

    componentWillMount() {

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    render() {
        var calendars = this.state.calendars;
        return (<div>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content modal-small">
                    <div className="modal-header text-center">
                        <span className="close" onClick={this.close}>&times;</span>
                        <h3>{this.state.className}</h3>
                    </div>
                    <div className="modal-body">
                        {calendars.length>0 ? calendars.map(calendar => <TSMD_ClassCalendarEdit key={calendar.id} classId={this.state.classId} calendar={calendar}/>) : ""}
                        <TSMD_ClassCalendarCreate classId={this.state.classId}/>
                    </div>
                    <div className="modal-footer text-center">
                        <button id="edit-class-button">Lưu</button>
                    </div>
                </div>

            </div>
        </div>);
    }

    componentDidMount() {

        var refreshCalendars = (cl) => this.refreshCalendar(cl);

        var socket2 = SockJS('http://localhost:8080/week-calendar/add-or-delete'); // <3>
        var stompClient2 = Stomp.over(socket2);
        stompClient2.connect({}, function (frame) {
            stompClient2.subscribe("/socket/week-calendar/add-or-delete", function (message) {
                refreshCalendars(JSON.parse(message.body));
            });
        });
        this.setState({
            stompClient2: stompClient2
        })
    }
}

export default TSMD_EditClass;