/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_EditSinhVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khoas: [],
            khoaId: 0,
            khoaHocs: [],
            khoaHocId: 0,
            errorMess1: "",
            lops: [],
            sinhVien: {
                id: 0,
                maSinhVien: "",
                hoDem: "",
                ten: "",
                lopHoc: {
                    id: 0,
                    ma: "",
                    ten: ""
                }
            }
        }

        this._handleSubmit = this._handleSubmit.bind(this);

        this._onMaSinhVienChange = this._onMaSinhVienChange.bind(this);
        this._onHoDemChange = this._onHoDemChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onKhoaChange = this._onKhoaChange.bind(this);
        this._onKhoaHocChange = this._onKhoaHocChange.bind(this);
        this._onLopChange = this._onLopChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        const khoas = nextProps.khoas;
        const khoaHocs = nextProps.khoaHocs;
        API.getAllLopHocByKhoaAndKhoaHoc(khoas[0].id, khoaHocs[0].id, (lops) => {
            this.setState({
                khoas: nextProps.khoas,
                khoaId: khoas[0].id,
                khoaHocs: nextProps.khoaHocs,
                khoaHocId: khoaHocs[0].id,
                sinhVien: nextProps.sinhVien,
                lops: lops
            })
        }, (error) => {
            console.log(error);
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
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
            this.props._onEditSinhVien(this.state.sinhVien);

            var modal = $("#myModal")[0];
            modal.style.display = "none";
        }
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
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin sinh viên</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <div className="edit-title">Mã sinh viên</div>
                            <input className="input-small margin-left-20" value={this.state.sinhVien.maSinhVien}
                                   onChange={this._onMaSinhVienChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <div className="edit-title">Họ đệm</div>
                            <input className="input-small margin-left-20" value={this.state.sinhVien.hoDem}
                                   onChange={this._onHoDemChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <div className="edit-title">Tên</div>
                            <input className="input-small margin-left-20" value={this.state.sinhVien.ten}
                                   onChange={this._onTenChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <div className="edit-title">
                                Khoa
                            </div>
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
                        <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>
            h

        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditSinhVien