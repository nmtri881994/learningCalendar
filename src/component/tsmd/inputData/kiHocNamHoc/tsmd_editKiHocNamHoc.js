/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import {DATE_FORMAT_PICKER} from '../../../../configuration/appConfig'

class TSMD_EditKiHocNamHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termYear: {
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
            },
            terms: [],
            years: []
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onChangeYear = this._onChangeYear.bind(this);
        this._onTermChange = this._onTermChange.bind(this);
        this._onYearChange = this._onYearChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            termYear: nextProps.termYear,
            terms: nextProps.terms,
            years: nextProps.years
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._onEditTermYear(this.state.termYear);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onChangeYear(e){
        let term = this.state.term;
        term.nam = e.target.value;
        this.setState({
            term: term
        })
    }

    _onStartDateChange(startDate) {
        let termYear = this.state.termYear;
        termYear.ngayBatDau = startDate;
        this.setState({
            termYear: termYear
        })
    }

    _onEndDateChange(endDate) {
        let termYear = this.state.termYear;
        termYear.ngayKetThuc = endDate;
        this.setState({
            termYear: termYear
        })
    }

    _onTermChange(e){
        let termYear = this.state.termYear;
        termYear.kiHoc.id = e.target.value;
        this.setState({
            termYear: termYear
        })
    }

    _onYearChange(e){
        let termYear = this.state.termYear;
        termYear.namHoc.id = e.target.value;
        this.setState({
            termYear: termYear
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin kì học năm học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <span className="edit-title">Kì học</span>
                            <select className="input-medium margin-left-20" value={this.state.termYear.kiHoc.id}
                                    onChange={this._onTermChange}>
                                {this.state.terms.map(term => <option key={term.id}
                                                                      value={term.id}>{term.ten}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Năm học</span>
                            <select className="input-medium margin-left-20" value={this.state.termYear.namHoc.id}
                                    onChange={this._onYearChange}>
                                {this.state.years.map(year => <option key={year.id}
                                                                      value={year.id}>{year.name}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Ngày bắt đầu</span>
                            <input id="datetimepicker3" className="halfLength margin-left-20"
                                   value={this.state.termYear.ngayBatDau}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Ngày kết thúc</span>
                            <input id="datetimepicker4" className="halfLength margin-left-20"
                                   value={this.state.termYear.ngayKetThuc}/>
                        </div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>

        </div>)
    }

    componentDidMount() {
        $('#datetimepicker3').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
        });
        $('#datetimepicker4').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
        });

        const _onStartDateChange = (startDate) => this._onStartDateChange(startDate);
        const _onEndDateChange = (endDate) => this._onEndDateChange(endDate);

        $('#datetimepicker3').change(function (val) {
            var startDate = $('#datetimepicker3').val();
            _onStartDateChange(startDate);
        });
        $('#datetimepicker4').change(function (val) {
            var endDate = $('#datetimepicker4').val();
            _onEndDateChange(endDate);
        });
    }

    componentDidUpdate() {

    }
}

export default TSMD_EditKiHocNamHoc