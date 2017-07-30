/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllNganhs from './tsmd_allNganhs'
import TSMD_EditNganh from './tsmd_editNganh'

class TSMD_InputNganh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMess: "",
            errorMess1: "",
            nganhs: [],
            nganh:{
                id: 0,
                ten: ""
            },
            editingNganh:{
                id: 0,
                ten: ""
            }
        }


        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteNganh = this._onDeleteNganh.bind(this);
        this._onEditNganh = this._onEditNganh.bind(this);

        this._onTenNganhChange = this._onTenNganhChange.bind(this);
    }

    componentWillMount() {
        API.getAllNganhs((nganhs)=>{
            this.setState({
                nganhs: nganhs
            })
        }, (error)=>{
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        if(this.state.nganh.ten == ""){
            this.setState({
                error1: "Chưa nhập tên ngành"
            })
        }else{
            API.insertNganh(this.state.nganh, (nganhs)=>{
                let nganh = this.state.nganh;
                nganh.ten = "";
                this.setState({
                    nganhs: nganhs,
                    errorMess1: "",
                    nganh: nganh
                })
            }, (error)=>{
                console.log(error);
            })
        }
    }

    _onTenNganhChange(e){
        let nganh = this.state.nganh;
        nganh.ten = e.target.value;
        this.setState({
            nganh: nganh
        })
    }

    _triggerModal(id) {
        const nganhs = this.state.nganhs;
        let editingNganh;
        for (let i = 0; i < nganhs.length; i++) {
            if (nganhs[i].id == id) {
                editingNganh = nganhs[i];
                break;
            }
        }
        this.setState({
            editingNganh: editingNganh
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onDeleteNganh(id){
        API.deleteNganh(id, (nganhs)=>{
            if(nganhs.status == 422){
                this.setState({
                    errorMess: "Không thể xóa ngành ngày"
                })
            }else{
                this.setState({
                    errorMess: "",
                    nganhs: nganhs
                })
            }
        }, (error)=>{
            console.log(error);
        })
    }

    _onEditNganh(nganh){
        API.editNganh(nganh, (nganhs)=>{
            this.setState({
                nganhs: nganhs,
                errorMess: ""
            })
        }, (error)=>{
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin ngành</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên ngành</span>
                        <input className="input-large margin-left-20" value={this.state.nganh.ten}
                               onChange={this._onTenNganhChange}/>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách ngành</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllNganhs _onDeleteNganh={this._onDeleteNganh}  _triggerModal={this._triggerModal}
                                         nganhs={this.state.nganhs}/>
                    </div>
                    <TSMD_EditNganh _onEditNganh={this._onEditNganh}  nganh={this.state.editingNganh}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputNganh