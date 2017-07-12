/**
 * Created by Tri on 7/9/2017.
 */
import React, {Component} from 'react'
import {APP_URL} from '../../configuration/appConfig'

//Import components
import Week_Calendar from '../week_calendar/week_calendar'

//Import APIS
import * as API from '../../apiUtility/teacherApi'

class Teacher_PrintCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semesterYear: {},
            classes: [],
            teacherId: 0
        }
    }

    componentWillMount() {
        API.getCurrentSemesterCalendar((classes) => {
            var classes1 = [];
            classes.map(cl => {
                classes1.push({
                    class: cl
                })
            });
            API.getCurrentSemesterYear((semesterYear) => {
                API.getTeacherId((teacherId)=>{
                    this.setState({
                        semesterYear: semesterYear,
                        classes: classes1,
                        teacherId: teacherId
                    })
                }, (error)=>{
                    console.log(error);
                })

            }, error => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    exportExcel() {
        API.printCalendar((inputStream) => {
            console.log(inputStream);
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        var url = `${APP_URL}/api/giaovien/calendar/print/`+this.state.teacherId;
        var semesterYear = this.state.semesterYear;
        return (<div className="text-center">
            {semesterYear.tkb_namHoc != null ? "Năm học " + semesterYear.tkb_namHoc.name + " - " + semesterYear.tkb_kiHoc.ten : ""}
            <a href={url} target="_blank" >
                <button className="ok-button margin-left-20">
                <span className="margin-left-20 margin-right-20">
                    <i className="fa fa-print margin-right-20" aria-hidden="true"/>In
                </span>
                </button>
            </a><Week_Calendar classes={this.state.classes}/>
        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export  default Teacher_PrintCalendar