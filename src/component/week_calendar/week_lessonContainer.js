/**
 * Created by Tri on 4/18/2017.
 */
import React, {Component} from 'react'
import Week_SubContainer from './week_subContainer'

class Week_LessonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfLessons: 0,
            startLesson: 0,
            endLesson: 0,
            morning: false,
            css: "",
            subContainers: []
        }
    }

    componentWillReceiveProps(nextProps) {
        var numberOfLessons = nextProps.endLesson - nextProps.startLesson + 1;
        var css = "lesson-container lesson-" + numberOfLessons;
        if (nextProps.morning) {
            css = "lesson-morning " + css;
        } else {
            css = "lesson-afternoon " + css;
        }
        var subContainers = [];
        var small = false;

        var lessons = nextProps.lessons;
        var startLesson = nextProps.startLesson;
        var endLesson = nextProps.endLesson;
        var lessonGroups = [];
        for (var i = 0; i < lessons.length; i++) {
            if (lessons[i]) {
                if (lessonGroups.length == 0) {
                    var lessonGroup = [];
                    lessonGroup.push(lessons[i]);
                    // console.log(1, lessons[i]);
                    lessonGroups.push(lessonGroup);
                    delete lessons[i];
                } else {
                    // console.log(2, lessons[i]);
                    var length = lessonGroups.length;
                    var same = false;
                    for (var j = 0; j < length; j++) {
                        if(this.checkLessonCanBeInGroup(lessons[i], lessonGroups[j], startLesson, endLesson)){
                            same = true;
                            lessonGroups[j].push(lessons[i]);
                            delete lessons[j];
                        }
                    }
                    if(!same){
                        var lessonGroup = [];
                        lessonGroup.push(lessons[i]);
                        lessonGroups.push(lessonGroup);
                        delete lessons[i];
                    }
                }
            }
        }

        var timeInfo = {
            morning: nextProps.morning,
            startLesson: startLesson,
            endLesson: endLesson,
            numberOfLessons: numberOfLessons
        }

        if (lessonGroups.length == 2) {
            small = true;
            subContainers.push(<Week_SubContainer key={nextProps.id + "." + 1} id={nextProps.id + "." + 1} lessons={lessonGroups[0]} timeInfo={timeInfo}
                                                  small={small} final={false}/>);
            subContainers.push(<Week_SubContainer key={nextProps.id + "." + 2} id={nextProps.id + "." + 2} lessons={lessonGroups[1]} timeInfo={timeInfo}
                                                  small={small} final={true}/>);
        } else {
            small = false
            for (var i = 0; i < 2; i++) {
                subContainers.push(<Week_SubContainer key={nextProps.id + "." + i} id={nextProps.id + "." + i} lessons={lessonGroups[i]} timeInfo={timeInfo}
                                                      small={small} final={false}/>);
            }
            subContainers.push(<Week_SubContainer key={nextProps.id + "." + 2} id={nextProps.id + "." + i} lessons={lessonGroups[2]} timeInfo={timeInfo}
                                                  small={small} final={true}/>);
        }
        this.setState({
            css: css,
            subContainers: subContainers
        })
    }

    checkLessonCanBeInGroup(lesson, lessonGroup, startLesson, endLesson) {
        var notFreeLessons = [];
        var freeLessons = [];

        for (var i = 0; i < lessonGroup.length; i++) {
            for (var j = lessonGroup[i].tkb.tkb_tietDauTien.thuTu; j <= lessonGroup[i].tkb.tkb_tietCuoiCung.thuTu; j++) {
                notFreeLessons.push(j);
            }
        }

        for (var i = startLesson; i <= endLesson; i++) {
            if (notFreeLessons.indexOf(i) == -1) {
                freeLessons.push(i);
            }
        }

        var currentLessonArray = [];
        for (var i = lesson.tkb.tkb_tietDauTien.thuTu; i <= lesson.tkb.tkb_tietCuoiCung.thuTu; i++) {
            currentLessonArray.push(i);
        }

        return this.checkArrayContainsArray(freeLessons, currentLessonArray);
    }

    checkArrayContainsArray(motherArray, childArray) {
        for (var i = 0; i < childArray.length; i++) {
            if (motherArray.indexOf(childArray[i]) == -1) {
                return false;
            }
        }
        return true;
    }

    componentWillMount() {

        var numberOfLessons = this.props.endLesson - this.props.startLesson + 1;
        var css = "lesson-container lesson-" + numberOfLessons;
        if (this.props.morning) {
            css = "lesson-morning " + css;
        } else {
            css = "lesson-afternoon " + css;
        }
        var subContainers = [];
        var small = false;

        var lessons = this.props.lessons;
        var startLesson = this.props.startLesson;
        var endLesson = this.props.endLesson;
        var lessonGroups = [];
        for (var i = 0; i < lessons.length; i++) {
            if (lessons[i]) {
                if (lessonGroups.length == 0) {
                    var lessonGroup = [];
                    lessonGroup.push(lessons[i]);
                    // console.log(1, lessons[i]);
                    lessonGroups.push(lessonGroup);
                    delete lessons[i];
                } else {
                    // console.log(2, lessons[i]);
                    var length = lessonGroups.length;
                    var same = false;
                    for (var j = 0; j < length; j++) {
                        if(this.checkLessonCanBeInGroup(lessons[i], lessonGroups[j], startLesson, endLesson)){
                            same = true;
                            lessonGroups[j].push(lessons[i]);
                            delete lessons[j];
                        }
                    }
                    if(!same){
                        var lessonGroup = [];
                        lessonGroup.push(lessons[i]);
                        lessonGroups.push(lessonGroup);
                        delete lessons[i];
                    }
                }
            }
        }

        var timeInfo = {
            morning: this.props.morning,
            startLesson: startLesson,
            endLesson: endLesson,
            numberOfLessons: numberOfLessons
        }

        if (lessonGroups.length == 2) {
            small = true;
            subContainers.push(<Week_SubContainer key={this.props.id + "." + 1} id={this.props.id + "." + 1} lessons={lessonGroups[0]} timeInfo={timeInfo}
                                                  small={small} final={false}/>);
            subContainers.push(<Week_SubContainer key={this.props.id + "." + 2} id={this.props.id + "." + 2} lessons={lessonGroups[1]} timeInfo={timeInfo}
                                                  small={small} final={true}/>);
        } else {
            small = false
            for (var i = 0; i < 2; i++) {
                subContainers.push(<Week_SubContainer key={this.props.id + "." + i} id={this.props.id + "." + i} lessons={lessonGroups[i]} timeInfo={timeInfo}
                                                      small={small} final={false}/>);
            }
            subContainers.push(<Week_SubContainer key={this.props.id + "." + 2} id={this.props.id + "." + i} lessons={lessonGroups[2]} timeInfo={timeInfo}
                                                  small={small} final={true}/>);
        }
        this.setState({
            css: css,
            subContainers: subContainers
        })
    }

    render() {

        var subContainers = this.state.subContainers;

        return (<div className={this.state.css}>
            {subContainers}
        </div>)
    }
}

export default Week_LessonContainer