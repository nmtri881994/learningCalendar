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

//import Components
import Mini_Lessons from './../calendar/mini_lessons'

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
            availableLessons: [],
            availableEndLessons: [],
            message: "",
            error: ""
        }

        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleTeacherMessageChange = this.handleTeacherMessageChange.bind(this);
        this.handleTeacherNoteChange = this.handleTeacherNoteChange.bind(this);

        this.choseLesson = this.choseLesson.bind(this);
        this.resetLesson = this.resetLesson.bind(this);

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
            this.getAvailableLessons(nextProps.lessonDetail.giangDuong.id, nextProps.lessonDetail.ngay, nextProps.lessonDetail.tkb_tietDauTien.id);
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

    handleRoomChange(e) {
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.giangDuong.id = e.target.value;
        this.setState({
            lessonDetail: lessonDetail
        })

        this.getAvailableLessons();
    }

    getAvailableLessons(roomId, date, defaulStartLesoonId) {
        var chosenRoomId;
        if (roomId) {
            chosenRoomId = roomId;
        } else {
            chosenRoomId = this.state.lessonDetail.giangDuong.id;
        }

        var chosenDate;
        if (date) {
            chosenDate = date;
        } else {
            chosenDate = this.state.dateChange;
        }

        var chosenLessonId = this.state.lessonId;

        API.getAvailableLessonsOfRoomByDate(chosenLessonId, chosenRoomId, chosenDate, (lessons) => {
            // alert(lessons);
            if (typeof lessons == "string") {
                $("#edit-class-button").prop("disabled", true);
                this.setState({
                    availableLessons: [],
                    availableEndLessons: [],
                    message: lessons
                })
            } else {
                $("#edit-class-button").prop("disabled", false);
                this.setState({
                    availableLessons: lessons,
                    message: ""
                });
                if (defaulStartLesoonId) {
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(defaulStartLesoonId);
                } else {
                    var lessonDetail = this.state.lessonDetail;
                    lessonDetail.tkb_tietDauTien.id = lessons[0].id;
                    this.setState({
                        lessonDetail: lessonDetail
                    })
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
                }
            }

        }, (error) => {
            console.log("error: ", error);
        })
    }

    setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonId) {
        var availableLessons = this.state.availableLessons;
        var availableEndLessons = [];
        var indexOfStartLesson = -1;
        var lessonDetail = this.state.lessonDetail;

        for (var i = 0; i < availableLessons.length; i++) {
            if (startLessonId == availableLessons[i].id) {
                indexOfStartLesson = i;
                break
            }
        }
        var startLesson = availableLessons[indexOfStartLesson];

        for (var i = indexOfStartLesson; i < availableLessons.length; i++) {
            if ((availableLessons[i].thuTu - startLesson.thuTu) == (i - indexOfStartLesson)) {
                availableEndLessons.push(availableLessons[i].thuTu);
            } else {
                break;
            }
        }


        if (!this.checkExist(this.state.lessonDetail.tkb_tietCuoiCung.id, availableEndLessons)) {
            lessonDetail.tkb_tietCuoiCung.id = availableEndLessons[0];
        }



        this.setState({
            lessonDetail: lessonDetail,
            availableEndLessons: availableEndLessons
        })

    }

    checkExist(chosenId, lessons) {
        if (lessons) {
            for (var i = 0; i < lessons.length; i++) {
                if (chosenId == lessons[i]) {
                    return true;
                }
            }
        }

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

        if (lessonDetail.ngay) {

        }
        this.state.stompClient.send("/socket/calendar", {}, "edited");
        editLesson(this.state.lessonDetail, this.state.currentDate);
    }

    choseLesson(i) {

        var lessonDetail = this.state.lessonDetail;

        var availableLessons = this.state.availableLessons;
        var availableEndLesson = this.state.availableEndLessons;
        if (this.state.lessonDetail.tkb_tietDauTien.id == 0 || availableEndLesson.indexOf(i) == -1) {
            lessonDetail.tkb_tietDauTien.id = i;
            lessonDetail.tkb_tietCuoiCung.id=i;
            this.setState({
                lessonDetail: lessonDetail,
            })
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(i, availableLessons);
        } else {
            if (i >= this.state.lessonDetail.tkb_tietDauTien.id) {
                if (i < this.state.chosenEndLessonId) {
                    lessonDetail.tkb_tietDauTien.id = i;
                    this.setState({
                        lessonDetail: lessonDetail
                    })
                } else {
                    lessonDetail.tkb_tietCuoiCung.id = i;
                    this.setState({
                        lessonDetail: lessonDetail
                    })
                }
            } else {
                lessonDetail.tkb_tietDauTien.id = i;
                this.setState({
                    lessonDetail: lessonDetail
                })
            }
        }

    }

    resetLesson() {
        var lessonDetail = this.state.lessonDetail;
        lessonDetail.tkb_tietDauTien.id = 0;
        lessonDetail.tkb_tietCuoiCung.id = 0;
        this.setState({
            lessonDetail: lessonDetail
        })
    }

    render() {
        var lessonDetail = this.state.lessonDetail;
        var subjectRooms = this.state.subjectRooms;
        var availableLessons = this.state.availableLessons;
        var availableEndLessons = this.state.availableEndLessons;
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
                                {subjectRooms ?
                                    subjectRooms.map(room =>
                                        <option key={room.id} value={room.id}>{room.ten}</option>
                                    )

                                    : ""
                                }
                            </select>
                            <div className="edit-title">
                                Từ tiết
                            </div>
                            <Mini_Lessons choseLesson={this.choseLesson} resetLesson={this.resetLesson}
                                          availableLessons={availableLessons}
                                          startLessonId={this.state.lessonDetail.tkb_tietDauTien.id}
                                          endLessonId={this.state.lessonDetail.tkb_tietCuoiCung.id}/>
                        </div>
                        <div className="error-message">
                            {this.state.message}
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
                        <div className="error-message">
                            {this.state.error}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="edit-class-button" onClick={this.handleSubmit}>Lưu</button>
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