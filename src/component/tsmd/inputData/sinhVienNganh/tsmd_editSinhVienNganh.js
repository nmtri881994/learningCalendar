/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_EditSinhVienNganh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nganhs: [],
            nganhId: 0,
            sinhVienId: 0
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onNganhChange = this._onNganhChange.bind(this);


    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editingSinhVienId != 0) {
            API.getAllNganhOfSinhVien(nextProps.editingSinhVienId, (nganhs) => {
                this.setState({
                    nganhs: nganhs,
                    nganhId: nganhs[0].id,
                    sinhVienId: nextProps.editingSinhVienId
                })
            }, (error) => {
                console.log(error);
            })
        }
    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._onChonNganh(this.state.sinhVienId, this.state.nganhId);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onNganhChange(e) {
        this.setState({
            nganhId: e.target.value
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Chọn ngành cho sinh viên</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <div className="edit-title">
                                Ngành
                            </div>
                            <select className="input-append margin-left-20" value={this.state.nganhId}
                                    onChange={this._onNganhChange}>
                                {this.state.nganhs.map(nganh => <option key={nganh.id}
                                                                        value={nganh.id}>{nganh.ten}</option>)}
                            </select>
                        </div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>
            h

        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditSinhVienNganh