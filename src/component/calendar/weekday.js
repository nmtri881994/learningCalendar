/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import Lesson from './lesson'

class Weekday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            freeLessons: []
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

    componentWillReceiveProps(nextProps) {
        var notFreeLessons = [];
        var freeLessons = [];
        for (var i = 0; i < nextProps.lopHocs.length; i++) {
            var lopHocDetail = nextProps.lopHocs[i].lopHocDetail;
            var startLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietDauTien.ten);
            var endLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietCuoiCung.ten);
            for (var j = startLesson; j <= endLesson; j++) {
                notFreeLessons.push(j);
            }
        }
        for (var i = 1; i <= 10; i++) {
            if (notFreeLessons.indexOf(i) == -1) {
                freeLessons.push(i);
            }
        }
        this.setState({
            freeLessons: freeLessons
        });
    }

    render() {

        const trueVar = true;
        const falseVar = false;

        const oneClass = 1;
        const twoClass = 2;
        const threeClass = 3;
        const fourClass = 4;
        const fiveClass = 5;

        var lopHocs = this.props.lopHocs;
        // console.log(lopHocs);
        var lessons = [];
        var freeLessons = this.state.freeLessons;
        for (var i = 1; i <= 10; i++) {
            if (freeLessons.indexOf(i) != -1) {
                if (i < 6) {
                    lessons.push(<Lesson key={i} morning={trueVar} haveClass={falseVar}/>);
                } else {
                    lessons.push(<Lesson key={i} morning={falseVar} haveClass={falseVar}/>);
                }
            } else {
                for (var j = 0; j < lopHocs.length; j++) {
                    var lopHocDetail = lopHocs[j].lopHocDetail;
                    var startLesson = this.getTietByTenTiet(lopHocDetail.tkb_tietDauTien.ten);
                    if (startLesson == i) {
                        var lopHoc = lopHocs[j];
                        if (i < 6) {
                            lessons.push(<Lesson triggerModal={this.props.triggerModal} key={i} date={this.props.date} lopHoc={lopHoc} morning={trueVar} haveClass={trueVar}/>);
                        } else {
                            lessons.push(<Lesson triggerModal={this.props.triggerModal} key={i} date={this.props.date} lopHoc={lopHoc} morning={falseVar} haveClass={trueVar}/>);
                        }
                    }
                }
            }
        }
        return (
            <div className="weekday">
                <div className="weekday-title">
                    {this.props.name}<br/>
                    {this.props.date}
                </div>
                <div className="weekday-lessons">
                    {
                        lessons
                    }

                </div>
            </div>
        );
    }
}

export default Weekday;
