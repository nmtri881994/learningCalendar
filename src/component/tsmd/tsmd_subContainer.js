/**
 * Created by Tri on 4/18/2017.
 */
import React, {Component} from 'react'
import TSMD_SubLesson from './tsmd_subLesson'

class TSMD_SubContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            css: "",
            lessonsArray: []
        }
    }

    arrangeLessons(lessons) {
        for (var i = 0; i < lessons.length; i++) {
            for (var j = i + 1; j < lessons.length; j++) {
                if (lessons[j].tkb.tkb_tietDauTien.thuTu < lessons[i].tkb.tkb_tietDauTien.thuTu) {
                    var temp = lessons[i];
                    lessons[i] = lessons[j];
                    lessons[j] = temp;
                }
            }
        }
    }

    componentWillMount() {
        var timeInfo = this.props.timeInfo;
        var css = "lesson-" + timeInfo.numberOfLessons + " lesson-container";
        var lessons = this.props.lessons;
        this.arrangeLessons(lessons)

        var notFreeLessons = [];

        for (var i = 0; i < lessons.length; i++) {
            for (var j = lessons[i].tkb.tkb_tietDauTien.thuTu; j <= lessons[i].tkb.tkb_tietCuoiCung.thuTu; j++) {
                notFreeLessons.push(j);
            }
        }

        var lessonsArray = [];

        for (var i = timeInfo.startLesson; i <= timeInfo.endLesson; i++) {
            var morning = false;
            if (i < 6) {
                morning = true;
            } else {
                morning = false;
            }
            var haveClass = false;
            var final = false;
            if (notFreeLessons.indexOf(i) == -1) {
                haveClass = false;
                if(i == timeInfo.endLesson){
                    final = true;
                }else{
                    final = false;
                }
                lessonsArray.push(<TSMD_SubLesson key={this.props.id+"."+i} haveClass={haveClass} morning={morning} final={final}/>);
            } else {
                haveClass = true;
                for (var j = 0; j < lessons.length; j++) {
                    if(lessons[j].tkb.tkb_tietDauTien.thuTu == i){
                        if(lessons[j].tkb.tkb_tietCuoiCung.thuTu == timeInfo.endLesson){
                            final = true;
                        }else{
                            final = false;
                        }
                        lessonsArray.push(<TSMD_SubLesson key={this.props.id+"."+i} haveClass={haveClass} morning={morning} lesson={lessons[j]} final={final}/>)
                        i = lessons[j].tkb.tkb_tietCuoiCung.thuTu;
                        break;
                    }
                }
            }
        }


        if (this.props.small) {
            css = "lesson-small " + css;
        } else {
            css = "lesson-tiny " + css;
        }

        if (this.props.final) {
            css += " lesson-column-final";
        }

        this.setState({
            css: css,
            lessonsArray: lessonsArray
        })
    }

    render() {
        return (<div className={this.state.css}>
            {this.state.lessonsArray}
        </div>)
    }

}

export default TSMD_SubContainer