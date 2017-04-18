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
            lessons: []
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
            var lopHocs = nextProps.lopHocs;
            var notFreeLessons = [];
            var freeLessons = [];
            for (var i = 0; i < lopHocs.length; i++) {
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

            var lessons = [];
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
                            var lopHoc1 = lopHocs[j];
                            if (lopHoc1) {
                                var startLesson1 = this.getTietByTenTiet(lopHoc1.tkb.tkb_tietDauTien.ten);
                                haveClass = true;
                                if (startLesson1 == i) {
                                    if (i < 6) {
                                        morning = true;
                                    } else {
                                        morning = false;
                                    }
                                    var container = this.checkContainer(lopHoc1, lopHocs);
                                    if (container) {
                                        var containerLessons = [];
                                        containerLessons.push(lopHoc1);
                                        var startLessonOfContainer = lopHoc1.tkb.tkb_tietDauTien.thuTu;
                                        var endLessonOfContainer = lopHoc1.tkb.tkb_tietCuoiCung.thuTu;


                                        for (var m = 0; m < lopHocs.length; m++) {
                                            if (lopHoc1 != lopHocs[m]) {
                                                var condition1 = lopHocs[m].tkb.tkb_tietCuoiCung.thuTu < startLesson1;
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
                                            if (lopHocs[m] && lopHoc1 != lopHocs[m]) {
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
                                        // i = endLessonOfContainer;
                                    } else {
                                        lessons.push(<TSMD_Lesson key={i} lopHoc={lopHoc1}
                                                                  morning={morning}
                                                                  haveClass={haveClass}/>);
                                        // i = lopHoc.tkb.tkb_tietCuoiCung.thuTu;
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

            this.setState({
                // freeLessons: freeLessons
                lessons: lessons
            });
        }
    }

    checkContainer(lopHoc, lopHocs) {

        for (var i = 0; i < lopHocs.length; i++) {
            if (lopHocs[i]) {
                if (lopHoc != lopHocs[i]) {
                    var condition1 = lopHocs[i].tkb.tkb_tietCuoiCung.thuTu < lopHoc.tkb.tkb_tietDauTien.thuTu;
                    var condition2 = lopHocs[i].tkb.tkb_tietDauTien.thuTu > lopHoc.tkb.tkb_tietCuoiCung.thuTu;
                    if (!(condition1 || condition2)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    render() {

        var lessons = this.state.lessons;
        if (lessons.length == 0) {
            for (var i = 0; i < 10; i++) {
                if (i < 6) {
                    lessons.push(<TSMD_Lesson key={i}
                                              morning={true}
                                              haveClass={false}/>)
                } else {
                    lessons.push(<TSMD_Lesson key={i}
                                              morning={false}
                                              haveClass={false}/>)
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
                        this.state.lessons
                    }

                </div>
            </div>
        );
    }
}

export default TSMD_Weekday;
