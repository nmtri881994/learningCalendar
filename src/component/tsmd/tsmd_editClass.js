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

            editingClassId: 0,
            cl: null
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

        API.getClass(nextProps.classId, (cl) => {
            this.setState({
                cl: cl
            })
        }, (error) => {
            console.log(error);
        });
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
                        calendars: calendars,
                        editingClassId: nextProps.editingClassId
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
        var soTietLyThuyet = 0;
        var soTietThucHanh = 0;
        var soTiet = 0;
        var soTuan = 0;
        calendars.map(calendar => {
            soTiet = calendar.tkb_tietCuoiCung.thuTu - calendar.tkb_tietDauTien.thuTu + 1;
            soTuan = calendar.tuanKetThuc - calendar.tuanBatDau + 1;
            if (calendar.dmGiangDuong.dmLoaiPhong.id == 1) {
                soTietLyThuyet += soTiet * soTuan;
            }
            if (calendar.dmGiangDuong.dmLoaiPhong.id == 2) {
                soTietThucHanh += soTiet * soTuan;
            }
        })

        var cl = this.state.cl;
        var className = "";
        if(cl){
            if(soTietLyThuyet > cl.soTietLyThuyet || soTietThucHanh>cl.soTietThucHanh){
                className="error-message";
            }else if(soTietLyThuyet == cl.soTietLyThuyet && soTietThucHanh == cl.soTietThucHanh){
                className="info-message";
            }else{
                className = "warning-message"
            }
        }
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
                        <div className={className}>Số tiết lý thuyết: {soTietLyThuyet}/{cl?cl.soTietLyThuyet:""} <span className="margin-left-20"></span> Số tiết thực
                            hành: {soTietThucHanh}/{cl?cl.soTietThucHanh:""}</div>
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
                        {/*<button id="edit-class-button">Lưu</button>*/}
                    </div>
                </div>

            </div>
        </div>);
    }

    componentDidMount() {

    }
}

export default TSMD_EditClass;