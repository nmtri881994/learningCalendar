/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import {DATE_FORMAT_PICKER} from '../../configuration/appConfig'

//import actions
import {editLesson} from '../../action/teacherAction'

//import Apis
import * as API from '../../apiUtility/teacherApi'

class EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            lessonId: -1,
            lessonDetail: {
                giangDuong: {
                    id: 0
                },
                giaoVienNhan: "",
                giaoVienGhiChu: "",
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
            allLessons: null,
            subjectRooms: [],
            dateChange: "",
            currentDate: "",
            stompClient: null,
            availableLessons: []
        }

        this.handleStartLessonChange = this.handleStartLessonChange.bind(this);
        this.handleEndLessonChange = this.handleEndLessonChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleTeacherMessageChange = this.handleTeacherMessageChange.bind(this);
        this.handleTeacherNoteChange = this.handleTeacherNoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setState({
            lessonId: nextProps.lessonId,
            lessonName: nextProps.lessonName,
            subjectId: nextProps.subjectId,
            allLessons: nextProps.allLessons,
            subjectRooms: nextProps.subjectRooms,
            currentDate: nextProps.currentDate
        })
        if (nextProps.lessonDetail) {
            this.getAvailableLessons(nextProps.lessonDetail.giangDuong.id, nextProps.lessonDetail.ngay);
            this.setState({
                lessonDetail: nextProps.lessonDetail,
                dateChange: nextProps.lessonDetail.ngay
            })
        }

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    handleStartLessonChange(e) {
        // console.log(e.target.value);
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.tkb_tietDauTien.id = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })
        // console.log(this.state);
    }

    handleEndLessonChange(e) {
        // console.log(e.target.value);
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.tkb_tietCuoiCung.id = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })
        // console.log(this.state);
    }

    handleRoomChange(e) {
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.giangDuong.id = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })

        this.getAvailableLessons();
    }

    getAvailableLessons(roomId, date) {
        var chosenRoomId;
        if(roomId){
            chosenRoomId = roomId;
        }else{
            chosenRoomId = this.state.lessonDetail.giangDuong.id;
        }

        var chosenDate;
        if(date){
            chosenDate = date;
        }else{
            chosenDate = this.state.dateChange;
        }

        API.getAvailableLessonsOfRoomByDate(chosenRoomId, chosenDate, (lessons) => {
            console.log(lessons);
            this.setState({
                availableLessons: lessons
            })
        }, (error) => {
            console.log("error: ", error);
        })
    }

    handleTeacherMessageChange(e) {
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.giaoVienNhan = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })
    }

    handleTeacherNoteChange(e) {
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.giaoVienGhiChu = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })
    }

    handleSubmit() {
        var lessonDetail = this.state.lessonDetail;
        if (this.state.dateChange != "") {
            lessonDetail.ngay = this.state.dateChange;
        }
        this.setState({
            lessonDetail: lessonDetail
        })
        this.state.stompClient.send("/socket/calendar", {}, "edited");
        editLesson(this.state.lessonDetail, this.state.currentDate);
    }

    render() {
        var lessonDetail = this.state.lessonDetail;
        var allLessons = this.state.allLessons;
        var subjectRooms = this.state.subjectRooms;
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
                            <div className="section-title">Thay đổi thời gian, địa điểm</div>
                            <div className="edit-title">
                                Ngày
                            </div>
                            <input id="datetimepicker" className="halfLength"
                                   value={this.state.dateChange}/><br/>
                            <div className="edit-title">
                                Phòng
                            </div>
                            <select className="halfLength" value={lessonDetail.giangDuong.id}
                                    onChange={this.handleRoomChange}>
                                {allLessons ?
                                    subjectRooms.map(room =>
                                        <option key={room.id} value={room.id}>{room.ten}</option>
                                    )

                                    : ""
                                }
                            </select>
                            <div className="edit-title">
                                Từ tiết
                            </div>
                            <select id="start-lesson-selecbox" className="halfLength"
                                    value={lessonDetail.tkb_tietDauTien.id} onChange={this.handleStartLessonChange}>
                                {allLessons ?
                                    allLessons.map(lesson =>
                                        <option key={lesson.id} value={lesson.id}>{lesson.ten}</option>
                                    )

                                    : ""
                                }
                            </select>
                            <div className="edit-title">
                                Tới tiết
                            </div>
                            <select id="end-lesson-selecbox" className="halfLength"
                                    value={lessonDetail.tkb_tietCuoiCung.id} onChange={this.handleEndLessonChange}>
                                {allLessons ?
                                    allLessons.map(lesson =>
                                        <option key={lesson.id} value={lesson.id}>{lesson.ten}</option>
                                    )

                                    : ""
                                }
                            </select>
                        </div>
                        <div className="field-section">
                            <div className="section-title">Thay đổi lời nhắn</div>
                            <div className="edit-title">
                                Thay đổi lời nhắn với sinh viên
                            </div>
                            <textarea className="edit-note-textArea fullLength"
                                      value={lessonDetail.giaoVienNhan ? lessonDetail.giaoVienNhan : ""}
                                      onChange={this.handleTeacherMessageChange}/><br/>
                            <div className="edit-title">
                                Thay đổi ghi chú cá nhân
                            </div>
                            <textarea className="edit-note-textArea fullLength"
                                      value={lessonDetail.giaoVienGhiChu ? lessonDetail.giaoVienGhiChu : ""}
                                      onChange={this.handleTeacherNoteChange}/><br/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleSubmit}>Lưu</button>
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

        const set = (val) => this.setState(val);
        // var lessonDetail = this.state.lessonDetail;
        // console.log(lessonDetail);
        const getAvailableLessons = () => this.getAvailableLessons();
        $('#datetimepicker').change(function (val) {
            // var lessonDetail = this.state.lessonDetail;
            // console.log(val);
            var date = $('#datetimepicker').val();
            // console.log("1",lessonDetail);
            set({dateChange: date});
            getAvailableLessons();
        });

        var socket = SockJS('http://localhost:8080/calendar'); // <3>
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/calendar", function (message) {
            });
        });

        this.setState({
            stompClient: stompClient
        })
    }
}

export default EditClass;