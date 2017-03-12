/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import Lesson from './lesson'

class Weekday extends Component{
    render(){
        const trueVar = true;
        const falseVar = false;

        const oneClass = 1;
        const twoClass = 2;
        const threeClass = 3;
        const fourClass = 4;
        const fiveClass = 5;
        return (
            <div className="weekday">
                <div className="weekday-title">
                    {this.props.name + ' (' + this.props.date+")"}
                </div>
                <div className="weekday-lessons">
                    <Lesson morning={trueVar} haveClass = {falseVar} />
                    <Lesson morning={trueVar} haveClass = {falseVar} />
                    <Lesson morning={trueVar} haveClass = {falseVar} />
                    <Lesson morning={trueVar} haveClass = {falseVar} />
                    <Lesson morning={trueVar} haveClass = {falseVar} />
                </div>
            </div>
        );
    }
}

export default Weekday;
