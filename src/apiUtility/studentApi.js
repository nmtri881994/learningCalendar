/**
 * Created by XuanVinh on 3/20/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/sinhvien`;

//import actions
import {getCurrentWeekCalendar} from '../action/studentAction'

export const getCalendarByWeek = (date, cb) =>{
    $.blockUI(loading);
    axios(BASE_URL+"/calendar/week/"+date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getCalendarStudentNote = (lessonId, cb) =>{
    $.blockUI(loading);
    axios(BASE_URL+"/calendar/note/"+lessonId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const editCalendarStudentNote = (editStudentNote, currentDate, cb) =>{
    axios.post(BASE_URL+"/calendar/note/edit", editStudentNote,{headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            getCurrentWeekCalendar(currentDate);
            var modal = $("#myModal");
            modal[0].style.display = "none";
        })
        .catch(function (error) {
            console.log(error);
        })
}
