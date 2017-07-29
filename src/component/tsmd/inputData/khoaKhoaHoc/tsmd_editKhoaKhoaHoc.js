/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditKhoaKhoaHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khoaKhoaHoc: {
                id: 0,
                khoa: {
                    id: 0,
                    ma: "",
                    ten: ""
                },
                tkb_khoaHoc: {
                    id: 0,
                    nam: 0
                },
                kiPhanNganh: {
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
                kiBatDau: {
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
                kiKetThuc: {
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
            },
            khoas: [],
            khoaHocs: [],
            termYears: [],
        }

        this._onChangeYear = this._onChangeYear.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

        this._onKhoaChange = this._onKhoaChange.bind(this);
        this._onKhoaHocChange = this._onKhoaHocChange.bind(this);
        this._onKiBatDauChange = this._onKiBatDauChange.bind(this);
        this._onKiKetThucChange = this._onKiKetThucChange.bind(this);
        this._onKiPhanNganhChange = this._onKiPhanNganhChange.bind(this);
    }


    _onKhoaChange(e) {
        let khoaKhoaHoc = this.state.khoaKhoaHoc;
        khoaKhoaHoc.khoa.id = e.target.value;
        this.setState({
            khoaKhoaHoc: khoaKhoaHoc
        })
    }

    _onKhoaHocChange(e) {
        let khoaKhoaHoc = this.state.khoaKhoaHoc;
        khoaKhoaHoc.tkb_khoaHoc.id = e.target.value;
        this.setState({
            khoaKhoaHoc: khoaKhoaHoc
        })
    }

    _onKiBatDauChange(e) {
        let khoaKhoaHoc = this.state.khoaKhoaHoc;
        khoaKhoaHoc.kiBatDau.id = e.target.value;
        this.setState({
            khoaKhoaHoc: khoaKhoaHoc
        })
    }

    _onKiKetThucChange(e) {
        let khoaKhoaHoc = this.state.khoaKhoaHoc;
        khoaKhoaHoc.kiKetThuc.id = e.target.value;
        this.setState({
            khoaKhoaHoc: khoaKhoaHoc
        })
    }

    _onKiPhanNganhChange(e) {
        let khoaKhoaHoc = this.state.khoaKhoaHoc;
        khoaKhoaHoc.kiPhanNganh.id = e.target.value;
        this.setState({
            khoaKhoaHoc: khoaKhoaHoc
        })
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            khoaKhoaHoc: nextProps.khoaKhoaHoc,
            khoas: nextProps.khoas,
            khoaHocs: nextProps.khoaHocs,
            termYears: nextProps.termYears,
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._editKhoaKhoaHoc(this.state.khoaKhoaHoc);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onChangeYear(e) {
        let term = this.state.term;
        term.nam = e.target.value;
        this.setState({
            term: term
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin khoa - khóa học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="">
                            <div className="edit-title">Khoa</div>
                            <select className="input-medium margin-left-20" value={this.state.khoaKhoaHoc.khoa.id}
                                    onChange={this._onKhoaChange}>
                                {this.state.khoas.map(khoa => <option key={khoa.id}
                                                                      value={khoa.id}>{khoa.ten}</option>)}
                            </select>
                        </div>
                        <div className="">
                            <div className="edit-title">Khóa học</div>
                            <select className="input-mini margin-left-20" value={this.state.khoaKhoaHoc.tkb_khoaHoc.id}
                                    onChange={this._onKhoaHocChange}>
                                {this.state.khoaHocs.map(khoaHoc => <option key={khoaHoc.id}
                                                                            value={khoaHoc.id}>{khoaHoc.nam}</option>)}
                            </select>
                        </div>
                        <div className="">
                            <div className="edit-title">Kì bắt đầu</div>
                            <select className="input-medium margin-left-20" value={this.state.khoaKhoaHoc.kiBatDau.id}
                                    onChange={this._onKiBatDauChange}>
                                {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                    {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                            </select>
                        </div>
                        <div className="">
                            <div className="edit-title">Kì kết thúc</div>
                            <select className="input-medium margin-left-20" value={this.state.khoaKhoaHoc.kiKetThuc.id}
                                    onChange={this._onKiKetThucChange}>
                                {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                    {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                            </select>
                        </div>
                        <div className="">
                            <div className="edit-title">Kì phân ngành</div>
                            <select className="input-medium margin-left-20"
                                    value={this.state.khoaKhoaHoc.kiPhanNganh.id}
                                    onChange={this._onKiPhanNganhChange}>
                                {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                    {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                            </select>
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

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditKhoaKhoaHoc