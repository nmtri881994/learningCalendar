/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllMonHocGiangDuongs from './tsmd_allMonHocGiangDuongs'

class TSMD_InputMonHocGiangDuong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monHocGiangDuongs: [],
            monHocs: [],
            monHocId: 0,
            giangDuongs: [],
            giangDuongId: 0,
            errorMess1: "",
            errorMess: ""
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteMHGD = this._onDeleteMHGD.bind(this);

        this._onMonHocChange = this._onMonHocChange.bind(this);
        this._onGiangDuongChange = this._onGiangDuongChange.bind(this);
    }

    componentWillMount() {
        API.getAllMonHocs((monHocs) => {
            API.getAllGiangDuong((giangDuongs) => {
                API.getAllMonHocGiangDUong((monHocGiangDuongs) => {
                    this.setState({
                        monHocGiangDuongs: monHocGiangDuongs,
                        monHocs: monHocs,
                        monHocId: monHocs[0].id,
                        giangDuongs: giangDuongs,
                        giangDuongId: giangDuongs[0].id
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
        API.insertMHGD(this.state.monHocId, this.state.giangDuongId, (monHocGiangDuongs) => {
            this.setState({
                monHocGiangDuongs: monHocGiangDuongs,
                errorMess1: ""
            })
        }, (error) => {
            if (error.response.status == 409) {
                this.setState({
                    errorMess1: "Môn học đã có giảng đường này"
                })
            }
        })
    }

    _onDeleteMHGD(id){
        API.deleteMHGD(id, (monHocGiangDuongs)=>{
            this.setState({
                monHocGiangDuongs: monHocGiangDuongs
            })
        }, (error)=>{
            console.log(error);
        })
    }


    _onMonHocChange(e) {
        this.setState({
            monHocId: e.target.value
        })
    }

    _onGiangDuongChange(e) {
        this.setState({
            giangDuongId: e.target.value
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Thêm môn học - giảng đường</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Môn học
                        </span>
                        <select className="input-append margin-left-20" value={this.state.monHocId}
                                onChange={this._onMonHocChange}>
                            {this.state.monHocs.map(monHoc => <option key={monHoc.id}
                                                                      value={monHoc.id}>{monHoc.maMonHoc + " " + monHoc.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">
                            Giảng đường
                        </span>
                        <select className="input-large margin-left-20" value={this.state.giangDuongId}
                                onChange={this._onGiangDuongChange}>
                            {this.state.giangDuongs.map(giangDuong => <option key={giangDuong.id}
                                                                              value={giangDuong.id}>{giangDuong.maGiangDuong}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>
                    <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách môn học - giảng đường</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllMonHocGiangDuongs _onDeleteMHGD={this._onDeleteMHGD}
                            monHocGiangDuongs={this.state.monHocGiangDuongs}/>
                    </div>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputMonHocGiangDuong