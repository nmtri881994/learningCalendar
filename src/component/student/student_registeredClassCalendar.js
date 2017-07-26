/**
 * Created by XuanVinh on 4/22/2017.
 */
import React, {Component} from 'react'

//import components
import Week_Calendar from '../week_calendar/week_calendar'

class Student_RegisteredClassCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        var classes = nextProps.classes;
        if (classes.length > 0) {
            var classes1 = [];

            classes.map(cl => {
                if (cl.registered) {
                    classes1.push(cl);
                }
            })
            this.setState({
                classes: classes1,
            })
        }
    }

    render() {
        return (<div>
            <Week_Calendar classes={this.state.classes}/>
        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

}

export default Student_RegisteredClassCalendar;