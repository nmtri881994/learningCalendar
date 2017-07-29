/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllNhanViens from './tsmd_allNhanViens'
import TSMD_EditNhanVien from './tsmd_editNhanVien'

class TSMD_InputNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maNhanVien: "",
            hoDem: "",
            ten: "",
            donVis:[],
            donViId: 0,
            nhanViens: [],
            errorMess1: "",
            errorMess: "",
            editingNhanVien:{
                id: 0,
                maNhanVien: "",
                hoDem: "",
                ten: "",
                dmDonVi:{
                    id: 0,
                    ma: "",
                    ten: ""
                }
            }
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._onDeleteNhanVien = this._onDeleteNhanVien.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onEditNhanVien = this._onEditNhanVien.bind(this);

        this._onMaNhanVienChange = this._onMaNhanVienChange.bind(this);
        this._onHoDemChange = this._onHoDemChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onDonViChange = this._onDonViChange.bind(this);
    }

    componentWillMount() {
        API.getAllFaculties((donVis)=>{
            API.getAllNhanViens((nhanViens)=>{
                this.setState({
                    donVis: donVis,
                    donViId: donVis[0].id,
                    nhanViens: nhanViens
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
        if(this.state.maNhanVien == ""){
            this.setState({
                errorMess1: "Chưa điền mã nhân viên"
            })
        }else{
            API.insertNhanVien({
                id: 0,
                maNhanVien: this.state.maNhanVien,
                hoDem: this.state.hoDem,
                ten: this.state.ten,
                dmDonVi:{
                    id: this.state.donViId,
                    ma: "",
                    ten: ""
                }
            }, (nhanViens) => {
                this.setState({
                    nhanViens: nhanViens,
                    maNhanVien: "",
                    hoDem: "",
                    ten: "",
                    errorMess1: ""
                })
            }, (error) => {
                if(error.response.status == 409){
                    this.setState({
                        errorMess1: "Mã nhân viên đã tồn tại trong hệ thống"
                    })
                }
                console.log(error);
            })
        }

    }

    _onDeleteNhanVien(id){
        API.deleteNhanVien(id, (nhanViens)=>{
            if(nhanViens.status == 422){
                this.setState({
                    errorMess: "Không thể xóa nhân viên này"
                })
            }else{
                this.setState({
                    nhanViens: nhanViens,
                    errorMess: ""
                })
            }

        }, (error)=>{
            console.log(error);
        })
    }

    _onEditNhanVien(nhanVien){
        API.editNhanVien(nhanVien, (nhanViens)=>{
            this.setState({
                errorMess: "",
                nhanViens: nhanViens
            })
        }, (error)=>{
            if(error.response.status == 409){
                this.setState({
                    errorMess: "Mã nhân viên vừa edit đã tồn tại trong hệ thống"
                })
            }
            console.log(error);
        })
    }

    _triggerModal(id) {
        const nhanViens = this.state.nhanViens;
        // console.log(terms);
        let editingNhanVien;
        for (let i = 0; i < nhanViens.length; i++) {
            if (nhanViens[i].id == id) {
                editingNhanVien = nhanViens[i];
                break;
            }
        }
        this.setState({
            editingNhanVien: editingNhanVien
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onMaNhanVienChange(e){
        this.setState({
            maNhanVien: e.target.value
        })
    }

    _onHoDemChange(e){
        this.setState({
            hoDem: e.target.value
        })
    }

    _onTenChange(e){
        this.setState({
            ten: e.target.value
        })
    }

    _onDonViChange(e){
        this.setState({
            donViId: e.target.value
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin nhân viên</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã nhân viên</span>
                        <input className="input-small margin-left-20" value={this.state.maNhanVien}
                               onChange={this._onMaNhanVienChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Họ đệm</span>
                        <input className="input-small margin-left-20" value={this.state.hoDem}
                               onChange={this._onHoDemChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên</span>
                        <input className="input-small margin-left-20" value={this.state.ten}
                               onChange={this._onTenChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa
                        </span>
                        <select className="input-large margin-left-20" value={this.state.donViId}
                                onChange={this._onDonViChange}>
                            {this.state.donVis.map(donVi => <option key={donVi.id}
                                                                                value={donVi.id}>{donVi.ten}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách nhân viên</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllNhanViens _onDeleteNhanVien={this._onDeleteNhanVien} _triggerModal={this._triggerModal}
                                         nhanViens={this.state.nhanViens}/>
                    </div>
                    <TSMD_EditNhanVien _onEditNhanVien={this._onEditNhanVien} nhanVien={this.state.editingNhanVien} donVis={this.state.donVis}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputNhanVien