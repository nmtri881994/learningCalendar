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

class TSMD_Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarId: 0
        }
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
        var lopHoc = this.props.lopHoc;
        var type = "";
        var subjectName = "";
        var room = "";
        var teacherName = "";
        var numberOfLesson = 0;
        if (lopHoc) {
            type = lopHoc.giangDuong.dayNha.ten;
            subjectName = lopHoc.monHoc.ten;
            room = lopHoc.giangDuong.ten;
            teacherName = lopHoc.giaoVien.hoDem + " " +  lopHoc.giaoVien.ten;
            var startLesson = this.getTietByTenTiet(lopHoc.tkb_tietDauTien.ten);
            var endLesson = this.getTietByTenTiet(lopHoc.tkb_tietCuoiCung.ten);
            numberOfLesson = endLesson - startLesson + 1;
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
                {room ? "Phòng học: " + room : ""}<br/>
                {teacherName ? "Giảng viên: " + teacherName : ""}
            </div>

        </div>
        return (
            <div className={css}>
                {subjectName ? classContent : ""}
            </div>
        );
    }

    componentDidMount() {
    }
}

export default TSMD_Lesson;