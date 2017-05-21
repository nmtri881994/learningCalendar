/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/giaovu`;

//import actions

export const getYearsNotEnd = (cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/year-not-end", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getSemestersNotEndOfYear = (yearId, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/" + yearId + "/semester-not-end", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const updateWeekCalendar = (calendar, yearId, termId, facultyId, yearOfAdmissionId, majorId, cb, fcb) => {
    $.blockUI(loading);
    axios.post(BASE_URL + "/edit-calendar/" + yearId + "/" + termId + "/" + facultyId + "/" + yearOfAdmissionId + "/" + majorId, calendar, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const addWeekCalendar = (calendar, classId, yearId, termId, facultyId, yearOfAdmissionId, majorId, cb, fcb) => {
    $.blockUI(loading);
    axios.post(BASE_URL + "/add-calendar/" + classId + "/" + yearId + "/" + termId + "/" + facultyId + "/" + yearOfAdmissionId + "/" + majorId, calendar, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const deleteWeekCalendar = (calendarId, cb, fcb) => {
    $.blockUI(loading);
    axios.delete(BASE_URL + "/delete-calendar/" + calendarId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getKhoas = (yearId, termId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/all-khoa-khoahoc/" + yearId + "/" + termId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const openRegistering = (registerTimeId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/open-registering/" + registerTimeId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function () {
            cb();
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const closeRegistering = (registerTimeId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/close-registering/" + registerTimeId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const autoCalendar = (setting, cb, fcb) => {
    $.blockUI(loading);
    axios.post(BASE_URL + "/generate-random-calendar/", setting,{headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getAllConditions = (cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/generate-calendar/all-conditions", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const deleteAllCalendar = (semesterId, yearId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/delete-all-calendars/"+semesterId+"/"+yearId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}