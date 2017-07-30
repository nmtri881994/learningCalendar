/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllNhanVienVaiTros from './tsmd_allNhanVienVaiTros'

class TSMD_InputNhanVienVaiTro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMess1: "",
            errorMess: "",
            taiKhoans: [],
            vaiTros: [],
            nhanVienVaiTros: [],
            taiKhoanVaiTro: {
                id: 0,
                taiKhoan: {
                    id: 0
                },
                vaiTro: {
                    id: 0
                }
            },
            editingTaiKhoanVaiTro: {
                id: 0,
                taiKhoan: {
                    id: 0,
                    tenDangNhap: "",
                    hoVaTen: ""
                },
                vaiTro: {
                    id: 0,
                    tenVaiTro: ""
                }
            }
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteNhanVienVaiTro = this._onDeleteNhanVienVaiTro.bind(this);

        this._onTaiKhoanChange = this._onTaiKhoanChange.bind(this);
        this._onVaiTroChange = this._onVaiTroChange.bind(this);

    }

    componentWillMount() {
        API.getAllTaiKhoanNhanViens((taiKhoans) => {
            API.getAllVaiTros((vaiTros) => {
                API.getAllNhanVienVaiTros((nhanVienVaiTros) => {
                    let taiKhoanVaiTro = this.state.taiKhoanVaiTro;
                    taiKhoanVaiTro.taiKhoan.id = taiKhoans[0].id;
                    taiKhoanVaiTro.vaiTro.id = vaiTros[0].id;
                    this.setState({
                        taiKhoans: taiKhoans,
                        vaiTros: vaiTros,
                        nhanVienVaiTros: nhanVienVaiTros,
                        taiKhoanVaiTro: taiKhoanVaiTro
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
        API.insertNhanVienVaiTro(this.state.taiKhoanVaiTro, (nhanVienVaiTros)=>{
            this.setState({
                nhanVienVaiTros: nhanVienVaiTros,
                errorMess1: ""
            })
        }, (error)=>{
            if(error.response.status == 409){
                this.setState({
                    errorMess1: "Nhân viên đã có vai trò này rồi"
                })
            }
        })
    }

    _onDeleteNhanVienVaiTro(id){
        API.deleteNhanVienVaiTro(id, (nhanVienVaiTros)=>{
            if(nhanVienVaiTros.status == 422){
                errorMess: "Không thể xóa nhân viên - vai trò này"
            }else{
                this.setState({
                    nhanVienVaiTros: nhanVienVaiTros,
                    errorMess: ""
                })
            }
        }, (error)=>{
            console.log(error);
        })
    }

    _onTaiKhoanChange(e){
        let taiKhoanVaiTro = this.state.taiKhoanVaiTro;
        taiKhoanVaiTro.taiKhoan.id = e.target.value;
        this.setState({
            taiKhoanVaiTro: taiKhoanVaiTro
        })
    }

    _onVaiTroChange(e){
        let taiKhoanVaiTro = this.state.taiKhoanVaiTro;
        taiKhoanVaiTro.vaiTro.id = e.target.value;
        this.setState({
            taiKhoanVaiTro: taiKhoanVaiTro
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin nhân viên - vai trò</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Nhân viên
                        </span>
                        <select className="input-append margin-left-20" value={this.state.taiKhoanVaiTro.taiKhoan.id}
                                onChange={this._onTaiKhoanChange}>
                            {this.state.taiKhoans.map(taiKhoan => <option key={taiKhoan.id}
                                                                          value={taiKhoan.id}>{taiKhoan.tenDangNhap + ' ' + taiKhoan.hoVaTen}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Vai trò
                        </span>
                        <select className="input-large margin-left-20" value={this.state.taiKhoanVaiTro.vaiTro.id}
                                onChange={this._onVaiTroChange}>
                            {this.state.vaiTros.map(vaiTro => <option key={vaiTro.id}
                                                                      value={vaiTro.id}>{vaiTro.tenVaiTro}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách nhân viên - vai trò</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllNhanVienVaiTros _onDeleteNhanVienVaiTro={this._onDeleteNhanVienVaiTro} nhanVienVaiTros={this.state.nhanVienVaiTros}/>
                    </div>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputNhanVienVaiTro