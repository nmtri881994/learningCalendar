/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/giaovien`;

//import actions
// import {getCurrentWeekCalendar} from '../action/teacherAction'
import {getLearningYear, getWeekNumber} from '../action/calendarAction'

export const getCalendarByWeek = (date, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/week/" + date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getLessonDetail = (lessonId, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/lesson/" + lessonId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const editLesson = (lessonDetail, currentDate) =>{
    $.blockUI(loading);
    axios.post(BASE_URL+"/edit/lesson", lessonDetail, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            this.getCurrentWeekCalendar(currentDate);
            // getWeekNumber(currentDate);
            // getLearningYear(currentDate);
            var modal = $("#myModal");
            modal[0].style.display = "none";
        })
        .catch(function (error) {
            console.log(error)
        })
    $.unblockUI();
}
