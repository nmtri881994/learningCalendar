/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'

import * as API from '../../apiUtility/studentApi'
//import components

import {
    LESSON_1_START,
    LESSON_1_END,
    LESSON_2_START,
    LESSON_2_END,
    LESSON_3_START,
    LESSON_3_END,
    LESSON_4_START,
    LESSON_4_END,
    LESSON_5_START,
    LESSON_5_END,
    LESSON_6_START,
    LESSON_6_END,
    LESSON_7_START,
    LESSON_7_END,
    LESSON_8_START,
    LESSON_8_END,
    LESSON_9_START,
    LESSON_9_END,
    LESSON_10_START,
    LESSON_10_END,
} from '../../configuration/appConfig'

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: 0,
            lessonName: "",
            subjectId: 0,
            studentNote: ""
        }

        this.triggetModal = this.triggetModal.bind(this);
    }

    triggetModal() {
        this.props.triggerModal(this.state.lessonId, this.state.lessonName, this.state.subjectId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lopHoc) {
            if(nextProps.lopHoc.studentShowing){
                API.getCalendarStudentNote(nextProps.lopHoc.lopHocDetail.id, (note)=>{
                    this.setState({
                        studentNote: note
                    })
                }, (error) => {
                    console.log("error: ", error);
                })
            }
            this.setState({
                lessonId: nextProps.lopHoc.lopHocDetail.id,
                lessonName: nextProps.lopHoc.subjectName,
                subjectId: nextProps.lopHoc.subjectId,
                studentShowing: nextProps.lopHoc.studentShowing
            })
        }

    }

    checkLessonHappening(lopHoc, date) {
        var startHour = 0;
        var endHour = 0;
        var lopHocDetail = lopHoc.lopHocDetail;
        var startLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietDauTien.ten);
        var endLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietCuoiCung.ten);
        switch (startLesson) {
            case 1:
                startHour = LESSON_1_START;
                break;
            case 2:
                startHour = LESSON_2_START;
                break;
            case 3:
                startHour = LESSON_3_START;
                break;
            case 4:
                startHour = LESSON_4_START;
                break;
            case 5:
                startHour = LESSON_5_START;
                break;
            case 6:
                startHour = LESSON_6_START;
                break;
            case 7:
                startHour = LESSON_7_START;
                break;
            case 8:
                startHour = LESSON_8_START;
                break;
            case 9:
                startHour = LESSON_9_START;
                break;
                startHour = LESSON_10_START;
                break;
            default:
                console.log(lopHoc.startLesson);
        }
        switch (endLesson) {
            case 1:
                endHour = LESSON_1_END;
                break;
            case 2:
                endHour = LESSON_2_END;
                break;
            case 3:
                endHour = LESSON_3_END;
                break;
            case 4:
                endHour = LESSON_4_END;
                break;
            case 5:
                endHour = LESSON_5_END;
                break;
            case 6:
                endHour = LESSON_6_END;
                break;
            case 7:
                endHour = LESSON_7_END;
                break;
            case 8:
                endHour = LESSON_8_END;
                break;
            case 9:
                endHour = LESSON_9_END;
                break;
            case 10:
                endHour = LESSON_10_END;
                break;
            default:
                console.log(lopHoc.endLesson);
        }
        var currentHour = moment().format("H");
        var currentDate = moment().format("YYYY-MM-DD");
        return currentDate == date && startHour <= currentHour && currentHour <= endHour;
    }

    getTietByTenTiet(tenTiet) {
        switch (tenTiet) {
            case "Tiết 1":
                return 1;
            case "Tiết 2":
                return 2;
            case "Tiết 3":
                return 3;
            case "Tiết 4":
                return 4;
            case "Tiết 5":
                return 5;
            case "Tiết 6":
                return 6;
            case "Tiết 7":
                return 7;
            case "Tiết 8":
                return 8;
            case "Tiết 9":
                return 9;
            case "Tiết 10":
                return 10;
            default:
                console.log(tenTiet);
                return 0;
        }
    }

    render() {

        var lopHocDetail;
        var subjectName = "";
        var room = "";
        var numberOfLesson = 0;
        var type = "";
        var teacherMess = "";
        var teacherName = "";
        var lopHoc = this.props.lopHoc;
        var studentShowing;
        var teacherNote = "";
        // console.log(lopHoc);
        if(lopHoc){
            // console.log(lopHoc);
            lopHocDetail = lopHoc.lopHocDetail;
            subjectName = lopHoc.subjectName;
            room = lopHocDetail.giangDuong.ten;
            var startLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietDauTien.ten);
            var endLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietCuoiCung.ten);
            numberOfLesson = endLesson - startLesson + 1;
            type = lopHocDetail.giangDuong.dayNha.ten;
            teacherMess = lopHocDetail.giaoVienNhan;
            teacherName = lopHoc.teacherName;
            studentShowing = lopHoc.studentShowing;
            teacherNote = lopHoc.lopHocDetail.giaoVienGhiChu;
        }

        var css = "lesson";
        var subjectNameCss = "";

        if (this.props.morning) {
            css += "-morning"
        } else {
            css += "-afternoon"
        }


        if (this.props.haveClass) {
            css = "registered " + css;
            css += " lesson-" + numberOfLesson;

            if (this.checkLessonHappening(lopHoc, this.props.date)) {
                css += " lesson-happening";
            }
        }

        if (type == "Dãy nhà thực hành") {
            subjectNameCss += "subject-name" + " thuc-hanh";
        }
        if (type == "Dãy nhà lý thuyết") {
            subjectNameCss += "subject-name" + " ly-thuyet";
        }

        var classContent = <div className="class-content">
            <div className={subjectNameCss}>
                {subjectName}
            </div>
            <div className="subject-detail">
                {room?"Phòng học: "+room:""}<br/>
                {studentShowing?"Giảng viên: "+teacherName: ""}
                {teacherMess? <div className="note-content">
                    {teacherMess}
                </div>: ""}
                {studentShowing?<div className="student-note-content">
                        {this.state.studentNote}
                    </div>: <div className="teacher-note-content">
                        {teacherNote}
                    </div>}

            </div>

        </div>
        return (
            <div className={css}>
                {subjectName ? classContent : ""}
                {subjectName ? <div className="lesson-actions-corner">
                    <i className="fa fa-cog setting-icon cursor" aria-hidden="true" onClick={this.triggetModal}/>
                </div> : ""}
            </div>
        );
    }

    componentDidMount(){
        $(".lesson-morning").mouseenter(function () {
            $(this).children(".lesson-actions-corner").css("visibility", "visible");
        })

        $(".lesson-morning").mouseleave(function () {
            $(this).children(".lesson-actions-corner").css("visibility", "hidden");
        })

        $(".lesson-afternoon").mouseenter(function () {
            $(this).children(".lesson-actions-corner").css("visibility", "visible");
        })

        $(".lesson-afternoon").mouseleave(function () {
            $(this).children(".lesson-actions-corner").css("visibility", "hidden");
        })
    }
}

export default Lesson;