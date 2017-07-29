/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_EditNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVien:{
                id: 0,
                maNhanVien: "",
                hoDem: "",
                ten: "",
                dmDonVi:{
                    id: 0,
                    ma: "",
                    ten: ""
                }
            },
            donVis: [],
            errorMess1: ""
        }

        this._handleSubmit = this._handleSubmit.bind(this);

        this._onMaNhanVienChange = this._onMaNhanVienChange.bind(this);
        this._onHoDemChange = this._onHoDemChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onDonViChange = this._onDonViChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            donVis: nextProps.donVis,
            nhanVien: nextProps.nhanVien
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        if(this.state.nhanVien.maNhanVien == ""){
            this.setState({
                errorMess1: "Chưa điền mã nhân viên "
            })
        }else{
            this.props._onEditNhanVien(this.state.nhanVien);
            var modal = $("#myModal")[0];
            modal.style.display = "none";
        }
    }


    _onMaNhanVienChange(e){
        let nhanVien = this.state.nhanVien;
        nhanVien.maNhanVien = e.target.value;
        this.setState({
            nhanVien: nhanVien
        })
    }

    _onHoDemChange(e){
        let nhanVien = this.state.nhanVien;
        nhanVien.hoDem = e.target.value;
        this.setState({
            nhanVien: nhanVien
        })
    }

    _onTenChange(e){
        let nhanVien = this.state.nhanVien;
        nhanVien.ten = e.target.value;
        this.setState({
            nhanVien: nhanVien
        })
    }

    _onDonViChange(e){
        let nhanVien = this.state.nhanVien;
        nhanVien.dmDonVi.id = e.target.value;
        this.setState({
            nhanVien: nhanVien
        })
    }


    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin lớp học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <span className="edit-title">Mã nhân viên</span>
                            <input className="input-small margin-left-20" value={this.state.nhanVien.maNhanVien}
                                   onChange={this._onMaNhanVienChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Họ đệm</span>
                            <input className="input-small margin-left-20" value={this.state.nhanVien.hoDem}
                                   onChange={this._onHoDemChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Tên</span>
                            <input className="input-small margin-left-20" value={this.state.nhanVien.ten}
                                   onChange={this._onTenChange}/>
                        </div>
                        <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa
                        </span>
                            <select className="input-large margin-left-20" value={this.state.nhanVien.dmDonVi.donViId}
                                    onChange={this._onDonViChange}>
                                {this.state.donVis.map(donVi => <option key={donVi.id}
                                                                        value={donVi.id}>{donVi.ten}</option>)}
                            </select>
                        </div>
                        <div className="error-message margin-left-20">{this.state.errorMess1}</div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>h

        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditNhanVien