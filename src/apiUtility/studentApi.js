/**
 * Created by XuanVinh on 3/20/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/sinhvien`;

//import actions
import {getCurrentWeekCalendar} from '../action/studentAction'

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

export const getCalendarStudentNote = (lessonId, cb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/calendar/note/" + lessonId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    $.unblockUI();
}

export const editCalendarStudentNote = (editStudentNote, currentDate, cb) => {
    axios.post(BASE_URL + "/calendar/note/edit", editStudentNote, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            getCurrentWeekCalendar(currentDate);
            var modal = $("#myModal");
            modal[0].style.display = "none";
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getStudentRegisterTimes = (cb, fcb) => {
    axios(APP_URL + "/api/sinh-vien/register-times", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const checkCanRegister = (cb, fcb) => {
    axios(APP_URL + "/api/sinh-vien/register-times", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            var canRegister = false;
            var registerTimeId = 0;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].status) {
                    canRegister = true;
                    registerTimeId = response.data[i].id;
                    break;
                }
            }
            cb({
                canRegister: canRegister,
                registerTimeId: registerTimeId
            });
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getRegisterTimeByRegisterTimeId = (registerTimeId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/register-time/" + registerTimeId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const getClassesCanRegister = (registerTimeId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/register/classes/" + registerTimeId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            var classes = response.data;
            var index = 1;
            var classes1 = [];
            classes.map(cl => {
                getFacultyCode(cl.khoa_khoaHoc.id, (maKhoa) => {
                    getClassCurrentQuantity(cl.id, (quantity) => {
                        checkRegistered(cl.id, (registered) =>{
                            classes1.push({
                                class: cl,
                                index: index,
                                maKhoa: maKhoa,
                                quantity: quantity,
                                registered: registered
                            });
                            if (classes1.length == classes.length) {
                                cb(classes1);
                            }
                        }, (error)=> {
                            console.log(error);
                        })
                    }, (error) => {
                        console.log(error);
                    })
                }, (error) => {
                    console.log(error);
                })
                index++;
            });
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const getFacultyCode = (khoa_khoaHocId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/ma-khoa/" + khoa_khoaHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const getClassCurrentQuantity = (classId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/register/" + classId + "/quantity", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const checkRegistered = (classId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/check-registered/" + classId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}


export const registerClass = (classId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/register/" + classId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}

export const cancelRegisterClass = (classId, cb, fcb) => {
    axios(APP_URL + "/api/sinhvien/calendar/cancel-register/" + classId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error);
        })
}