/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'
import {DATE_FORMAT_PICKER} from '../../../../configuration/appConfig'

//import components
import TSMD_AllKiHocNamHocs from './tsmd_allKiHocNamHoc'
import TSMD_EditKiHocNamHoc from './tsmd_editKiHocNamHoc'

class TSMD_InputKiHocNamHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: [],
            termId: 0,
            years: [],
            yearId: 0,
            startDate: "",
            endDate: "",
            termYears: [],
            errorMess: "",
            editingTermYear: {
                id: 0,
                kiHoc: {
                    id: 0,
                    ten: ""
                },
                namHoc: {
                    id: 0,
                    name: "",
                    ngayBatDau: "",
                    ngayKetThuc: ""
                },
                ngayBatDau: "",
                ngayKetThuc: ""
            }
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
        this._onTermChange = this._onTermChange.bind(this);
        this._onYearChange = this._onYearChange.bind(this);
        this._onDeleteTermYear = this._onDeleteTermYear.bind(this);
        this._onEditTermYear = this._onEditTermYear.bind(this);
    }

    componentWillMount() {
        API.getAllTerms1((terms) => {
            API.getAllYears((years) => {
                API.getAllTermYears((termYears) => {
                    this.setState({
                        terms: terms,
                        termId: terms[0].id,
                        years: years,
                        yearId: years[0].id,
                        termYears: termYears
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        API.insertTermYear({
            id: 0,
            kiHoc: {
                id: this.state.termId,
                ten: ""
            },
            namHoc: {
                id: this.state.yearId,
                name: "",
                ngayBatDau: "",
                ngayKetThuc: ""
            },
            ngayBatDau: this.state.startDate,
            ngayKetThuc: this.state.endDate
        }, (termYears) => {
            this.setState({
                termYears: termYears,
                startDate: "",
                endDate: "",
                errorMess: ""
            })
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const termYears = this.state.termYears;
        let editingTermYear;
        for (let i = 0; i < termYears.length; i++) {
            if (termYears[i].id == id) {
                editingTermYear = termYears[i];
                break;
            }
        }
        this.setState({
            editingTermYear: editingTermYear
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onStartDateChange(startDate) {
        this.setState({
            startDate: startDate
        })
    }

    _onEndDateChange(endDate) {
        this.setState({
            endDate: endDate
        })
    }

    _onTermChange(e) {
        this.setState({
            termId: e.target.value
        })
    }

    _onYearChange(e) {
        this.setState({
            yearId: e.target.value
        })
    }

    _onDeleteTermYear(id) {
        API.deleteTermYear(id, (termYears) => {
            if (termYears.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa kì học - năm học này"
                })
            } else {
                this.setState({
                    termYears: termYears,
                    errorMess: ""
                })
            }
        }, (error) => {
            console.log(error);
        })
    }

    _onEditTermYear(termYear) {
        API.editTermYear(termYear, (termYears) => {
            this.setState({
                termYears: termYears,
                errorMess: ""
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin kì học năm học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Kì học</span>
                        <select className="input-medium margin-left-20" value={this.state.termId}
                                onChange={this._onTermChange}>
                            {this.state.terms.map(term => <option key={term.id}
                                                                  value={term.id}>{term.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Năm học</span>
                        <select className="input-medium margin-left-20" value={this.state.yearId}
                                onChange={this._onYearChange}>
                            {this.state.years.map(year => <option key={year.id}
                                                                  value={year.id}>{year.name}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Ngày bắt đầu</span>
                        <input id="datetimepicker1" className="halfLength margin-left-20"
                               value={this.state.startDate}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Ngày kết thúc</span>
                        <input id="datetimepicker2" className="halfLength margin-left-20"
                               value={this.state.endDate}/>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách kì học năm học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllKiHocNamHocs _onDeleteTermYear={this._onDeleteTermYear}
                                              _triggerModal={this._triggerModal}
                                              termYears={this.state.termYears}/>
                    </div>
                    <TSMD_EditKiHocNamHoc _onEditTermYear={this._onEditTermYear} termYear={this.state.editingTermYear}
                                          terms={this.state.terms} years={this.state.years}/>
                </div>
            </div>)
    }

    componentDidMount() {
        $('#datetimepicker1').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
        });
        $('#datetimepicker2').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
        });

        const _onStartDateChange = (startDate) => this._onStartDateChange(startDate);
        const _onEndDateChange = (endDate) => this._onEndDateChange(endDate);

        $('#datetimepicker1').change(function (val) {
            var startDate = $('#datetimepicker1').val();
            _onStartDateChange(startDate);
        });
        $('#datetimepicker2').change(function (val) {
            var endDate = $('#datetimepicker2').val();
            _onEndDateChange(endDate);
        });
    }

    componentDidUpdate() {
    }
}

export default TSMD_InputKiHocNamHoc