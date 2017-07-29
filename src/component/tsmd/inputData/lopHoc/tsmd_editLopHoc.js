/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditLopHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khoaKhoaHocs: [],
            class: {
                id: 0,
                ma: "",
                ten: "",
                khoaKhoaHoc: {
                    id: 0
                }
            }
        }

        this._onClassCodeChange = this._onClassCodeChange.bind(this);
        this._onClassNameChange = this._onClassNameChange.bind(this);
        this._onKhoaKhoaHocChange = this._onKhoaKhoaHocChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            khoaKhoaHocs: nextProps.khoaKhoaHocs,
            class: nextProps.class
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._onEditClass(this.state.class);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _onClassCodeChange(e) {
        let cl = this.state.class;
        cl.ma = e.target.value;
        this.setState({
            class: cl
        })
    }

    _onClassNameChange(e) {
        let cl = this.state.class;
        cl.ten = e.target.value;
        this.setState({
            class: cl
        })
    }

    _onKhoaKhoaHocChange(e) {
        let cl = this.state.class;
        cl.khoaKhoaHoc.id = e.target.value;
        this.setState({
            class: cl
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
                            <span className="edit-title">Mã lớp</span>
                            <input className="input-small margin-left-20" value={this.state.class.ma}
                                   onChange={this._onClassCodeChange}/>
                        </div>
                        <div className="choose-condition-item">
                            <span className="edit-title">Tên lớp</span>
                            <input className="input-small margin-left-20" value={this.state.class.ten}
                                   onChange={this._onClassNameChange}/>
                        </div>
                        <div className="choose-condition-item">
                        <span className="edit-title">
                            Khoa - Khóa học
                        </span>
                            <select className="input-large margin-left-20" value={this.state.class.khoaKhoaHoc.id}
                                    onChange={this._onKhoaKhoaHocChange}>
                                {this.state.khoaKhoaHocs.map(khoaKhoaHoc => <option key={khoaKhoaHoc.id}
                                                                                    value={khoaKhoaHoc.id}>{khoaKhoaHoc.khoa.ten + ' ' + khoaKhoaHoc.tkb_khoaHoc.nam}</option>)}
                            </select>
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

export default TSMD_EditLopHoc