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

            khoaKhoaHocNganhNhoms: [],
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

        this.praseMess = this.praseMess.bind(this);
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

        if (this.state.canRun) {
            var setting = {
                namHocId: this.state.chosenYearId,
                kyHocId: this.state.chosenTermId,

                chosenConditions: this.state.chosenConditions,

                soTheHe: this.state.numberOfGenerations,
                diemThichNghiToiUu: this.state.perfectAdaptationPoints
            }

            API.autoCalendar(setting, (response) => {
                if (response.constructor === Array) {
                    const lopMonHocViPhams = response;
                    console.log(response);

                    var myTable = $('#myTable').dataTable();
                    myTable.fnClearTable();

                    var index = 1;
                    lopMonHocViPhams.map(lopMonHocViPham => {

                        let lichHoc = "";
                        lopMonHocViPham.tkb_lichHocTheoTuans.map(lich => {
                            lichHoc += lich.dmGiangDuong.maGiangDuong + " " + lich.tkb_thu.ten + " " + lich.tkb_tietDauTien.ten + "-" +
                                lich.tkb_tietCuoiCung.ten + ", "
                        })

                        let viPhamString = "";
                        lopMonHocViPham.viPhams.map(viPham => {
                            viPhamString += "ĐK " + viPham.dkNumber + "-" + viPham.diem + ", ";
                        })
                        myTable.fnAddData([
                            lopMonHocViPham.lopMonHoc.id,
                            lopMonHocViPham.lopMonHoc.dmMonHoc.maMonHoc + " " + lopMonHocViPham.lopMonHoc.dmMonHoc.ten,
                            lopMonHocViPham.lopMonHoc.tkb_khoa_khoaHoc.khoa.ten + "-" + lopMonHocViPham.lopMonHoc.tkb_khoa_khoaHoc.tkb_khoaHoc.nam + "-" + lopMonHocViPham.lopMonHoc.dmNganh.ten,
                            lopMonHocViPham.lopMonHoc.dmNhanVien.maNhanVien + " " + lopMonHocViPham.lopMonHoc.dmNhanVien.hoDem + " " + lopMonHocViPham.lopMonHoc.dmNhanVien.ten,
                            lichHoc,
                            viPhamString
                        ]);
                        index++;
                    })
                } else {
                    this.setState({
                        message: response
                    })
                }
            }, (error) => {
                console.log(error);
            })
        } else {
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


        var khoaKhoaHocNganhNhoms = this.state.khoaKhoaHocNganhNhoms;

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
                        <button className="warning-button button-medium" onClick={this.handleDeleteCalendar}>Xóa tất cả
                            lịch học
                        </button>
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
                        <button className="ok-button button-medium" onClick={this.handleSubmit} disabled={disableRun}>
                            Bắt đầu
                        </button>
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
                                    <th>Khoa-Khóa học-Ngành-Nhóm</th>
                                    <th>Thế hệ-Điểm thích nghi</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Khoa-Khóa học-Ngành-Nhóm</th>
                                    <th>Thế hệ-Điểm thích nghi</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {khoaKhoaHocNganhNhoms.map(khoaKhoaHocNganhNhom => <tr key={khoaKhoaHocNganhNhom.ten}>
                                    <td>{khoaKhoaHocNganhNhom.ten}</td>
                                    <td>{khoaKhoaHocNganhNhom.theHe}-{khoaKhoaHocNganhNhom.diemThichNghi}</td>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-title margin-left-20">Bảng vi phạm</div>
                        <div className="data-table margin-left-20">
                            <table id="myTable" className="display" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Lớp môn học</th>
                                    <th>Khoa - Khóa học - Ngành</th>
                                    <th>Giảng viên</th>
                                    <th>Lịch học</th>
                                    <th>Vi phạm</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Lớp môn học</th>
                                    <th>Khoa - Khóa học - Ngành</th>
                                    <th>Giảng viên</th>
                                    <th>Lịch học</th>
                                    <th>Vi phạm</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    praseMess(mess) {
        let khoaKhoaHocNganhNhoms = this.state.khoaKhoaHocNganhNhoms;
        if (khoaKhoaHocNganhNhoms.length == 0 || khoaKhoaHocNganhNhoms[khoaKhoaHocNganhNhoms.length - 1].nhomId != mess.nhomId) {
            khoaKhoaHocNganhNhoms.push({
                nhomId: mess.nhomId,
                ten: mess.nhomName,
                theHe: mess.theHe,
                diemThichNghi: mess.diemThichNghi
            })
            this.setState({
                khoaKhoaHocNganhNhoms: khoaKhoaHocNganhNhoms
            })
        } else {
            khoaKhoaHocNganhNhoms[khoaKhoaHocNganhNhoms.length - 1].theHe = mess.theHe;
            khoaKhoaHocNganhNhoms[khoaKhoaHocNganhNhoms.length - 1].diemThichNghi = mess.diemThichNghi;
            this.setState({
                khoaKhoaHocNganhNhoms: khoaKhoaHocNganhNhoms
            })
        }

    }

    componentDidMount() {

        $(document).ready(function () {
            $('#myTable').DataTable();
        });

        var socket = SockJS(APP_URL + "/calendar/auto-generate");
        var stompClient = Stomp.over(socket);

        var praseMess = (mess) => this.praseMess(mess);

        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/calendar/auto-generate", function (message) {
                praseMess(JSON.parse(message.body));
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default TSMD_AutoArrangeCalendar;