/**
 * Created by Tri on 4/18/2017.
 */
import React, {Component} from 'react'

class Week_SubLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            css: "",
            lyThuyet: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.helpRender(nextProps);
    }

    helpRender(props){
        var css = "";
        var lesson = props.lesson;
        if (!props.haveClass) {
            if (props.morning) {
                css = "lesson-1 morning";
            } else {
                css = "lesson-1 afternoon";
            }
        } else {
            var numberOfLesson = lesson.tkb.tkb_tietCuoiCung.thuTu - lesson.tkb.tkb_tietDauTien.thuTu + 1;
            if (props.morning) {
                css = "lesson-" + numberOfLesson + " morning"
            } else {
                css = "lesson-" + numberOfLesson + " afternoon"
            }
        }

        var lyThuyet = false;
        if(lesson){
            if (lesson.dmGiangDuong.dmLoaiPhong.ten == "Dãy nhà lý thuyết") {
                lyThuyet = true;
            } else {
                lyThuyet = false;
            }
        }

        this.setState({
            css: css,
            lyThuyet: lyThuyet
        })
    }

    componentWillMount() {
        this.helpRender(this.props);
    }

    render() {
        var css = this.state.css;
        if (this.props.final) {
            css += " sub-lesson-final";
        }

        var nameCss = "subject-name ";
        if(this.state.lyThuyet){
            nameCss += "ly-thuyet";
        }else{
            nameCss += "thuc-hanh";
        }
        var lesson = this.props.lesson;
        return (<div className={css}>
            {this.props.haveClass ? <div className="class-content">
                <div className={nameCss}>
                    {lesson.maLopHoc}
                </div>
                <div className="subject-detail">
                    {lesson.dmGiangDuong.maGiangDuong}<br/>
                    Tuần: {lesson.tkb.tuanBatDau}-{lesson.tkb.tuanKetThuc}
                </div>
            </div> : ""}
        </div>)
    }
}

export default Week_SubLesson