/**
 * Created by Tri on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/calendar`;

export const getLearningYear = (date, cb) =>{
    $.blockUI(loading);
    axios(BASE_URL+"/learning-year/"+date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const getWeekNumber = (date, cb) =>{
    $.blockUI(loading);
    axios(BASE_URL+"/week-number/"+date, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}