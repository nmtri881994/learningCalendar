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
            chosenConditions: [],

            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermId: 0,

            mutate: 0,
            parentPercentage: 0,
            crossOverPercentage: 0,
            mutatePercentage: 0,

            numberOfGenerations: 0,
            perfectAdaptationPoints: 0,

            message: "",
            resetMessage: "",

            generations: [],
            canRun: true,
        }

        this.handleNumberOfGenerationsChange = this.handleNumberOfGenerationsChange.bind(this);
        this.handlePerfectAdaptationPointsChange = this.handlePerfectAdaptationPointsChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);

        this.setCondition = this.setCondition.bind(this);
        this.setConditionValue = this.setConditionValue.bind(this);
        this.setCanRun = this.setCanRun.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteCalendar = this.handleDeleteCalendar.bind(this);
    }

    setCondition(id, status) {
        var chosenConditions = this.state.chosenConditions;
        for (var i = 0; i < chosenConditions.length; i++) {
            if (chosenConditions[i].id == id) {
                chosenConditions[i].status = status;
            }
        }
    }

    setCanRun(bool) {
        this.setState({
            canRun: bool
        })
    }

    setConditionValue(id, value) {
        var chosenConditions = this.state.chosenConditions;
        for (var i = 0; i < chosenConditions.length; i++) {
            if (chosenConditions[i].id == id) {
                chosenConditions[i].value = value;
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        API.getSemestersNotEndOfYear(nextProps.years[0].id, (terms) => {

            API.getConditions(terms[0].id, nextProps.years[0].id, (conditions) => {
                var chosenConditions = [];
                conditions.map(cond => {
                    chosenConditions.push({
                        id: cond.id,
                        status: false,
                        value: 0,
                    })
                }, (error) => {
                    console.log(error)
                })
                this.setState({
                    years: nextProps.years,
                    chosenYearId: nextProps.years[0].id,

                    terms: terms,
                    chosenTermId: terms[0].id,

                    conditions: conditions,
                    chosenConditions: chosenConditions
                })
            })
        }, (error) => {
            console.log(error)
        });

    }

    componentWillMount() {
        getYearsNotEnd();

    }

    handleYearChange(e) {
        var chosenYearId = e.target.value;
        API.getSemestersNotEndOfYear(e.target.value, (terms) => {
            API.getConditions(terms[0].id, chosenYearId, (conditions) => {
                var chosenConditions = [];
                conditions.map(cond => {
                    chosenConditions.push({
                        id: cond.id,
                        status: false,
                        value: 0,
                    })
                }, (error) => {
                    console.log(error)
                })
                this.setState({
                    generations: [],
                    chosenYearId: chosenYearId,

                    terms: terms,
                    chosenTermId: terms[0].id,

                    conditions: conditions,
                    chosenConditions: chosenConditions,
                    resetMessage: "",
                    message: ""
                })
            })
        }, (error) => {
            console.log(error)
        });
    }

    handleTermChange(e) {
        var chosenTermId = e.target.value;
        API.getConditions(chosenTermId, this.state.chosenYearId, (conditions) => {
            var chosenConditions = [];
            conditions.map(cond => {
                chosenConditions.push({
                    id: cond.id,
                    status: false,
                    value: 0,
                })
            }, (error) => {
                console.log(error)
            })
            this.setState({
                generations: [],
                chosenTermId: chosenTermId,

                conditions: conditions,
                chosenConditions: chosenConditions,
                resetMessage: "",
                message: ""
            })
        })
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
        this.setState({
            message: "",
            resetMessage: "",
            generations: []
        })

        if(this.state.canRun){
            var setting = {
                namHocId: this.state.chosenYearId,
                kyHocId: this.state.chosenTermId,

                chosenConditions: this.state.chosenConditions,

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
        }else{
            this.setState({
                message: "Giá trị của ít nhất 1 điều kiện chưa thỏa mãn"
            })
        }

    }

    handleDeleteCalendar() {
        API.deleteAllCalendar(this.state.chosenTermId, this.state.chosenYearId, (response) => {
            this.setState({
                resetMessage: response.data
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        var years = this.state.years;
        var terms = this.state.terms;

        var conditions = this.state.conditions;

        var disableRun = "";
        if (conditions.length == 0) {
            disableRun = "disabled"
        }

        var optionalConditions = [];
        var madatoryConditions = [];

        conditions.map(cond => {
            if (cond.batBuoc == 1) {
                madatoryConditions.push(cond);
            }
            if (cond.batBuoc == 0) {
                optionalConditions.push(cond);
            }
        })

        console.log(optionalConditions, madatoryConditions);

        var generations = this.state.generations;

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

                    <div className="choose-condition-item">
                        <button className="warning-button button-medium" onClick={this.handleDeleteCalendar}>Xóa tất cả lịch học</button>
                    </div>
                    <div className=" margin-left-20 info-message">{this.state.resetMessage}</div>

                    <div className="section">

                        <div className="section-title margin-left-20">Điều kiện thích nghi</div>
                        {conditions.length == 0 && this.state.years.length != 0 ?
                            <div className="error-message margin-left-20">
                                Thuật toán không thể chạy nếu chưa có điều kiện
                            </div> : ""}
                        <div className="conditions">
                            <div className="condition-group">
                                {optionalConditions.map(condition => <Tsmd_AutoCalendar_Condition key={condition.id}
                                                                                                  condition={condition}
                                                                                                  setCondition={this.setCondition}
                                                                                                  setConditionValue={this.setConditionValue}
                                                                                                  setCanRun={this.setCanRun}
                                />)}
                            </div>
                            <div className="condition-group">
                                {madatoryConditions.map(condition => <Tsmd_AutoCalendar_Condition key={condition.id}
                                                                                                  condition={condition}
                                                                                                  setCondition={this.setCondition}
                                                                                                  setConditionValue={this.setConditionValue}
                                                                                                  setCanRun={this.setCanRun}
                                />)}
                            </div>
                        </div>
                    </div>
                    {/*<div className="section">*/}
                    {/*<div className="section-title margin-left-20">Lai hóa</div>*/}
                    {/*<div className="margin-left-20">*/}
                    {/*<input type="radio" name="lai-hoa" value="1" disabled="disabled"/> Lai hóa 1 điểm<br/>*/}
                    {/*<input type="radio" name="lai-hoa" value="2" disabled="disabled"/> Lai hóa 2 điểm*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="section">*/}
                    {/*<div className="section-title margin-left-20">Đột biến</div>*/}
                    {/*<div className="margin-left-20">*/}
                    {/*<span>% gen đột biến của 1 cá thể</span>*/}
                    {/*<input className="width-50 margin-left-5" type="number" disabled="disabled"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="section">*/}
                    {/*<div className="section-title margin-left-20">Điều kiện quần thể</div>*/}
                    {/*<div className="margin-left-20">*/}
                    {/*<span>% cá thế bố mẹ</span>*/}
                    {/*<input className="width-50 margin-right-20 margin-left-5" type="number"*/}
                    {/*disabled="disabled"/>*/}
                    {/*<span>% cá thể lai hóa</span>*/}
                    {/*<input className="width-50 margin-right-20 margin-left-5" type="number"*/}
                    {/*disabled="disabled"/>*/}
                    {/*<span>% cá thể đột biến</span>*/}
                    {/*<input className="width-50 margin-left-5" type="number" disabled="disabled"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
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
                        <button className="ok-button button-medium" onClick={this.handleSubmit} disabled={disableRun}>Bắt đầu</button>
                    </div>

                    <div className="error-message margin-left-20">
                        {this.state.message}
                    </div>

                    <div className="section">
                        <div className="section-title margin-left-20">Bảng thế hệ</div>
                        <div className="margin-left-20">
                            <table className="flat-table">
                                <thead>
                                <tr>
                                    <th>Thế hệ</th>
                                    <th>Điểm thích nghi</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Thế hệ</th>
                                    <th>Điểm thích nghi</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {generations.map(gen => <tr key={gen.theHe}>
                                    <td>{gen.theHe}</td>
                                    <td>{gen.diemThichNghi}</td>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    addGeneration(gen) {
        if (gen.kyHocId == this.state.chosenTermId && gen.namHocId == this.state.chosenYearId) {
            var generations = this.state.generations;
            generations.push(gen);

            this.setState({
                generations: generations
            })
        }
    }

    componentDidMount() {
        var socket = SockJS(APP_URL + "/calendar/auto-generate");
        var stompClient = Stomp.over(socket);

        var addGen = (gen) => this.addGeneration(gen);

        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/calendar/auto-generate", function (message) {
                addGen(JSON.parse(message.body));
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default TSMD_AutoArrangeCalendar;