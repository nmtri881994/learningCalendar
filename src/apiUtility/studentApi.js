/**
 * Created by XuanVinh on 3/20/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/sinhvien`;

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