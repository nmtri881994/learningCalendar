/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllKhoaKhoaHocNganhs from './tsmd_allKhoaKhoaHocNganhs'
import TSMD_KhoaKhoaHocNganhAddGroup from './tsmd_khoaKhoaHocNganhAddGroup'

class TSMD_InputKhoaKhoaHocNganh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMess1: "",
            errorMess: "",
            khoaKhoaHocs: [],
            nganhs: [],
            khoaKhoaHocNganhs: [],
            khoaKhoaHocNganh:{
                id: 0,
                khoaKhoaHoc:{
                    id: 0
                },
                dmNganh:{
                    id: 0
                }
            },
            addingGroupKhoaKhoaHocNganhId: 0
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteKhoaKhoaHocNganh = this._onDeleteKhoaKhoaHocNganh.bind(this);

        this._onKhoaKhoaHocChange = this._onKhoaKhoaHocChange.bind(this);
        this._onNganhChange = this._onNganhChange.bind(this);
        this._onReload = this._onReload.bind(this);
        this._chooseAddingGroupKhoaKhoaHocNganh = this._chooseAddingGroupKhoaKhoaHocNganh.bind(this);
    }

    componentWillMount() {
        API.getAllKhoaKhoaHocs((khoaKhoaHocs)=>{
            API.getAllNganhs((nganhs)=>{
                API.getAllKhoaKhoaHocNganhs((khoaKhoaHocNganhs)=>{
                    let khoaKhoaHocNganh = this.state.khoaKhoaHocNganh;
                    khoaKhoaHocNganh.khoaKhoaHoc.id = khoaKhoaHocs[0].id;
                    khoaKhoaHocNganh.dmNganh.id = nganhs[0].id;
                    this.setState({
                        khoaKhoaHocs: khoaKhoaHocs,
                        nganhs: nganhs,
                        khoaKhoaHocNganhs: khoaKhoaHocNganhs,
                        khoaKhoaHocNganh: khoaKhoaHocNganh
                    })
                }, (error)=>{
                    console.log(error);
                })
            }, (error)=>{
                console.log(error);
            })
        }, (error)=>{
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _chooseAddingGroupKhoaKhoaHocNganh(khoaKhoaHocNganhId) {
        this.setState({
            addingGroupKhoaKhoaHocNganhId: khoaKhoaHocNganhId
        })
        var modal = $("#myModal1");
        modal[0].style.display = "block";
    }

    _onReload() {
        API.getAllKhoaKhoaHocs((khoaKhoaHocs)=>{
            API.getAllNganhs((nganhs)=>{
                API.getAllKhoaKhoaHocNganhs((khoaKhoaHocNganhs)=>{
                    let khoaKhoaHocNganh = this.state.khoaKhoaHocNganh;
                    khoaKhoaHocNganh.khoaKhoaHoc.id = khoaKhoaHocs[0].id;
                    khoaKhoaHocNganh.dmNganh.id = nganhs[0].id;
                    this.setState({
                        khoaKhoaHocs: khoaKhoaHocs,
                        nganhs: nganhs,
                        khoaKhoaHocNganhs: khoaKhoaHocNganhs,
                        khoaKhoaHocNganh: khoaKhoaHocNganh
                    })
                }, (error)=>{
                    console.log(error);
                })
            }, (error)=>{
                console.log(error);
            })
        }, (error)=>{
            console.log(error);
        })
    }

    _handleSubmit() {
        API.insertKhoaKhoaHocNganh(this.state.khoaKhoaHocNganh, (khoaKhoaHocNganhs)=>{
            this.setState({
                errorMess1: "",
                khoaKhoaHocNganhs: khoaKhoaHocNganhs
            })
        }, (error)=>{
            if(error.response.status == 409){
                this.setState({
                    errorMess1: "Khoa - khóa học đã có ngành này"
                })
            }
            console.log(error);
        })
    }

    _onDeleteKhoaKhoaHocNganh(id){
        API.deleteKhoaKhoaHocNganh(id, (khoaKhoaHocNganhs)=>{
            if(khoaKhoaHocNganhs.status == 422){
                this.setState({
                    errorMess: "Không thể xóa khoa - khóa học - ngành ngày"
                })
            }else{
                this.setState({
                    errorMess: "",
                    khoaKhoaHocNganhs: khoaKhoaHocNganhs
                })
            }
        }, (error)=>{
            console.log(error);
        })
    }

    _onKhoaKhoaHocChange(e){
        let khoaKhoaHocNganh = this.state.khoaKhoaHocNganh;
        khoaKhoaHocNganh.khoaKhoaHoc.id = e.target.value;
        this.setState({
            khoaKhoaHocNganh: khoaKhoaHocNganh
        })
    }

    _onNganhChange(e){
        let khoaKhoaHocNganh = this.state.khoaKhoaHocNganh;
        khoaKhoaHocNganh.dmNganh.id = e.target.value;
        this.setState({
            khoaKhoaHocNganh: khoaKhoaHocNganh
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin khoa - khóa học - ngành</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa - khóa học
                        </span>
                        <select className="input-append margin-left-20" value={this.state.khoaKhoaHocNganh.khoaKhoaHoc.id}
                                onChange={this._onKhoaKhoaHocChange}>
                            {this.state.khoaKhoaHocs.map(khoaKhoaHoc => <option key={khoaKhoaHoc.id}
                                                                          value={khoaKhoaHoc.id}>{khoaKhoaHoc.khoa.ten + ' ' + khoaKhoaHoc.tkb_khoaHoc.nam}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Ngành
                        </span>
                        <select className="input-large margin-left-20" value={this.state.khoaKhoaHocNganh.dmNganh.id}
                                onChange={this._onNganhChange}>
                            {this.state.nganhs.map(nganh => <option key={nganh.id}
                                                                      value={nganh.id}>{nganh.ten}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách khoa - khóa học - ngành</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllKhoaKhoaHocNganhs
                            _onDeleteKhoaKhoaHocNganh={this._onDeleteKhoaKhoaHocNganh}
                            khoaKhoaHocNganhs={this.state.khoaKhoaHocNganhs}
                            _chooseAddingGroupKhoaKhoaHocNganh = {this._chooseAddingGroupKhoaKhoaHocNganh}
                        />
                    </div>
                    <TSMD_KhoaKhoaHocNganhAddGroup
                        addingGroupKhoaKhoaHocNganhId={this.state.addingGroupKhoaKhoaHocNganhId}
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

export default TSMD_InputKhoaKhoaHocNganh