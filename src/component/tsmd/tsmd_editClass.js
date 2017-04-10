/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
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
            classId: 0,
            className: "",
            classType: 0,
            calendars: [],
            weekDays: [],
        }


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

    componentWillMount() {

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    render() {
        var weekDays = this.state.weekDays;
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
                        {calendars.length>0 ? <TSMD_ClassCalendarCreate classId={this.state.classId}/> : ""}
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