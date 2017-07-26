/**
 * Created by Tri on 7/26/2017.
 */
import axios from "axios";
import {APP_URL} from "../configuration/appConfig"

const BASE_URL = `${APP_URL}/api/input-data`;

export const getAllFaculties = (cb, fcb) => {
    axios(BASE_URL + "/all-khoas", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const inputFaculty = (falcuty, cb, fcb) => {
    axios.post(BASE_URL + "/khoa", falcuty, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const editFaculty = (falcuty, cb, fcb) => {
    axios.post(BASE_URL + "/edit-khoa", falcuty, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const deleteFaculty = (facultyId, cb, fcb) => {
    axios(BASE_URL + "/delete-khoa/" + facultyId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}