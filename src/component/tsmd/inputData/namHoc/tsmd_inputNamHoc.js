/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'
import {DATE_FORMAT_PICKER} from '../../../../configuration/appConfig'

//import components
import TSMD_AllNamHocs from './tsmd_allNamHocs'
import TSMD_EditNamHoc from './tsmd_editNamHoc'

class TSMD_InputNamHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [],
            name: "",
            startDate: "",
            endDate: "",
            errorMess: "",
            editingYear: {
                id: 0,
                name: "",
                ngayBatDau: "",
                ngayKetThuc: ""
            }
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onDeleteYear = this._onDeleteYear.bind(this);
        this._onEditYear = this._onEditYear.bind(this);
    }

    componentWillMount() {
        API.getAllYears((years) => {
            this.setState({
                years: years
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }


    _handleSubmit() {
        API.insertYear({
            id: 0,
            name: this.state.name,
            ngayBatDau: this.state.startDate,
            ngayKetThuc: this.state.endDate
        }, (years) => {
            this.setState({
                years: years,
                name: "",
                startDate: "",
                endDate: "",
                errorMess: ""
            });
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const years = this.state.years;
        let editingYear;
        for (let i = 0; i < years.length; i++) {
            if (years[i].id == id) {
                editingYear = years[i];
                break;
            }
        }
        this.setState({
            editingYear: editingYear
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

    _onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    _onDeleteYear(yearId) {
        API.deleteYear(yearId, (years) => {
            if (years.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa năm học này vì đã tốn tại kì học cho năm học này"
                })
            } else {
                this.setState({
                    years: years,
                    errorMess: ""
                })
            }
        }, (error) => {
            console.log(error);
        })
    }

    _onEditYear(year) {
        API.editYear(year, (years) => {
            this.setState({
                years: years,
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
                    <div className="section-title margin-left-20">Nhập thông tin năm học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên năm học</span>
                        <input className="input-large margin-left-20" value={this.state.name}
                               onChange={this._onNameChange}/>
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
                    <div className="section-title margin-left-20">Danh sách năm học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllNamHocs _onDeleteYear={this._onDeleteYear} _triggerModal={this._triggerModal}
                                         years={this.state.years}/>
                    </div>
                    <TSMD_EditNamHoc _onEditYear={this._onEditYear} year={this.state.editingYear}/>
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

export default TSMD_InputNamHoc