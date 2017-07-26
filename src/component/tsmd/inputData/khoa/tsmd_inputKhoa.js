/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllKhoas from './tsmd_allKhoas'
import TSMD_EditKhoa from './tsmd_editKhoa'

class TSMD_InputKhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faculties: [],
            inputFacultyCode: "",
            inputFacultyName: "",
            errorMess: "",
            editingFaculty: {
                id: 0,
                ma: "",
                ten: ""
            }
        }

        this._onFacultyCodeChange = this._onFacultyCodeChange.bind(this);
        this._onFacultyCodeName = this._onFacultyCodeName.bind(this);
        this._onDeleteFaculty = this._onDeleteFaculty.bind(this);
        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleEditFaculty = this._handleEditFaculty.bind(this);
    }

    componentWillMount() {
        API.getAllFaculties((faculties) => {
            this.setState({
                faculties: faculties
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _onFacultyCodeChange(e) {
        this.setState({
            inputFacultyCode: e.target.value
        })
    }

    _onFacultyCodeName(e) {
        this.setState({
            inputFacultyName: e.target.value
        })
    }

    _onDeleteFaculty(id) {
        API.deleteFaculty(id, (response) => {
            if (response.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa khoa này bởi đã tồn tại khóa học cho khoa, hãy xóa (các)khóa học đó trước"
                })
            } else {
                API.getAllFaculties((faculties) => {
                    this.setState({
                        faculties: faculties,
                        errorMess: ""
                    });
                }, (error) => {
                    console.log(error);
                })

            }

        }, (error) => {
            console.log(error);
        })
    }

    _handleSubmit() {
        API.inputFaculty({
            id: 0,
            ma: this.state.inputFacultyCode,
            ten: this.state.inputFacultyName
        }, (faculty) => {
            API.getAllFaculties((faculties) => {
                this.setState({
                    faculties: faculties,
                    inputFacultyCode: "",
                    inputFacultyName: ""
                });
            }, (error) => {
                console.log(error);
            });
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const faculties = this.state.faculties;
        let editingFaculty;
        for (let i = 0; i < faculties.length; i++) {
            if (faculties[i].id == id) {
                editingFaculty = faculties[i];
                break;
            }
        }
        this.setState({
            editingFaculty: editingFaculty
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _handleEditFaculty(faculty) {
        API.editFaculty(faculty, (faculty) => {
            API.getAllFaculties((faculties) => {
                this.setState({
                    faculties: faculties,
                });
            }, (error) => {
                console.log(error);
            });
        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin khoa</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã khoa</span>
                        <input className="input-large margin-left-20" value={this.state.inputFacultyCode}
                               onChange={this._onFacultyCodeChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên khoa</span>
                        <input className="input-large margin-left-20" value={this.state.inputFacultyName}
                               onChange={this._onFacultyCodeName}/>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách khoa</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllKhoas _onDeleteFaculty={this._onDeleteFaculty} _triggerModal={this._triggerModal}
                                       faculties={this.state.faculties}/>
                    </div>
                    <TSMD_EditKhoa _handleEditFaculty={this._handleEditFaculty} faculty={this.state.editingFaculty}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputKhoa