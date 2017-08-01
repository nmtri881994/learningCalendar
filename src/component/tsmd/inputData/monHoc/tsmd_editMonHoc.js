/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_EditMonHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monHoc:{
                id: 0,
                maMonHoc: "",
                ten: "",
                soTinChi: 0.0
            },
        }

        this._handleSubmit = this._handleSubmit.bind(this);

        this._onMaMonHocChange = this._onMaMonHocChange.bind(this);
        this._onTenChange = this._onTenChange.bind(this);
        this._onSoTinChiChange = this._onSoTinChiChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            monHoc: nextProps.editingMonHoc
        })
    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._onEditMonHoc(this.state.monHoc);

        var modal = $("#myModal")[0];
        modal.style.display = "none";
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
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin môn học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <span className="edit-title">Mã môn học</span>
                            <input className="input-small margin-left-20" value={this.state.monHoc.maMonHoc}
                                   onChange={this._onMaMonHocChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Tên môn học</span>
                            <input className="input-large margin-left-20" value={this.state.monHoc.ten}
                                   onChange={this._onTenChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Số tín chỉ</span>
                            <input className="input-small margin-left-20" type="number" value={this.state.monHoc.soTinChi}
                                   onChange={this._onSoTinChiChange}/>
                        </div>
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

export default TSMD_EditMonHoc