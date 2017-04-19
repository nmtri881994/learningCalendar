/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import actions

//import components
import TSMD_ClassCalendarEdit from './tsmd_classCalendarEdit'
import TSMD_ClassCalendarCreate from './tsmd_classCalendarCreate'

//import Apis
import * as API from '../../apiUtility/calendarApi'

//import config
import {APP_URL} from '../../configuration/appConfig'

class TSMD_EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            stompClient: null,

            basicInfo: null,

            classId: 0,
            className: "",
            classType: 0,
            calendars: [],
            weekDays: [],
            availableWeeks: [],
        }

        // this.refreshCalendar = this.refreshCalendar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var basicInfo = {
            yearId: nextProps.yearId,
            termId: nextProps.termId,
            facultyId: nextProps.facultyId,
            yearOfAdmissionId: nextProps.yearOfAdmissionId,
            majorId: nextProps.majorId
        }

        if (nextProps.classId != 0) {
            var availableWeeks = [];
            API.getTermWeekTime(nextProps.termId, nextProps.yearId, (weekTime) => {
                for (var i = weekTime.startWeek; i <= weekTime.endWeek; i++) {
                    availableWeeks.push(i);
                };
                API.getWeekCalendarOfClass(nextProps.classId, (calendars) => {
                    this.setState({
                        basicInfo: basicInfo,
                        availableWeeks: availableWeeks,
                        classId: nextProps.classId,
                        className: nextProps.className,
                        calendars: calendars
                    });
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error)
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
                        {calendars.length > 0 ? calendars.map(calendar => <TSMD_ClassCalendarEdit key={calendar.id}
                                                                                                  basicInfo={this.state.basicInfo}
                                                                                                  availableWeeks={this.state.availableWeeks}
                                                                                                  classId={this.state.classId}
                                                                                                  calendar={calendar}/>) : ""}
                        <TSMD_ClassCalendarCreate availableWeeks={this.state.availableWeeks}
                                                  basicInfo={this.state.basicInfo}
                                                  classId={this.state.classId}/>
                    </div>
                    <div className="modal-footer text-center">
                        <button id="edit-class-button">Lưu</button>
                    </div>
                </div>

            </div>
        </div>);
    }

    componentDidMount() {

    }
}

export default TSMD_EditClass;