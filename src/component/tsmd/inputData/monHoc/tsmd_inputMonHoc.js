/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllMonHocs from './tsmd_allMonHocs'
import TSMD_EditMonHoc from './tsmd_editMonHoc'

class TSMD_InputMonHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monHoc:{
                id: 0,
                maMonHoc: "",
                ten: "",
                soTinChi: 0.0
            },
            errorMess1: "",
            errorMess: "",
            monHocs: [],
            editingMonHoc:{
                id: 0,
                maMonHoc: "",
                ten: "",
                soTinChi: 0.0
            },
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteMonHoc = this._onDeleteMonHoc.bind(this);
        this._onEditMonHoc = this._onEditMonHoc.bind(this);

        this._onMaMonHocChange = this._onMaMonHocChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onSoTinChiChange = this._onSoTinChiChange.bind(this);
    }

    componentWillMount() {
        API.getAllMonHocs((monHocs)=>{
            this.setState({
                monHocs: monHocs
            })
        }, (error)=>{
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        console.log(this.state.monHoc);
        API.insertMonHoc(this.state.monHoc, (monHocs)=>{
            let monHoc = this.state.monHoc;
            monHoc.maMonHoc = "";
            monHoc.ten = "";
            monHoc.soTinChi = 0.0
            this.setState({
                monHocs: monHocs,
                monHoc: monHoc
            })
        }, (error)=>{
            console.log(error);
        })
    }


    _triggerModal(id) {
        const monHocs = this.state.monHocs;
        // console.log(terms);
        let editingMonHoc;
        for (let i = 0; i < monHocs.length; i++) {
            if (monHocs[i].id == id) {
                editingMonHoc = monHocs[i];
                break;
            }
        }
        this.setState({
            editingMonHoc: editingMonHoc
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onDeleteMonHoc(id){
        API.deleteMonHoc(id, (monHocs)=>{
            if(monHocs.status == 422){
                this.setState({
                    errorMess1: "Không thể xóa môn học này"
                })
            }else{
                this.setState({
                    errorMess1: "",
                    monHocs: monHocs
                })
            }
        }, (error)=>{
            console.log(error);
        })
    }

    _onEditMonHoc(monHoc){
        API.editMonHoc(monHoc, (monHocs)=>{
            this.setState({
                errorMess1: "",
                monHocs: monHocs
            })
        }, (error)=>{
            console.log(error);
        })
    }

    _onMaMonHocChange(e){
        let monHoc = this.state.monHoc;
        monHoc.maMonHoc = e.target.value;
        this.setState({
            monHoc: monHoc
        })
    }

    _onTenChange(e){
        let monHoc = this.state.monHoc;
        monHoc.ten = e.target.value;
        this.setState({
            monHoc: monHoc
        })
    }

    _onSoTinChiChange(e){
        let monHoc = this.state.monHoc;
        monHoc.soTinChi = e.target.value;
        this.setState({
            monHoc: monHoc
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin môn học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã môn học</span>
                        <input className="input-small margin-left-20" value={this.state.monHoc.maMonHoc}
                               onChange={this._onMaMonHocChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên môn học</span>
                        <input className="input-small margin-left-20" value={this.state.monHoc.ten}
                               onChange={this._onTenChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Số tín chỉ</span>
                        <input className="input-small margin-left-20" type="number" value={this.state.monHoc.soTinChi}
                               onChange={this._onSoTinChiChange}/>
                    </div>

                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách môn học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllMonHocs _onDeleteMonHoc={this._onDeleteMonHoc}  _triggerModal={this._triggerModal}
                                          monHocs={this.state.monHocs}/>
                    </div>
                    <TSMD_EditMonHoc _onEditMonHoc={this._onEditMonHoc} editingMonHoc={this.state.editingMonHoc}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputMonHoc