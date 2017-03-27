import React, {Component} from 'react'
import moment from 'moment'

//Import actions
import {getCurrentWeekCalendar} from '../../action/teacherAction'
import {getLearningYear, getWeekNumber, setCurrentDate} from '../../action/calendarAction'
//Import components
import Weekday from '../calendar/weekday'
import Teacher_editClass from './teacher_editClass'

class SV_WeekCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lopHocThu2s: [],
            lopHocThu3s: [],
            lopHocThu4s: [],
            lopHocThu5s: [],
            lopHocThu6s: [],
            lopHocThu7s: [],
            lopHocCNs: [],
            year: null,
            weekNumber: 0,
            currentDate: "",
            week: [],
            lessonId: -1,
            openModal: false
        }
        this.backOneWeek = this.backOneWeek.bind(this);
        this.forthOneWeek = this.forthOneWeek.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
    }

    triggerModal(lessonId, openModal){
        this.setState({
            lessonId: lessonId,
            openModal: openModal
        });
    }

    backOneWeek() {
        var currentDate = moment(this.state.currentDate);
        var backOneWeekDate = currentDate.add(-7, 'days').format("YYYY-MM-DD");
        setCurrentDate(backOneWeekDate);
        getCurrentWeekCalendar(backOneWeekDate);
        getLearningYear(backOneWeekDate);
        getWeekNumber(backOneWeekDate);
    }

    forthOneWeek() {
        var currentDate = moment(this.state.currentDate);
        var forthOneWeekDate = currentDate.add(7, 'days').format("YYYY-MM-DD");
        setCurrentDate(forthOneWeekDate);
        getCurrentWeekCalendar(forthOneWeekDate);
        getLearningYear(forthOneWeekDate);
        getWeekNumber(forthOneWeekDate);
    }

    componentWillMount() {
        var currentDate = moment().format("YYYY-MM-DD");
        setCurrentDate(currentDate);
        getCurrentWeekCalendar(currentDate);
        getLearningYear(currentDate);
        getWeekNumber(currentDate);
    }

    getTietByTenTiet(tenTiet) {
        switch (tenTiet) {
            case "Tiết 1":
                return 1;
            case "Tiết 2":
                return 2;
            case "Tiết 3":
                return 3;
            case "Tiết 4":
                return 4;
            case "Tiết 5":
                return 5;
            case "Tiết 6":
                return 6;
            case "Tiết 7":
                return 7;
            case "Tiết 8":
                return 8;
            case "Tiết 9":
                return 9;
            case "Tiết 10":
                return 10;
            default:
                console.log(lichHocTheoNgay.tkb_tietDauTien.ten);
                return 0;
        }
    }

    getLopHoc(lichHocTheoNgay, name, giangVien) {
        var type = "";
        if (lichHocTheoNgay.giangDuong.dayNha.ten == "Dãy nhà lý thuyết") {
            type = "Lý thuyết";
        }
        if (lichHocTheoNgay.giangDuong.dayNha.ten == "Dãy nhà thực hành") {
            type = "Thực hành";
        }

        var tietDauTien = this.getTietByTenTiet(lichHocTheoNgay.tkb_tietDauTien.ten);
        var tietCuoiCung = this.getTietByTenTiet(lichHocTheoNgay.tkb_tietCuoiCung.ten);


        return {
            id: lichHocTheoNgay.id,
            name: name,
            startLesson: tietDauTien,
            endLesson: tietCuoiCung,
            type: type,
            giangDuong: lichHocTheoNgay.giangDuong.maGiangDuong,
            giangVien: giangVien
        };
    }

    componentWillReceiveProps(nextProps) {

        //Get lopHocs per day
        var lopHocThu2s = [];
        var lopHocThu3s = [];
        var lopHocThu4s = [];
        var lopHocThu5s = [];
        var lopHocThu6s = [];
        var lopHocThu7s = [];
        var lopHocCNs = [];

        var weekCalendar = nextProps.weekCalendar;

        if (weekCalendar != null) {
            for (var i = 0; i < weekCalendar.length; i++) {
                var name = weekCalendar[i].monHoc.ten;
                var lichHocTheoNgays = weekCalendar[i].tkb_lichHocTheoNgays;
                for (var j = 0; j < lichHocTheoNgays.length; j++) {
                    switch (lichHocTheoNgays[j].tkb_thu.ten) {
                        case "Thứ 2":
                            lopHocThu2s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 3":
                            lopHocThu3s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 4":
                            lopHocThu4s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 5":
                            lopHocThu5s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 6":
                            lopHocThu6s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 7":
                            lopHocThu7s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Chủ nhật":
                            lopHocCNss.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        default:
                            console.log(lichHocTheoNgays[j].tkb_thu.ten);
                    }
                }
            }
        }

        //Get all day of current week
        var currentdate = moment(nextProps.currentDay, "YYYY-MM-DD");
        var numberOfDate = currentdate.day();
        var week = [];

        var monDay = currentdate.add(-numberOfDate+1, 'days');
        week.push(monDay.format("YYYY-MM-DD"));


        for (var i = 2; i <= 7; i++) {
            week.push(monDay.add(1, 'days').format("YYYY-MM-DD"));
        }


        this.setState({
            lopHocThu2s: lopHocThu2s,
            lopHocThu3s: lopHocThu3s,
            lopHocThu4s: lopHocThu4s,
            lopHocThu5s: lopHocThu5s,
            lopHocThu6s: lopHocThu6s,
            lopHocThu7s: lopHocThu7s,
            lopHocCNs: lopHocCNs,
            year: nextProps.year,
            weekNumber: nextProps.weekNumber,
            currentDate: nextProps.currentDay,
            week: week
        });

    }

    render() {
        return (
            <div className="calendar-panel">
                <div>
                    Năm học: {this.state.year != null ? this.state.year.name : ""} <br/>
                    <i className="fa fa-backward cursor" aria-hidden="true" onClick={this.backOneWeek}/>
                    <span className="week-name">Tuần: {this.state.weekNumber}</span>
                    <i className="fa fa-forward cursor" aria-hidden="true" onClick={this.forthOneWeek}/>
                </div>
                <div className="calendar">
                    <Weekday name="Thứ 2" triggerModal={this.triggerModal} openModal lopHocs={this.state.lopHocThu2s} date={this.state.week[0]}/>
                    <Weekday name="Thứ 3" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu3s} date={this.state.week[1]}/>
                    <Weekday name="Thứ 4" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu4s} date={this.state.week[2]}/>
                    <Weekday name="Thứ 5" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu5s} date={this.state.week[3]}/>
                    <Weekday name="Thứ 6" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu6s} date={this.state.week[4]}/>
                    <Weekday name="Thứ 7" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu7s} date={this.state.week[5]}/>
                    <Weekday name="Chủ nhật" triggerModal={this.triggerModal} lopHocs={this.state.lopHocCNs} date={this.state.week[6]}/>
                </div>
                <Teacher_editClass lessonId={this.state.lessonId} openModal={this.state.openModal} />
            </div>

        );
    }
}

export default SV_WeekCalendar;