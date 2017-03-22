/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'

class Lesson extends Component{
    constructor(props){
        super(props);

    }


    render(){

        var lopHoc = this.props.lopHoc;
        var subjectName = "";
        var numberOfLesson = 0;
        var type = "";
        if(lopHoc){
            subjectName = lopHoc.name;
            numberOfLesson = lopHoc.endLesson - lopHoc.startLesson +1;
            type = lopHoc.type;
        }
        var css = "lesson";

        if(this.props.morning){
            css += "-morning"
        }else{
            css += "-afternoon"
        }

        if(this.props.haveClass){
            css = "lesson-"+numberOfLesson+" " + css + "-"+ numberOfLesson;
        }

        if(type == "Thực hành"){
            css += " thuc-hanh";
        }
        if(type == "Lý thuyết"){
            css += " ly-thuyet";
        }

        return (
            <div className={css}>
                {subjectName} <br/>
                {type}
            </div>
        );
    }
}

export default Lesson;