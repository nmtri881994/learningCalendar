/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditKhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faculty: {
                id: 0,
                ma: "",
                ten: ""
            }
        }

        this._onChangeMa = this._onChangeMa.bind(this);
        this._onChangeName = this._onChangeName.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            faculty: nextProps.faculty
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onChangeMa(e) {
        let faculty = this.state.faculty;
        faculty.ma = e.target.value;
        this.setState({
            faculty: faculty
        })
    }

    _onChangeName(e) {
        let faculty = this.state.faculty;
        faculty.ten = e.target.value;
        this.setState({
            faculty: faculty
        })
    }

    _handleSubmit() {
        this.props._handleEditFaculty(this.state.faculty);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin khoa</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div>
                            <div className="edit-title">Mã khoa</div>
                            <input className="input-large" value={this.state.faculty.ma} onChange={this._onChangeMa}/>
                        </div>
                        <div>
                            <div className="edit-title">Tên khoa</div>
                            <input className="input-full-window" value={this.state.faculty.ten}
                                   onChange={this._onChangeName}/>
                        </div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>

        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditKhoa