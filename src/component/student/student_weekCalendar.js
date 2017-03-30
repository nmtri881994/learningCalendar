import React, {Component} from 'react'
import moment from 'moment'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//Import actions
import {getCurrentWeekCalendar} from '../../action/studentAction'
import {getLearningYear, getWeekNumber, setCurrentDate} from '../../action/calendarAction'
//Import components
import Weekday from '../calendar/weekday'
import Student_editClass from './student_editClass'

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
            stompClient: null
        }
        this.backOneWeek = this.backOneWeek.bind(this);
        this.forthOneWeek = this.forthOneWeek.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        // this.refreshCalendar = this..bind(this);
    }

    triggerModal(lessonId, lessonName, subjectId) {
        // alert(subjectId);
        //to-do
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

    refreshCalendar(){
        var currentDate = this.state.currentDate;
        console.log("current date: ",currentDate);
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
            teacherName: teacherName
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
                var subjectName = weekCalendar[i].monHoc.ten;
                var subjectId = weekCalendar[i].monHoc.id;
                // console.log(subjectId);
                var lichHocTheoNgays = weekCalendar[i].tkb_lichHocTheoNgays;
                var teacherName = weekCalendar[i].giaoVien.hoDem +" "+ weekCalendar[i].giaoVien.ten;
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

    componentDidMount(){
        var socket = SockJS('http://localhost:8080/calendar'); // <3>
        var stompClient = Stomp.over(socket);
        var refreshFunction = () => this.refreshCalendar();
        stompClient.connect({}, function(frame) {
            stompClient.subscribe("/socket/calendar", function (message) {
                refreshFunction();
            });
        });
        this.setState({
            stompClient: stompClient
        })
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
                <Student_editClass currentDate={this.state.currentDate} subjectRooms={this.state.editingSubjectRooms}
                                   lessonId={this.state.editingLessonId}
                                   lessonName={this.state.editingLessonName}
                                   lessonDetail={this.state.editingLessonDetail} allLessons={this.state.allLessons}
                                   subjectId={this.state.editingSubjectId}/>
            </div>

        );
    }
}

export default SV_WeekCalendar;