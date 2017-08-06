/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'

import * as API from '../../apiUtility/studentApi'
//import components


class Week_Lesson extends Component {
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
        var startWeek=0;
        var endWeek = 0;
        if (lopHoc) {
            type = lopHoc.dmGiangDuong.dmLoaiPhong.ten;
            subjectName = lopHoc.maLopHoc;
            room = lopHoc.dmGiangDuong.ten;
            teacherName = lopHoc.dmNhanVien.hoDem + " " +  lopHoc.dmNhanVien.ten;
            var startLesson = this.getTietByTenTiet(lopHoc.tkb.tkb_tietDauTien.ten);
            var endLesson = this.getTietByTenTiet(lopHoc.tkb.tkb_tietCuoiCung.ten);
            numberOfLesson = endLesson - startLesson + 1;

            startWeek = lopHoc.tkb.tuanBatDau;
            endWeek = lopHoc.tkb.tuanKetThuc;
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

        if (type == "Phòng thực hành") {
            subjectNameCss += "subject-name" + " thuc-hanh";
        }
        if (type == "Phòng lý thuyết") {
            subjectNameCss += "subject-name" + " ly-thuyet";
        }

        var classContent = <div className="class-content">
            <div className={subjectNameCss}>
                {subjectName}
            </div>
            <div className="subject-detail">
                {room}<br/>
                Tuần: {startWeek} - {endWeek}
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

export default Week_Lesson;