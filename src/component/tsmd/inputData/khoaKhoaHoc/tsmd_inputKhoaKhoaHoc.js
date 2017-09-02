/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllKhoaKhoaHocs from './tsmd_allKhoaKhoaHocs'
import TSMD_EditKhoaKhoaHoc from './tsmd_editKhoaKhoaHoc'
import TSMD_KhoaKhoaHocAddGroup from './tsmd_khoaKhoaHocAddGroup'

class TSMD_InputKhoaKhoaHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khoas: [],
            khoaId: 0,
            khoaHocs: [],
            khoaHocId: 0,
            termYears: [],
            kiPhanNganhId: 0,
            kiBatDauId: 0,
            kiKetThucId: 0,
            errorMess: "",
            khoaKhoaHocs: [],
            editingKhoaKhoaHoc: {
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
            addingGroupKhoaKhoaHocId: 0
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._deleteKhoaKhoaHoc = this._deleteKhoaKhoaHoc.bind(this);
        this._editKhoaKhoaHoc = this._editKhoaKhoaHoc.bind(this);

        this._onKhoaChange = this._onKhoaChange.bind(this);
        this._onKhoaHocChange = this._onKhoaHocChange.bind(this);
        this._onKiBatDauChange = this._onKiBatDauChange.bind(this);
        this._onKiKetThucChange = this._onKiKetThucChange.bind(this);
        this._onKiPhanNganhChange = this._onKiPhanNganhChange.bind(this);
        this._onReload = this._onReload.bind(this);
        this._chooseAddingGroupKhoaKhoaHoc = this._chooseAddingGroupKhoaKhoaHoc.bind(this);
    }

    componentWillMount() {
        API.getAllFaculties((khoas) => {
            API.getAllTerms((khoaHocs) => {
                API.getAllTermYears((termYears) => {
                    API.getAllKhoaKhoaHocs((khoaKhoaHocs) => {
                        this.setState({
                            khoas: khoas,
                            khoaId: khoas[0].id,
                            khoaHocs: khoaHocs,
                            khoaHocId: khoaHocs[0].id,
                            termYears: termYears,
                            kiBatDauId: termYears[0].id,
                            kiKetThucId: termYears[0].id,
                            kiPhanNganhId: termYears[0].id,
                            khoaKhoaHocs: khoaKhoaHocs,

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

    _chooseAddingGroupKhoaKhoaHoc(khoaKhoaHocId) {
        this.setState({
            addingGroupKhoaKhoaHocId: khoaKhoaHocId
        })
        var modal = $("#myModal1");
        modal[0].style.display = "block";
    }

    _onReload() {
        API.getAllFaculties((khoas) => {
            API.getAllTerms((khoaHocs) => {
                API.getAllTermYears((termYears) => {
                    API.getAllKhoaKhoaHocs((khoaKhoaHocs) => {
                        this.setState({
                            khoas: khoas,
                            khoaId: khoas[0].id,
                            khoaHocs: khoaHocs,
                            khoaHocId: khoaHocs[0].id,
                            termYears: termYears,
                            kiBatDauId: termYears[0].id,
                            kiKetThucId: termYears[0].id,
                            kiPhanNganhId: termYears[0].id,
                            khoaKhoaHocs: khoaKhoaHocs,

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

    _onKhoaChange(e) {
        this.setState({
            khoaId: e.target.value
        })
    }

    _onKhoaHocChange(e) {
        this.setState({
            khoaHocId: e.target.value
        })
    }

    _onKiBatDauChange(e) {
        this.setState({
            kiBatDauId: e.target.value
        })
    }

    _onKiKetThucChange(e) {
        this.setState({
            kiKetThucId: e.target.value
        })
    }

    _onKiPhanNganhChange(e) {
        this.setState({
            kiPhanNganhId: e.target.value
        })
    }

    _handleSubmit() {
        API.insertKhoaKhoaHoc({
            khoa: {
                id: this.state.khoaId,
            },
            tkb_khoaHoc: {
                id: this.state.khoaHocId,
            },
            kiPhanNganh: {
                id: this.state.kiPhanNganhId,
            },
            kiBatDau: {
                id: this.state.kiBatDauId,
            },
            kiKetThuc: {
                id: this.state.kiKetThucId,
            }
        }, (khoaKhoaHocs) => {
            console.log(khoaKhoaHocs);
            this.setState({
                errorMess: "",
                khoaKhoaHocs: khoaKhoaHocs
            })
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const khoaKhoaHocs = this.state.khoaKhoaHocs;
        let editingKhoaKhoaHoc;
        for (let i = 0; i < khoaKhoaHocs.length; i++) {
            if (khoaKhoaHocs[i].id == id) {
                editingKhoaKhoaHoc = khoaKhoaHocs[i];
                break;
            }
        }

        this.setState({
            editingKhoaKhoaHoc: editingKhoaKhoaHoc
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _deleteKhoaKhoaHoc(id) {
        API.deleteKhoaKhoaHoc(id, (khoaKhoaHocs) => {
            if (khoaKhoaHocs.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa khoa - khóa học này"
                })
            } else {
                this.setState({
                    errorMess: "",
                    khoaKhoaHocs: khoaKhoaHocs
                })
            }

        }, (error) => {
            console.log(error);
        })
    }

    _editKhoaKhoaHoc(khoaKhoaHoc) {
        API.editKhoaKhoaHoc(khoaKhoaHoc, (khoaKhoaHocs) => {
            this.setState({
                khoaKhoaHocs: khoaKhoaHocs,
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
                    <div className="section-title margin-left-20">Nhập thông tin khoa - khóa học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Khoa</span>
                        <select className="input-medium margin-left-20" value={this.state.khoaId}
                                onChange={this._onKhoaChange}>
                            {this.state.khoas.map(khoa => <option key={khoa.id} value={khoa.id}>{khoa.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Khóa học</span>
                        <select className="input-mini margin-left-20" value={this.state.khoaHocId}
                                onChange={this._onKhoaHocChange}>
                            {this.state.khoaHocs.map(khoaHoc => <option key={khoaHoc.id}
                                                                        value={khoaHoc.id}>{khoaHoc.nam}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Kì bắt đầu</span>
                        <select className="input-medium margin-left-20" value={this.state.kiBatDauId}
                                onChange={this._onKiBatDauChange}>
                            {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Kì kết thúc</span>
                        <select className="input-medium margin-left-20" value={this.state.kiKetThucId}
                                onChange={this._onKiKetThucChange}>
                            {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Kì phân ngành</span>
                        <select className="input-medium margin-left-20" value={this.state.kiPhanNganhId}
                                onChange={this._onKiPhanNganhChange}>
                            {this.state.termYears.map(termYear => <option key={termYear.id} value={termYear.id}>
                                {termYear.namHoc.name + ' ' + termYear.kiHoc.ten}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách khoa - khóa học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllKhoaKhoaHocs _deleteKhoaKhoaHoc={this._deleteKhoaKhoaHoc}
                                              _triggerModal={this._triggerModal}
                                              khoaKhoaHocs={this.state.khoaKhoaHocs}
                                              _chooseAddingGroupKhoaKhoaHoc={this._chooseAddingGroupKhoaKhoaHoc}
                        />
                    </div>
                    <TSMD_EditKhoaKhoaHoc _editKhoaKhoaHoc={this._editKhoaKhoaHoc}
                                          khoaKhoaHoc={this.state.editingKhoaKhoaHoc} khoas={this.state.khoas}
                                          khoaHocs={this.state.khoaHocs} termYears={this.state.termYears}/>

                    <TSMD_KhoaKhoaHocAddGroup
                        addingGroupKhoaKhoaHocId={this.state.addingGroupKhoaKhoaHocId}
                        _onReload={this._onReload}
                    />
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputKhoaKhoaHoc