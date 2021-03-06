/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/giaovien`;
const CALENDAR_URL = `${APP_URL}/api/calendar`

//import actions
import {getCurrentWeekCalendar} from '../action/teacherAction'
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

export const editLesson = (lessonDetail, currentDate) => {
    $.blockUI(loading);
    axios.post(BASE_URL + "/edit/lesson", lessonDetail, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            getCurrentWeekCalendar(currentDate);
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

export const getAvailableLessonsOfRoomByDate = (lessonId, roomId, date, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/available-lessons/" + lessonId + "/" + roomId + "/" + date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error)
        })
    $.unblockUI();
}

export const getStudentsOfLesson = (lessonId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/students/" + lessonId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getLessonCheckAttendanceHistory = (lessonId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/diem-danh/" + lessonId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const updatePresentStatus = (lessonId, studentId, status) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/diem-danh/" + lessonId +"/"+studentId+"/"+status, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getCurrentSemesterCalendar = (cb, fcb) => {
    axios(BASE_URL+"/calendar/current-week-calendar", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const getCurrentSemesterYear = (cb, fcb) => {
    axios(BASE_URL+"/calendar/current-semester-year", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const getTeacherId = (cb, fcb) => {
    axios(BASE_URL+"/get-teacher-id", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}