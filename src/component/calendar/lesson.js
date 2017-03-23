/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'

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

    }

    checkLessonHappening(lopHoc) {
        var startHour = 0;
        var endHour = 0;
        switch (lopHoc.startLesson){
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
            case 10:
                startHour = LESSON_10_START;
                break;
            default:
                console.log(lopHoc.startLesson);
        }
        switch (lopHoc.endLesson){
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
        return startHour <= currentHour && currentHour <= endHour;
    }

    render() {
        var lopHoc = this.props.lopHoc;
        var subjectName = "";
        var giangDuong = "";
        var giangVien = "";
        var numberOfLesson = 0;
        var type = "";
        if (lopHoc) {
            subjectName = lopHoc.name;
            giangDuong = lopHoc.giangDuong;
            giangVien = lopHoc.giangVien;
            numberOfLesson = lopHoc.endLesson - lopHoc.startLesson + 1;
            type = lopHoc.type;
        }
        var css = "lesson";
        var subjectNameCss = "";

        if (this.props.morning) {
            css += "-morning"
        } else {
            css += "-afternoon"
        }

        if (this.props.haveClass) {
            css += " lesson-" + numberOfLesson;
            if(this.checkLessonHappening(lopHoc)){
                css += " lesson-happening";
            }

            console.log(this.checkLessonHappening(lopHoc));
        }

        if (type == "Thực hành") {
            subjectNameCss += "subject-name" + " thuc-hanh";
        }
        if (type == "Lý thuyết") {
            subjectNameCss += "subject-name" + " ly-thuyet";
        }

        var classContent = <div className="class-content">
            <div className={subjectNameCss}>
                {subjectName}
            </div>
            <div className="subject-detail">
                Phòng học: {giangDuong} <br/>
                Giảng viên: {giangVien}
            </div>
        </div>
        return (
            <div className={css}>
                {subjectName ? classContent : ""}
            </div>
        );
    }
}

export default Lesson;