import React, {Component} from 'react'
import moment from 'moment'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import {APP_URL} from '../../configuration/appConfig'


//Import actions
import {getCurrentWeekCalendar} from '../../action/studentAction'
import {getLearningYear, getWeekNumber, setCurrentDate} from '../../action/calendarAction'
//Import components
import Weekday from '../calendar/weekday'
import Student_editClass from './student_editClass'

//import API
import * as API from '../../apiUtility/calendarApi'

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
            editingLessonId: 0,
            editingLessonName: "",
            stompClient: null,
            maxWeek: 0,
            weeks: []
        }
        this.backOneWeek = this.backOneWeek.bind(this);
        this.forthOneWeek = this.forthOneWeek.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
        // this.refreshCalendar = this..bind(this);
    }

    triggerModal(lessonId, lessonName, subjectId) {
        this.setState({
            editingLessonId: lessonId,
            editingLessonName: lessonName
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
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

    handleWeekChange(e){
        var chosenWeek = e.target.value;
        API.getFirstDateOfWeek(this.state.year.id, chosenWeek, (date)=>{
            var currentDate = moment(date).format("YYYY-MM-DD");
            setCurrentDate(currentDate);
            getCurrentWeekCalendar(currentDate);
            getLearningYear(currentDate);
            getWeekNumber(currentDate);
        }, (error)=>{
            console.log(error);
        })
    }

    refreshCalendar() {
        var currentDate = this.state.currentDate;
        setCurrentDate(currentDate);
        getCurrentWeekCalendar(currentDate);
        getLearningYear(currentDate);
        getWeekNumber(currentDate);
    }

    componentWillMount() {
        var currentDate = moment().format("YYYY-MM-DD");
        setCurrentDate(currentDate);
        getCurrentWeekCalendar(currentDate);
        getLearningYear(currentDate);
        getWeekNumber(currentDate);
    }

    getLopHoc(lichHocTheoNgay, subjectId, subjectName, teacherName) {
        return {
            subjectId: subjectId,
            subjectName: subjectName,
            lopHocDetail: lichHocTheoNgay,
            teacherName: teacherName,
            studentShowing: true
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
        // console.log(weekCalendar);

        if (weekCalendar != null) {
            for (var i = 0; i < weekCalendar.length; i++) {
                var subjectName = weekCalendar[i].dmMonHoc.ten;
                var subjectId = weekCalendar[i].dmMonHoc.id;
                // console.log(subjectId);
                var lichHocTheoNgays = weekCalendar[i].tkb_lichHocTheoNgays;
                var teacherName = weekCalendar[i].dmNhanVien.hoDem + " " + weekCalendar[i].dmNhanVien.ten;
                for (var j = 0; j < lichHocTheoNgays.length; j++) {
                    switch (lichHocTheoNgays[j].tkb_thu.ten) {
                        case "Thứ 2":
                            lopHocThu2s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Thứ 3":
                            lopHocThu3s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Thứ 4":
                            lopHocThu4s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Thứ 5":
                            lopHocThu5s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Thứ 6":
                            lopHocThu6s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Thứ 7":
                            lopHocThu7s.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
                            break;
                        case "Chủ nhật":
                            lopHocCNs.push(this.getLopHoc(lichHocTheoNgays[j], subjectId, subjectName, teacherName));
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

        var monDay = currentdate.add(-numberOfDate + 1, 'days');
        week.push(monDay.format("DD-MM-YYYY"));


        for (var i = 2; i <= 7; i++) {
            week.push(monDay.add(1, 'days').format("DD-MM-YYYY"));
        }

        if (nextProps.year) {
            var learningYearStartDate = moment(nextProps.year.ngayBatDau);
            var learningYearEndDate = moment(nextProps.year.ngayKetThuc);
            var maxWeek = Math.floor(learningYearEndDate.diff(learningYearStartDate, "days") / 7 + 1);
            var weeks = [];
            for (var i = 1; i <= maxWeek; i++) {
                weeks.push(i);
            }
            this.setState({
                maxWeek: maxWeek,
                weeks: weeks
            })
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
                    <span className="week-name">Tuần: <select id="start-lesson-selecbox" className="button-mini" value={this.state.weekNumber}
                                                              onChange={this.handleWeekChange}>
                        {this.state.weeks.map(week => <option key={week} value={week}>{week}</option>)}
                    </select></span>
                    <i className="fa fa-forward cursor" aria-hidden="true" onClick={this.forthOneWeek}/>

                </div>
                <div className="calendar">
                    <Weekday name="Thứ 2" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu2s}
                             date={this.state.week[0]}/>
                    <Weekday name="Thứ 3" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu3s}
                             date={this.state.week[1]}/>
                    <Weekday name="Thứ 4" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu4s}
                             date={this.state.week[2]}/>
                    <Weekday name="Thứ 5" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu5s}
                             date={this.state.week[3]}/>
                    <Weekday name="Thứ 6" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu6s}
                             date={this.state.week[4]}/>
                    <Weekday name="Thứ 7" triggerModal={this.triggerModal} lopHocs={this.state.lopHocThu7s}
                             date={this.state.week[5]}/>
                    <Weekday name="Chủ nhật" triggerModal={this.triggerModal} lopHocs={this.state.lopHocCNs}
                             date={this.state.week[6]}/>
                </div>
                <Student_editClass lessonId={this.state.editingLessonId} lessonName={this.state.editingLessonName}
                                   currentDate={this.state.currentDate}/>
            </div>

        );
    }

    componentDidMount() {
        var socket = SockJS(`${APP_URL}/calendar`); // <3>
        var stompClient = Stomp.over(socket);
        var refreshFunction = () => this.refreshCalendar();
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/calendar", function (message) {
                refreshFunction();
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default SV_WeekCalendar;