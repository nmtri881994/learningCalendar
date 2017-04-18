/**
 * Created by Tri on 4/18/2017.
 */
import React, {Component} from 'react'

class TSMD_SubLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            css: ""
        }
    }

    componentWillMount() {
        var css = "";
        var lesson = this.props.lesson;
        console.log(lesson);
        if (!this.props.haveClass) {
            if (this.props.morning) {
                css = "lesson-1 morning";
            } else {
                css = "lesson-1 afternoon";
            }
        } else {
            var numberOfLesson = lesson.tkb.tkb_tietCuoiCung.thuTu - lesson.tkb.tkb_tietDauTien.thuTu + 1;
            if (this.props.morning) {
                css = "lesson-" + numberOfLesson + " morning"
            } else {
                css = "lesson-" + numberOfLesson + " afternoon"
            }

            if(this.props.final){
                css += " sub-lesson-final";
            }

        }

        this.setState({
            css: css
        })
    }

    render() {
        var lesson = this.props.lesson;
        return (<div className={this.state.css}>
            {this.props.haveClass ? <div className="class-content">
                    <div className="subject-name thuc-hanh">
                        {lesson.maLopHoc}
                    </div>
                    <div className="subject-detail">
                        {lesson.giangDuong.maGiangDuong}<br/>
                        Tuần: {lesson.tkb.tuanBatDau}-{lesson.tkb.tuanKetThuc}
                    </div>
                </div> : ""}
        </div>)
    }
}

export default TSMD_SubLesson