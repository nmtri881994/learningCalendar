/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllKhoaHocs from './tsmd_allKhoaHocs'
import TSMD_EditKhoaHoc from './tsmd_editKhoaHoc'

class TSMD_InputKhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: [],
            year: 0,
            errorMess: "",
            editingTerm: {
                id: 0,
                nam: 0
            }
        }

        this._onYearChange = this._onYearChange.bind(this);
        this._triggerModal = this._triggerModal.bind(this);
        this._editTerm = this._editTerm.bind(this);
        this._deleteTerm = this._deleteTerm.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {
        API.getAllTerms((terms) => {
            this.setState({
                terms: terms
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        API.insertTerm({
            id: 0,
            nam: this.state.year
        }, (terms) => {
            this.setState({
                terms: terms,
                year: 0,
                errorMess: "",
            });
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const terms = this.state.terms;
        console.log(terms);
        let editingTerm;
        for (let i = 0; i < terms.length; i++) {
            if (terms[i].id == id) {
                editingTerm = terms[i];
                break;
            }
        }
        this.setState({
            editingTerm: editingTerm
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onYearChange(e) {
        this.setState({
            year: e.target.value
        })
    }

    _editTerm(term) {
        API.editTerm(term, (terms) => {
            this.setState({
                terms: terms,
                errorMess: ""
            })
        }, (error) => {
            console.log(error)
        })
    }

    _deleteTerm(termId) {
        API.deleteTerm(termId, (terms) => {
            if (terms.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa khóa học này bởi đã tồn tại lớp môn học/lớp học cho khóa học này"
                })
            } else {
                this.setState({
                    terms: terms,
                    errorMess: ""
                })
            }

        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin khóa học</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Năm</span>
                        <input className="input-small margin-left-20" value={this.state.year}
                               onChange={this._onYearChange}/>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách khóa học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllKhoaHocs _deleteTerm={this._deleteTerm} _triggerModal={this._triggerModal}
                                          terms={this.state.terms}/>
                    </div>
                    <TSMD_EditKhoaHoc _editTerm={this._editTerm} term={this.state.editingTerm}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputKhoa