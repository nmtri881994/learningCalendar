/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/giaovu`;
const CALENDAR_URL = `${APP_URL}/api/calendar`

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

export const getSemestersNotEndOfYear = (yearId, cb) =>{
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/"+yearId+"/semester-not-end", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}