/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
import {DATE_FORMAT_PICKER} from '../../configuration/appConfig'


class EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            lessonId: -1,
            lessonDetail: {
                giangDuong: null,
                giaoVienNhan: "",
                id: 0,
                ngay: "",
                thiCuoiKy: false,
                thiGiuaKy: false,
                tkb_thu: null,
                tkb_tietCuoiCung: {
                    id: 0,
                    ten: ""
                },
                tkb_tietDauTien: {
                    id: 0,
                    ten: ""
                }
            },
            lessonName: "",
            subjectId: 0,
            allLessons: null
        }
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setState({
            lessonId: nextProps.lessonId,
            lessonName: nextProps.lessonName,
            subjectId: nextProps.subjectId,
            allLessons: nextProps.allLessons
        })
        if (nextProps.lessonDetail) {
            this.setState({
                lessonDetail: nextProps.lessonDetail
            })
        }
    }


    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    render() {
        var lessonDetail = this.state.lessonDetail;
        var allLessons = this.state.allLessons;

        return (<div>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.close}>&times;</span>
                        {lessonDetail ? <h2>{this.state.lessonName}</h2> : ""}
                    </div>
                    <div className="modal-body">
                        <div className="field-section">
                            <div className="section-title">Thay đổi thời gian</div>
                            <div className="edit-title">
                                Ngày
                            </div>
                            <input id="datetimepicker" className="halfLength"
                                   value={this.state.lessonDetail.ngay}/><br/>
                            <div className="edit-title">
                                Từ tiết
                            </div>
                            <select className="halfLength" value={lessonDetail.tkb_tietDauTien.id}>
                                {allLessons?
                                    allLessons.map(lesson =>
                                        <option key={lesson.id} value={lesson.id}>{lesson.ten}</option>
                                    )

                                    :""
                                }
                            </select>
                            <div className="edit-title">
                                tới tiết
                            </div>
                            <select className="halfLength" value={lessonDetail.tkb_tietCuoiCung.id}>
                                {allLessons?
                                    allLessons.map(lesson =>
                                        <option key={lesson.id} value={lesson.id}>{lesson.ten}</option>
                                    )

                                    :""
                                }
                            </select>
                        </div>
                        <div className="field-section">
                            <div className="section-title">Thay đổi địa điểm</div>
                            <div className="edit-title">
                                Phòng
                            </div>
                            <input className="halfLength"/><br/>
                        </div>
                        <div className="field-section">
                            <div className="section-title">Thay đổi lời nhắn</div>
                            <div className="edit-title">
                                Thay đổi lời nhắn với sinh viên
                            </div>
                            <textarea className="edit-note-textArea fullLength"
                                      value={this.state.lessonDetail.giaoVienNhan}/><br/>
                            <div className="edit-title">
                                Thay đổi ghi chú cá nhân
                            </div>
                            <textarea className="edit-note-textArea fullLength" value=""/><br/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button>Lưu</button>
                        {/*<button >Cancel</button>*/}
                    </div>
                </div>

            </div>
        </div>);
    }

    componentDidMount() {
        var dateToday = new Date();
        $('#datetimepicker').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
            minDate: dateToday
        });
    }
}

export default EditClass;