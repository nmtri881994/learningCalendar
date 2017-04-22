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
            khoa: null,
            khoaHoc: null
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        var classes = nextProps.classes;
        if (classes.length > 0) {
            var classes1 = [];
            var khoa = {
                maKhoa: classes[0].maKhoa
            }
            var khoaHoc = classes[0].class.khoa_khoaHoc.khoaHoc;
            classes.map(cl => {
                if (cl.registered) {
                    classes1.push(cl.class);
                }
            })
            this.setState({
                classes: classes1,
                khoa: khoa,
                khoaHoc: khoaHoc
            })
        }
    }

    render() {
        return (<div>
            <Week_Calendar khoa={this.state.khoa} khoaHoc={this.state.khoaHoc} classes={this.state.classes}/>
        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

}

export default Student_RegisteredClassCalendar;