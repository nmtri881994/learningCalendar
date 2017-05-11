/**
 * Created by Tri on 4/4/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import actions
import {getYearsNotEnd, getSemestersNotEndOfYear} from '../../action/tsmdAction'

//import APIs
import * as API from '../../apiUtility/tsmdApi'
import * as API2 from '../../apiUtility/calendarApi'

//import components
import Tsmd_AutoCalendar_Condition from './tsmd_autoCalendar_condition'

//import config
import {APP_URL} from '../../configuration/appConfig'

class TSMD_AutoArrangeCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stompClient: null,

            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermId: 0
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            years: nextProps.years,
            chosenYearId: nextProps.years[0].id,
        });
        API.getSemestersNotEndOfYear(nextProps.years[0].id, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms[0].id
            });
        }, (error) => {
            console.log(error)
        });

    }

    componentWillMount() {
        getYearsNotEnd();
    }

    handleYearChange(e) {
        var chosenYearId = e.target.value;
        this.setState({
            chosenYearId: chosenYearId
        })
        API.getSemestersNotEndOfYear(e.target.value, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms[0].id
            });
        }, (error) => {
            console.log(error)
        });
    }

    handleTermChange(e) {
        var chosenTermId = e.target.value;
        this.setState({
            chosenTermId: chosenTermId
        });
    }

    render() {
        var years = this.state.years;
        var terms = this.state.terms;

        var dk1 = "Giáo viên dạy không quá 8 giờ/ngày";
        var dk2 = "Giáo viên dạy không quá 6 giờ lý thuyết/ngày";
        var dk3 = "Giáo viên dạy không quá 30 giờ lý thuyết/tuần";
        var dk4 = "Lớp môn học không xung đột với ngày nghỉ trong tuần của giáo viên";
        var dk5 = "Các lịch của một lớp môn học không trùng thứ";
        var dk6 = "Lớp môn học không xung đột với lịch của giáo viên";
        var dk7 = "Lớp môn học không xung đột với lịch của lớp khác cùng khoa-khóa học-ngành";
        var dk8 = "Phòng học không có nhiều hơn 1 lớp trong cùng 1 khoảng thời gian";
        var dk9 = "1 khoa-khóa học-ngành không có nhiều hơn 3 lớp học cùng 1 khoảng thời gian";

        return (<div>
                <div className="choose-condition">
                    <div className="section">
                        <div className="section-title margin-left-20">Kỳ học</div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Năm học
                    </span>
                            <select className="year-select-short" onChange={this.handleYearChange}
                                    value={this.state.chosenYearId}>
                                {years.map(year => <option key={year.id} value={year.id}>{year.name}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Kỳ học
                    </span>
                            <select className="year-select-short" onChange={this.handleTermChange}
                                    value={this.state.chosenTermId}>
                                {terms.map(term => <option key={term.id} value={term.id}>{term.ten}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="section">

                        <div className="section-title margin-left-20">Điều kiện thích nghi</div>
                        <div className="conditions">
                            <div className="condition-group">
                                <Tsmd_AutoCalendar_Condition content={dk1}/>
                                <Tsmd_AutoCalendar_Condition content={dk2}/>
                                <Tsmd_AutoCalendar_Condition content={dk3}/>
                                <Tsmd_AutoCalendar_Condition content={dk4}/>
                                <Tsmd_AutoCalendar_Condition content={dk5}/>
                            </div>
                            <div className="condition-group">
                                <Tsmd_AutoCalendar_Condition content={dk6}/>
                                <Tsmd_AutoCalendar_Condition content={dk7}/>
                                <Tsmd_AutoCalendar_Condition content={dk8}/>
                                <Tsmd_AutoCalendar_Condition content={dk9}/>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Lai hóa</div>
                        <div className="margin-left-20">
                            <input type="radio" name="lai-hoa" value="male"/> Lai hóa 1 điểm<br/>
                            <input type="radio" name="lai-hoa" value="female"/> Lai hóa 2 điểm
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Đột biến</div>
                        <div className="margin-left-20">
                            <span>% gen đột biến của 1 cá thể</span>
                            <input className="width-50 margin-left-5" type="number"/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Điều kiện quần thể</div>
                        <div className="margin-left-20">
                            <span>% cá thế bố mẹ</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"/>
                            <span>% cá thể lai hóa</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"/>
                            <span>% cá thể đột biến</span>
                            <input className="width-50 margin-left-5" type="number"/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Chạy chương trình</div>
                        <div className="margin-left-20">
                            <span>Số thế hệ tối đa</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"/>
                            <span>Điểm thích nghi tối ưu</span>
                            <input className="width-50 margin-left-5" type="number"/>
                        </div>
                    </div>
                    <div className="choose-condition-item">
                        <button>OK</button>
                    </div>
                </div>

            </div>
        )
    }

    refreshCaledar(classId) {
        var shoudldRefresh = false;
        var classes = this.state.classes;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].id == classId) {
                shoudldRefresh = true;
                break;
            }
        }
        if (shoudldRefresh) {
            var state = this.state;
            API2.getClasses(state.chosenYearId, state.chosenTermId, state.chosenFacultyId, state.chosenYearOfAdmissionId, state.chosenMajorId, (classes) => {
                this.setState({
                    classes: classes
                });
            }, (error) => {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        // var socket = SockJS(APP_URL + "/week-calendar/edit");
        // var stompClient = Stomp.over(socket);
        //
        // var refresh = (classId) => this.refreshCaledar(classId);
        //
        // stompClient.connect({}, function (frame) {
        //     stompClient.subscribe("/socket/week-calendar/edit", function (message) {
        //         refresh(JSON.parse(message.body).classId);
        //     });
        // });
        // this.setState({
        //     stompClient: stompClient
        // })
    }
}

export default TSMD_AutoArrangeCalendar;