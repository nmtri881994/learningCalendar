/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditLopMonHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lopMonHoc: {
                id: 0,
                dmMonHoc: {
                    id: 0,
                    maMonHoc: "",
                    ten: ""
                },
                dmNhanVien: {
                    id: 0,
                    maNhanVien: "",
                    hoDem: "",
                    ten: ""
                },
                tkb_kiHoc_namHoc: {
                    id: 0,
                    kiHoc: {
                        id: 0,
                        ten: ""
                    },
                    namHoc: {
                        id: 0,
                        name: ""
                    }
                },
                tkb_khoa_khoaHoc: {
                    id: 0,
                    khoa: {
                        id: 0,
                        ten: ""
                    },
                    tkb_khoaHoc: {
                        id: 0,
                        nam: 0
                    }
                },
                dmNganh: {
                    id: 0,
                    ten: ""
                },
                soTietLyThuyet: 0,
                soTietThucHanh: 0,
                soLuongToiDa: 0,
                gioiHanTuanBatDau: 0,
                gioiHanTuanKetThuc: 0,
                tkb_khoa_khoaHoc_nganh_nhom: {
                    id: 0
                }
            },
            monHocs: [],
            nhanViens: [],
            tuans: [],
            tuanKetThucs: [],
            groups: []
        }

        this._handleSubmit = this._handleSubmit.bind(this);

        this._onMonHocChange = this._onMonHocChange.bind(this);
        this._onGiangVienChange = this._onGiangVienChange.bind(this);
        this._onSoTietLyThuyetChange = this._onSoTietLyThuyetChange.bind(this);
        this._onSoTietThucHanhChange = this._onSoTietThucHanhChange.bind(this);
        this._onSoLuongToiDaChange = this._onSoLuongToiDaChange.bind(this);
        this._onGioiHanTuanBatDauChange = this._onGioiHanTuanBatDauChange.bind(this);
        this._onGioiHanTuanKetThucChange = this._onGioiHanTuanKetThucChange.bind(this);
        this._onTuanBatDauChange = this._onTuanBatDauChange.bind(this);
        this._onTuanKetThucChange = this._onTuanKetThucChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        const tuans = nextProps.tuans;
        const tuanBatDau = nextProps.lopMonHoc.gioiHanTuanBatDau;
        const tuanCuoiCung = tuans[tuans.length - 1];
        let tuanKetThucs = [];
        for (let i = tuanBatDau; i <= tuanCuoiCung; i++) {
            tuanKetThucs.push(i);
        }
        this.setState({
            lopMonHoc: nextProps.lopMonHoc,
            monHocs: nextProps.monHocs,
            nhanViens: nextProps.nhanViens,
            tuans: tuans,
            tuanKetThucs: tuanKetThucs,
            groups: nextProps.groups
        })
    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        let lopMonHoc = this.state.lopMonHoc;
        if (lopMonHoc.dmNganh == null) {
            lopMonHoc.dmNganh = {
                id: 0
            }
        }
        this.props._onEditLopMonHoc(this.state.lopMonHoc);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onMonHocChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.dmMonHoc.id = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGiangVienChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.dmNhanVien.id = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoTietLyThuyetChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soTietLyThuyet = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoTietThucHanhChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soTietThucHanh = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoLuongToiDaChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soLuongToiDa = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGioiHanTuanBatDauChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanBatDau = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGioiHanTuanKetThucChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanKetThuc = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onTuanBatDauChange(e) {
        const tuanBatDau = e.target.value;
        let lopMonHoc = this.state.lopMonHoc;
        let tuanKetThucs = [];
        const tuanCuoiCung = this.state.tuans[this.state.tuans.length - 1];
        for (let i = tuanBatDau; i <= tuanCuoiCung; i++) {
            tuanKetThucs.push(i);
        }
        lopMonHoc.gioiHanTuanBatDau = tuanBatDau;
        lopMonHoc.gioiHanTuanKetThuc = tuanBatDau;
        this.setState({
            lopMonHoc: lopMonHoc,
            tuanKetThucs: tuanKetThucs
        })
    }

    _onTuanKetThucChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanKetThuc = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onChooseGroup(group) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.tkb_khoa_khoaHoc_nganh_nhom = group;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin lớp môn học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="margin-left-20">
                            {this.state.groups.map(group => <div key={group.id}
                                                                 className={group.id == this.state.lopMonHoc.tkb_khoa_khoaHoc_nganh_nhom.id ? "chosenGroup" : "group"}
                                                                 onClick={()=>{this._onChooseGroup(group)}}
                            >
                                Nhóm {group.nhom}
                            </div>)}
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Môn học
                    </span>
                            <select className="input-append" onChange={this._onMonHocChange}
                                    value={this.state.lopMonHoc.dmMonHoc.id}>
                                {this.state.monHocs.map(monHoc => <option key={monHoc.id}
                                                                          value={monHoc.id}>{monHoc.maMonHoc + " " + monHoc.ten}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Giảng viên
                    </span>
                            <select className="input-append" onChange={this._onGiangVienChange}
                                    value={this.state.lopMonHoc.dmNhanVien.id}>
                                {this.state.nhanViens.map(nhanVien => <option key={nhanVien.id}
                                                                              value={nhanVien.id}>{nhanVien.maNhanVien + " " + nhanVien.hoDem + " " + nhanVien.ten}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Số tiết lý thuyết</span>
                            <input className="input-small margin-left-20" value={this.state.lopMonHoc.soTietLyThuyet}
                                   type="number" onChange={this._onSoTietLyThuyetChange}/>
                        </div>

                        <div className="choose-condition-item">
                            <span className="edit-title">Số tiết thực hành</span>
                            <input className="input-small margin-left-20" value={this.state.lopMonHoc.soTietThucHanh}
                                   type="number" onChange={this._onSoTietThucHanhChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Số lượng tối đa</span>
                            <input className="input-small margin-left-20" value={this.state.lopMonHoc.soLuongToiDa}
                                   type="number" onChange={this._onSoLuongToiDaChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Giới hạn tuần bắt đầu</span>
                            <select className="input-append" onChange={this._onTuanBatDauChange}
                                    value={this.state.lopMonHoc.gioiHanTuanBatDau}>
                                {this.state.tuans.map(tuan => <option key={tuan}
                                                                      value={tuan}>{"Tuần " + tuan}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Giới hạn tuần kết thúc</span>
                            <select className="input-append" onChange={this._onTuanKetThucChange}
                                    value={this.state.lopMonHoc.gioiHanTuanKetThuc}>
                                {this.state.tuanKetThucs.map(tuan => <option key={tuan}
                                                                             value={tuan}>{"Tuần " + tuan}</option>)}
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

export default TSMD_EditLopMonHoc