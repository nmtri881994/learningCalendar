/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import TSMD_Lesson from './tsmd_lesson'
import TSMD_LessonContainer from './tsmd_lessonContainer'
class TSMD_Weekday extends Component {

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
        if (nextProps.lopHocs) {
            var notFreeLessons = [];
            var freeLessons = [];
            for (var i = 0; i < nextProps.lopHocs.length; i++) {
                var lopHoc = nextProps.lopHocs[i];
                var startLesson = this.getTietByTenTiet(lopHoc.tkb.tkb_tietDauTien.ten);
                var endLesson = this.getTietByTenTiet(lopHoc.tkb.tkb_tietCuoiCung.ten);
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
    }

    checkContainer(lopHoc, lopHocs) {

        for (var i = 0; i < lopHocs.length; i++) {
            if (lopHoc != lopHocs[i]) {
                var condition1 = lopHocs[i].tkb.tkb_tietCuoiCung.thuTu < lopHoc.tkb.tkb_tietDauTien.thuTu;
                var condition2 = lopHocs[i].tkb.tkb_tietDauTien.thuTu > lopHoc.tkb.tkb_tietCuoiCung.thuTu;
                if (!(condition1 || condition2)) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {

        var lopHocs = this.props.lopHocs;

        var lessons = [];
        var freeLessons = this.state.freeLessons;
        var haveClass = false;
        var morning = false;
        if (lopHocs) {
            for (var i = 1; i <= 10; i++) {
                if (freeLessons.indexOf(i) != -1) {
                    haveClass = false;
                    if (i < 6) {
                        morning = true;
                    } else {
                        morning = false;
                    }
                    lessons.push(<TSMD_Lesson key={i} morning={morning} haveClass={haveClass}/>);
                } else {
                    for (var j = 0; j < lopHocs.length; j++) {
                        var lopHoc = lopHocs[j];
                        if (lopHoc) {
                            var startLesson = this.getTietByTenTiet(lopHoc.tkb.tkb_tietDauTien.ten);
                            haveClass = true;
                            if (startLesson == i) {
                                if (i < 6) {
                                    morning = true;
                                } else {
                                    morning = false;
                                }

                                var container = this.checkContainer(lopHoc, lopHocs);
                                if (container) {
                                    var containerLessons = [];
                                    containerLessons.push(lopHoc);
                                    var startLessonOfContainer = lopHoc.tkb.tkb_tietDauTien.thuTu;
                                    var endLessonOfContainer = lopHoc.tkb.tkb_tietDauTien.thuTu;


                                    for (var m = 0; m < lopHocs.length; m++) {
                                        if (lopHoc != lopHocs[m]) {
                                            var condition1 = lopHocs[m].tkb.tkb_tietCuoiCung.thuTu < startLesson;
                                            var condition2 = lopHocs[m].tkb.tkb_tietDauTien.thuTu > endLessonOfContainer;

                                            if (!(condition1 || condition2)) {
                                                containerLessons.push(lopHocs[m]);
                                                if (lopHocs[m].tkb.tkb_tietDauTien.thuTu < startLessonOfContainer) {
                                                    startLessonOfContainer = lopHocs[m].tkb.tkb_tietDauTien.thuTu;
                                                }

                                                if (lopHocs[m].tkb.tkb_tietCuoiCung.thuTu > endLessonOfContainer) {
                                                    endLessonOfContainer = lopHocs[m].tkb.tkb_tietCuoiCung.thuTu
                                                }
                                                delete lopHocs[m];
                                            }
                                        }
                                    }

                                    for (var m = 0; m < lopHocs.length; m++) {
                                        if (lopHocs[m] && lopHoc!=lopHocs[m]) {
                                            if (lopHocs[m].tkb.tkb_tietDauTien.thuTu >= startLessonOfContainer && lopHocs[m].tkb.tkb_tietCuoiCung.thuTu <= endLessonOfContainer) {
                                                containerLessons.push(lopHocs[m]);
                                                delete lopHocs[m];
                                            }
                                        }
                                    }
                                    lessons.push(<TSMD_LessonContainer key={i} id={i} morning={morning}
                                                                       startLesson={startLessonOfContainer}
                                                                       endLesson={endLessonOfContainer}
                                                                       lessons={containerLessons}/>)
                                    i = endLessonOfContainer;
                                } else {
                                    lessons.push(<TSMD_Lesson triggerModal={this.props.triggerModal} key={i}
                                                              date={this.props.date} lopHoc={lopHoc} morning={morning}
                                                              haveClass={haveClass}/>);
                                    i = lopHoc.tkb.tkb_tietCuoiCung.thuTu;
                                }
                                delete lopHocs[j];
                            }
                        }
                    }
                }
            }
        } else {
            haveClass = false
            for (var i = 1; i <= 10; i++) {
                if (i < 6) {
                    morning = true;
                } else {
                    morning = false;
                }
                lessons.push(<TSMD_Lesson key={i} morning={morning} haveClass={haveClass}/>);
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

export default TSMD_Weekday;
