/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllSinhViens from './tsmd_allSinhViens'
import TSMD_EditSinhVien from './tsmd_editSinhVien'
import TSMD_ChonNganhChoSinhVien from './tsmd_chonNganhChoSinhVien'

class TSMD_InputSinhVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sinhVien: {
                id: 0,
                maSinhVien: "",
                hoDem: "",
                ten: "",
                lopHoc: {
                    id: 0
                }
            },
            khoas: [],
            khoaId: 0,
            khoaHocs: [],
            khoaHocId: 0,
            lops: [],
            errorMess1: "",
            errorMess: "",
            sinhViens: [],
            editingSinhVien: {
                id: 0,
                maSinhVien: "",
                hoDem: "",
                ten: "",
                lopHoc: {
                    id: 0,
                    ma: "",
                    ten: ""
                }
            },
            editingSinhVienId: 0
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteSinhVien = this._onDeleteSinhVien.bind(this);
        this._onEditSinhVien = this._onEditSinhVien.bind(this);
        this._onChonNganh = this._onChonNganh.bind(this);
        this._triggerModal2 = this._triggerModal2.bind(this);
        this._onBoNganhSinhVien = this._onBoNganhSinhVien.bind(this);

        this._onMaSinhVienChange = this._onMaSinhVienChange.bind(this);
        this._onHoDemChange = this._onHoDemChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onKhoaChange = this._onKhoaChange.bind(this);
        this._onKhoaHocChange = this._onKhoaHocChange.bind(this);
        this._onLopChange = this._onLopChange.bind(this);
    }

    componentWillMount() {
        API.getAllFaculties((khoas) => {
            API.getAllTerms((khoaHocs) => {
                API.getAllLopHocByKhoaAndKhoaHoc(khoaHocs[0].id, khoaHocs[0].id, (lops) => {
                    API.getAllSinhViens((sinhViens) => {
                        let sinhVien = this.state.sinhVien;
                        sinhVien.lopHoc.id = lops.length == 0 ? 0 : lops[0].id;
                        this.setState({
                            khoas: khoas,
                            khoaId: khoas[0].id,
                            khoaHocs: khoaHocs,
                            khoaHocId: khoaHocs[0].id,
                            lops: lops,
                            sinhVien: sinhVien,
                            sinhViens: sinhViens
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
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        if (this.state.sinhVien.maSinhVien == "") {
            this.setState({
                errorMess1: "Chưa điền mã sinh viên"
            })
        } else if (this.state.sinhVien.lopHoc.id == 0) {
            this.setState({
                errorMess1: "Chưa chọn lớp"
            })
        } else {
            API.insertSinhVien(this.state.sinhVien, (sinhViens) => {
                this.setState({
                    sinhViens: sinhViens,
                    errorMess1: ""
                })
            }, (error) => {
                console.log(error);
            })
        }
    }


    _triggerModal(id) {
        const sinhViens = this.state.sinhViens;
        // console.log(terms);
        let editingSinhVien;
        for (let i = 0; i < sinhViens.length; i++) {
            if (sinhViens[i].id == id) {
                editingSinhVien = sinhViens[i];
                break;
            }
        }
        this.setState({
            editingSinhVien: editingSinhVien
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _triggerModal2(id){
        this.setState({
            editingSinhVienId: id
        })
        var modal = $("#myModal1");
        modal[0].style.display = "block";
    }

    _onDeleteSinhVien(id) {
        API.deleteSinhVien(id, (sinhViens) => {
            if (sinhViens.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa sinh viên này"
                })
            } else {
                this.setState({
                    errorMess: "",
                    sinhViens: sinhViens
                })
            }
        }, (error) => {
            console.log(error);
        })
    }

    _onEditSinhVien(sinhVien) {
        API.editSinhVien(sinhVien, (sinhViens) => {
            this.setState({
                sinhViens: sinhViens,
                errorMess: ""
            })
        }, (error) => {
            if (error.response.status == 409) {
                this.setState({
                    errorMess: "Mã sinh viên vừa edit bị trùng"
                })
            }
            console.log(error);
        })
    }

    _onChonNganh(sinhVienId, nganhId) {
        API.editSinhVienNganh(sinhVienId, nganhId, (sinhViens) => {
            this.setState({
                sinhViens: sinhViens
            })
        }, (error) => {
            console.log(error);
        })
    }

    _onBoNganhSinhVien(sinhVienId){
        API.deleteSinhVienNganh(sinhVienId, (sinhViens)=>{
            this.setState({
                sinhViens: sinhViens
            })
        }, (error) => {
            console.log(error);
        })
    }

    _onMaSinhVienChange(e) {
        let sinhVien = this.state.sinhVien;
        sinhVien.maSinhVien = e.target.value;
        this.setState({
            sinhVien: sinhVien
        })
    }

    _onHoDemChange(e) {
        let sinhVien = this.state.sinhVien;
        sinhVien.hoDem = e.target.value;
        this.setState({
            sinhVien: sinhVien
        })
    }

    _onTenChange(e) {
        let sinhVien = this.state.sinhVien;
        sinhVien.ten = e.target.value;
        this.setState({
            sinhVien: sinhVien
        })
    }

    _onLopChange(e) {
        let sinhVien = this.state.sinhVien;
        sinhVien.lopHoc.id = e.target.value;
        this.setState({
            sinhVien: sinhVien
        })
    }

    _onKhoaChange(e) {
        const khoaId = e.target.value;
        API.getAllLopHocByKhoaAndKhoaHoc(khoaId, this.state.khoaHocId, (lops) => {
            let sinhVien = this.state.sinhVien;
            sinhVien.lopHoc.id = lops.length == 0 ? 0 : lops[0].id;
            this.setState({
                khoaId: khoaId,
                lops: lops,
                sinhVien: sinhVien
            });

        }, (error) => {
            console.log(error);
        })
    }

    _onKhoaHocChange(e) {
        const khoaHocId = e.target.value;
        API.getAllLopHocByKhoaAndKhoaHoc(this.state.khoaId, khoaHocId, (lops) => {
            let sinhVien = this.state.sinhVien;
            sinhVien.lopHoc.id = lops.length == 0 ? 0 : lops[0].id;
            this.setState({
                khoaHocId: khoaHocId,
                lops: lops,
                sinhVien: sinhVien
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin sinh viên</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã sinh viên</span>
                        <input className="input-small margin-left-20" value={this.state.sinhVien.maSinhVien}
                               onChange={this._onMaSinhVienChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Họ đệm</span>
                        <input className="input-small margin-left-20" value={this.state.sinhVien.hoDem}
                               onChange={this._onHoDemChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên</span>
                        <input className="input-small margin-left-20" value={this.state.sinhVien.ten}
                               onChange={this._onTenChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa
                        </span>
                        <select className="input-append margin-left-20" value={this.state.khoaId}
                                onChange={this._onKhoaChange}>
                            {this.state.khoas.map(khoa => <option key={khoa.id}
                                                                  value={khoa.id}>{khoa.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Khóa học
                        </span>
                        <select className="input-append margin-left-20" value={this.state.khoaHocId}
                                onChange={this._onKhoaHocChange}>
                            {this.state.khoaHocs.map(khoaHoc => <option key={khoaHoc.id}
                                                                        value={khoaHoc.id}>{khoaHoc.nam}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Lớp
                        </span>
                        <select className="input-append margin-left-20" value={this.state.sinhVien.lopHoc.id}
                                onChange={this._onLopChange}>
                            {this.state.lops.map(lop => <option key={lop.id}
                                                                value={lop.id}>{lop.ma}</option>)}
                        </select>
                    </div>

                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách sinh viên</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllSinhViens _onDeleteSinhVien={this._onDeleteSinhVien} _onBoNganhSinhVien={this._onBoNganhSinhVien}
                                           _triggerModal2={this._triggerModal2} _triggerModal={this._triggerModal} sinhViens={this.state.sinhViens}/>
                    </div>
                    <TSMD_EditSinhVien _onEditSinhVien={this._onEditSinhVien} sinhVien={this.state.editingSinhVien}
                                       khoas={this.state.khoas} khoaHocs={this.state.khoaHocs}/>
                    <TSMD_ChonNganhChoSinhVien editingSinhVienId={this.state.editingSinhVienId} _onChonNganh={this._onChonNganh} />
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export
default
TSMD_InputSinhVien