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

            conditions: [],

            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermId: 0,
            dk1: false,
            dk1Value: 0,
            dk2: false,
            dk2Value: 0,
            dk3: false,
            dk3Value: 0,
            dk4: false,
            dk4Value: 0,
            dk5: false,
            dk5Value: 0,
            dk6: false,
            dk6Value: 0,
            dk7: false,
            dk7Value: 0,
            dk8: false,
            dk8Value: 0,
            dk9: false,
            dk9Value: 0,

            mutate: 0,
            parentPercentage: 0,
            crossOverPercentage: 0,
            mutatePercentage: 0,

            numberOfGenerations: 0,
            perfectAdaptationPoints: 0,

            message: ""
        }
        this.setDk1 = this.setDk1.bind(this);
        this.setDk1Value = this.setDk1Value.bind(this);

        this.setDk2 = this.setDk2.bind(this);
        this.setDk2Value = this.setDk2Value.bind(this);

        this.setDk3 = this.setDk3.bind(this);
        this.setDk3Value = this.setDk3Value.bind(this);

        this.setDk4 = this.setDk4.bind(this);
        this.setDk4Value = this.setDk4Value.bind(this);

        this.setDk5 = this.setDk5.bind(this);
        this.setDk5Value = this.setDk5Value.bind(this);

        this.setDk6 = this.setDk6.bind(this);
        this.setDk6Value = this.setDk6Value.bind(this);

        this.setDk7 = this.setDk7.bind(this);
        this.setDk7Value = this.setDk7Value.bind(this);

        this.setDk8 = this.setDk8.bind(this);
        this.setDk8Value = this.setDk8Value.bind(this);

        this.setDk9 = this.setDk9.bind(this);
        this.setDk9Value = this.setDk9Value.bind(this);

        this.handleNumberOfGenerationsChange = this.handleNumberOfGenerationsChange.bind(this);
        this.handlePerfectAdaptationPointsChange = this.handlePerfectAdaptationPointsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setDk1(bool) {
        this.setState({
            dk1: bool
        })
    }

    setDk1Value(value) {
        this.setState({
            dk1Value: value
        })
    }

    setDk2(bool) {
        this.setState({
            dk2: bool
        })
    }

    setDk2Value(value) {
        this.setState({
            dk2Value: value
        })
    }

    setDk3(bool) {
        this.setState({
            dk3: bool
        })
    }

    setDk3Value(value) {
        this.setState({
            dk3Value: value
        })
    }

    setDk4(bool) {
        this.setState({
            dk4: bool
        })
    }

    setDk4Value(value) {
        this.setState({
            dk4Value: value
        })
    }

    setDk5(bool) {
        this.setState({
            dk5: bool
        })
    }

    setDk5Value(value) {
        this.setState({
            dk5Value: value
        })
    }

    setDk6(bool) {
        this.setState({
            dk6: bool
        })
    }

    setDk6Value(value) {
        this.setState({
            dk6Value: value
        })
    }

    setDk7(bool) {
        this.setState({
            dk7: bool
        })
    }

    setDk7Value(value) {
        this.setState({
            dk7Value: value
        })
    }

    setDk8(bool) {
        this.setState({
            dk8: bool
        })
    }

    setDk8Value(value) {
        this.setState({
            dk8Value: value
        })
    }

    setDk9(bool) {
        this.setState({
            dk9: bool
        })
    }

    setDk9Value(value) {
        this.setState({
            dk9Value: value
        })
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
        API.getAllConditions((conditions)=>{

        }, )
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

    handleNumberOfGenerationsChange(e) {
        this.setState({
            numberOfGenerations: e.target.value
        })
    }


    handlePerfectAdaptationPointsChange(e) {
        this.setState({
            perfectAdaptationPoints: e.target.value
        })
    }

    handleSubmit() {
        var setting = {
            namHocId: this.state.chosenYearId,
            kyHocId: this.state.chosenTermId,

            dk1: this.state.dk1,
            dk1Value: this.state.dk1Value,
            dk2: this.state.dk2,
            dk2Value: this.state.dk2Value,
            dk3: this.state.dk3,
            dk3Value: this.state.dk3Value,
            dk4: this.state.dk4,
            dk4Value: this.state.dk4Value,
            dk5: this.state.dk5,
            dk5Value: this.state.dk5Value,
            dk6: this.state.dk6,
            dk6Value: this.state.dk6Value,
            dk7: this.state.dk7,
            dk7Value: this.state.dk7Value,
            dk8: this.state.dk8,
            dk8Value: this.state.dk8Value,
            dk9: this.state.dk9,
            dk9Value: this.state.dk9Value,

            soTheHe: this.state.numberOfGenerations,
            diemThichNghiToiUu: this.state.perfectAdaptationPoints
        }

        API.autoCalendar(setting, (response) => {
            this.setState({
                message: response
            })
        }, (error) => {
            console.log(error);
        })
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
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk1} setValue={this.setDk1Value}
                                                             content={dk1}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk2} setValue={this.setDk2Value}
                                                             content={dk2}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk3} setValue={this.setDk3Value}
                                                             content={dk3}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk4} setValue={this.setDk4Value}
                                                             content={dk4}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk5} setValue={this.setDk5Value}
                                                             content={dk5}/>
                            </div>
                            <div className="condition-group">
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk6} setValue={this.setDk6Value}
                                                             content={dk6}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk7} setValue={this.setDk7Value}
                                                             content={dk7}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk8} setValue={this.setDk8Value}
                                                             content={dk8}/>
                                <Tsmd_AutoCalendar_Condition setDk={this.setDk9} setValue={this.setDk9Value}
                                                             content={dk9}/>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Lai hóa</div>
                        <div className="margin-left-20">
                            <input type="radio" name="lai-hoa" value="1" disabled="disabled"/> Lai hóa 1 điểm<br/>
                            <input type="radio" name="lai-hoa" value="2" disabled="disabled"/> Lai hóa 2 điểm
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Đột biến</div>
                        <div className="margin-left-20">
                            <span>% gen đột biến của 1 cá thể</span>
                            <input className="width-50 margin-left-5" type="number" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Điều kiện quần thể</div>
                        <div className="margin-left-20">
                            <span>% cá thế bố mẹ</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"
                                   disabled="disabled"/>
                            <span>% cá thể lai hóa</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"
                                   disabled="disabled"/>
                            <span>% cá thể đột biến</span>
                            <input className="width-50 margin-left-5" type="number" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-title margin-left-20">Chạy chương trình</div>
                        <div className="margin-left-20">
                            <span>Số thế hệ tối đa</span>
                            <input className="width-50 margin-right-20 margin-left-5" type="number"
                                   value={this.state.numberOfGenerations}
                                   onChange={this.handleNumberOfGenerationsChange}/>
                            <span>Điểm thích nghi tối ưu</span>
                            <input className="width-50 margin-left-5" type="number"
                                   value={this.state.perfectAdaptationPoints}
                                   onChange={this.handlePerfectAdaptationPointsChange}/>
                        </div>
                    </div>
                    <div className="choose-condition-item">
                        <button onClick={this.handleSubmit}>OK</button>
                    </div>

                    <div className="error-message margin-left-20">
                        {this.state.message}
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