/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllLopHocs from './tsmd_allLopHocs'
import TSMD_EditLopHoc from './tsmd_editLopHoc'

class TSMD_InputLopHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khoaKhoaHocs: [],
            khoaKhoaHocId: 0,
            classCode: "",
            className: "",
            errorMess: "",
            classes: [],
            editingClass: {
                id: 0,
                ma: "",
                ten: "",
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
                }
            }
        }

        this._onClassCodeChange = this._onClassCodeChange.bind(this);
        this._onClassNameChange = this._onClassNameChange.bind(this);
        this._onKhoaKhoaHocChange = this._onKhoaKhoaHocChange.bind(this);
        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteClass = this._onDeleteClass.bind(this);
        this._onEditClass = this._onEditClass.bind(this);
    }

    componentWillMount() {
        API.getAllKhoaKhoaHocs((khoaKhoaHocs) => {
            API.getAllLopHocs((classes) => {
                this.setState({
                    khoaKhoaHocs: khoaKhoaHocs,
                    khoaKhoaHocId: khoaKhoaHocs[0].id,
                    classes: classes
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
        API.insertLopHoc({
            id: 0,
            ma: this.state.classCode,
            ten: this.state.className,
            khoaKhoaHoc: {
                id: this.state.khoaKhoaHocId
            }
        }, (classes) => {
            this.setState({
                classes: classes,
                errorMess: "",
                classCode: "",
                className: ""
            })
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const classes = this.state.classes;
        // console.log(terms);
        let editingClass;
        for (let i = 0; i < classes.length; i++) {
            if (classes[i].id == id) {
                editingClass = classes[i];
                break;
            }
        }
        this.setState({
            editingClass: editingClass
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onClassCodeChange(e) {
        this.setState({
            classCode: e.target.value
        })
    }

    _onClassNameChange(e) {
        this.setState({
            className: e.target.value
        })
    }

    _onKhoaKhoaHocChange(e) {
        this.setState({
            khoaKhoaHocId: e.target.value
        })
    }

    _onDeleteClass(id) {
        API.deleteLopHoc(id, (classes) => {
            if (classes.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa lớp học này"
                })
            } else {
                this.setState({
                    errorMess: "",
                    classes: classes
                })
            }
        }, (error) => {
            console.log(error);
        })
    }

    _onEditClass(cl){
        API.editLopHoc(cl, (classes)=>{
            this.setState({
                errorMess: "",
                classes: classes
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin lớp học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã lớp</span>
                        <input className="input-small margin-left-20" value={this.state.classCode}
                               onChange={this._onClassCodeChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên lớp</span>
                        <input className="input-small margin-left-20" value={this.state.className}
                               onChange={this._onClassNameChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa - Khóa học
                        </span>
                        <select className="input-large margin-left-20" value={this.state.khoaKhoaHocId}
                                onChange={this._onKhoaKhoaHocChange}>
                            {this.state.khoaKhoaHocs.map(khoaKhoaHoc => <option key={khoaKhoaHoc.id}
                                                                                value={khoaKhoaHoc.id}>{khoaKhoaHoc.khoa.ten + ' ' + khoaKhoaHoc.tkb_khoaHoc.nam}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách lớp học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllLopHocs _onDeleteClass={this._onDeleteClass} _triggerModal={this._triggerModal}
                                         classes={this.state.classes}/>
                    </div>
                    <TSMD_EditLopHoc _onEditClass={this._onEditClass}  class={this.state.editingClass} khoaKhoaHocs={this.state.khoaKhoaHocs} term={this.state.editingTerm}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputLopHoc