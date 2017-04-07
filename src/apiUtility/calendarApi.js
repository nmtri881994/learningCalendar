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
    axios(BASE_URL + "/nganhs/"+yearId+"/"+termId+"/"+facultyId+"/"+yearOfAdmissionId , {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
    $.unblockUI();
}