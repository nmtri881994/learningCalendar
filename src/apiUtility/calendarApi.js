/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/calendar`;

export const getLearningYear = (date, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/learning-year/" + date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getWeekNumber = (date, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/week-number/" + date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getAllFaculties = (cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/khoas", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getAvailableYearOfAdmissions = (facultyId, yearId, termId, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/" + facultyId + "/khoa-hoc-not-end/" + yearId + "/" + termId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getAvailableMajors = (yearId, termId, facultyId, yearOfAdmissionId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/nganhs/" + yearId + "/" + termId + "/" + facultyId + "/" + yearOfAdmissionId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getClasses = (yearId, termId, facultyId, yearOfAdmissionId, majorId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/lopMonHocs/" + yearId + "/" + termId + "/" + facultyId + "/" + yearOfAdmissionId + "/" + majorId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getThus = (cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/thus", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getWeekCalendarOfClass = (classId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/lich-hoc-theo-tuan/" + classId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getClassType = (classId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/loai-lop/" + classId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getRoomTypes = (cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/day-nha/", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getRooms = (classId, roomTypeID, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/giang-duong/" + classId + "/" + roomTypeID, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getAvailableLessons = (classId, weekCalendarId, weekDayId, roomId, startWeek, endWeek, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/tkb-tuan/tiets-free/" + classId + "/" + weekCalendarId + "/" + weekDayId + "/" + roomId + "/" + startWeek + "/" + endWeek, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}

export const getTermWeekTime = (termId, yearId, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/term/week-time/" + termId + "/" + yearId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}