/**
 * Created by XuanVinh on 4/27/2017.
 */
import React, {Component} from 'react'

class Mini_Lessons extends Component{
    constructor(props){
        super(props);

        this.state = {
            availableLessons: [],
            minilessons: []
        }

        this.choosetLesson = this.choosetLesson.bind(this);
        this.resetLesson = this.resetLesson.bind(this);
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        var availableLessons = nextProps.availableLessons;
        if(availableLessons.length > 0){
            var startLessonsId= nextProps.startLessonId;
            var endLessonId = nextProps.endLessonId;

            var chosenLessons = [];
            if(endLessonId > startLessonsId){
                for(var i = startLessonsId; i<= endLessonId; i++){
                    chosenLessons.push(i);
                }
            }else{
                if(startLessonsId > 0){
                    chosenLessons.push(startLessonsId);
                }
            }
            var thuTu = [];
            availableLessons.map(availableLesson => thuTu.push(availableLesson.thuTu));
            var minilessons = [];
            for(var i = 1; i<=10; i++){
                if(thuTu.indexOf(i) == -1){
                    minilessons.push(<div key={i} onClick={this.choosetLesson.bind(null, i)} className="mini-lesson cursor lesson-disabled">{i}</div>)
                }else{
                    if(chosenLessons.indexOf(i) == -1){
                        minilessons.push(<div key={i} onClick={this.choosetLesson.bind(null, i)} className="mini-lesson cursor half-dim">{i}</div>)
                    }else{
                        minilessons.push(<div key={i} onClick={this.choosetLesson.bind(null, i)} className="mini-lesson cursor lesson-chosen">{i}</div>)
                    }
                }
            }
            this.setState({
                availableLessons: availableLessons,
                minilessons: minilessons
            })
        }
    }

    choosetLesson(i){
        this.props.choseLesson(i);
    }

    resetLesson(){
        this.props.resetLesson();
    }

    render(){
        return(<div className="mini-lessons">
            {this.state.minilessons}
            <button onClick={this.resetLesson} className="reset-btn">Reset</button>
        </div>)
    }

    componentDidMount(){

    }

    componentDidUpdate(){
    }

}

export default Mini_Lessons;