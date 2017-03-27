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

    componentWillReceiveProps(nextProps) {
        var notFreeLessons = [];
        var freeLessons = [];
        for (var i = 0; i < nextProps.lopHocs.length; i++) {
            var lopHoc = nextProps.lopHocs[i];
            for (var j = lopHoc.startLesson; j <= lopHoc.endLesson; j++) {
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
                    if (lopHocs[j].startLesson == i) {
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
