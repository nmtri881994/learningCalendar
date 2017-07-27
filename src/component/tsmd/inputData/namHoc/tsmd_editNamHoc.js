/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import {DATE_FORMAT_PICKER} from '../../../../configuration/appConfig'

class TSMD_EditNamHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: {
                id: 0,
                name: "",
                ngayBatDau: "",
                ngayKetThuc: ""
            }
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            year: nextProps.year
        })
    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._onEditYear(this.state.year);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onNameChange(e) {
        let year = this.state.year;
        year.name = e.target.value;
        this.setState({
            year: year
        })
    }

    _onStartDateChange(startDate){
        let year = this.state.year;
        year.ngayBatDau = startDate;
        this.setState({
            year: year
        })
    }

    _onEndDateChange(endDate){
        let year = this.state.year;
        year.ngayKetThuc = endDate;
        this.setState({
            year: year
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin năm học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div>
                            <div className="edit-title">Tên năm học</div>
                            <input className="input-large" value={this.state.year.name}
                                   onChange={this._onNameChange}/>
                        </div>
                        <div>
                            <div className="edit-title">Ngày bắt đầu</div>
                            <input id="datetimepicker3" className="halfLength"
                                   value={this.state.year.ngayBatDau}/>
                        </div>
                        <div>
                            <div className="edit-title">Ngày kết thúc</div>
                            <input id="datetimepicker4" className="halfLength"
                                   value={this.state.year.ngayKetThuc}/>
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

export default TSMD_EditNamHoc