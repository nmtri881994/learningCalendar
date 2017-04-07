/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
//import actions


//import Apis
import * as API from '../../apiUtility/calendarApi'

class TSMD_EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            classId: 0,
            calendars: [],
            weekDays: []
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.classId!=0){
            API.getWeekCalendarOfClass(nextProps.classId, (calendars)=>{
                this.setState({
                    calendars: calendars
                });
                console.log(calendars);
            }, (error)=>{
                console.log(error);
            });
            API.getThus((weekDays) => {
                this.setState({
                    weekDays: weekDays
                })
            }, (error) => {
                console.log(error);
            })
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
        return (<div>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content modal-small">
                    <div className="modal-header text-center">
                        <span className="close" onClick={this.close}>&times;</span>
                        <h3>Tên class</h3>
                    </div>
                    <div className="modal-body">
                        <div className="field-section">
                            <div className="section-title">Chọn thời gian, địa điểm</div>
                            <div className="edit-title">
                                Thứ
                            </div>
                            <select className="halfLength">
                                {weekDays ? weekDays.map(weekDay => <option
                                        key={weekDay.id}>{weekDay.ten}</option>) : ""}
                            </select>
                            <div className="edit-title">
                                Phòng
                            </div>
                            <select className="halfLength">

                            </select>
                            <div className="edit-title">
                                Từ tiết
                            </div>
                            <select id="start-lesson-selecbox" className="halfLength">
                            </select>
                            <div className="edit-title">
                                Tới tiết
                            </div>
                            <select id="end-lesson-selecbox" className="halfLength">
                            </select>
                        </div>
                        <div className="error-message">
                            {this.state.message}
                        </div>
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