/**
 * Created by XuanVinh on 3/17/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/authen/login`;

const AUTHEN_URL = `${APP_URL}/api/`;

//Import action
import {showLoginMessage} from '../action/loginAction'

export const login = (account, cb) => {
    axios.post(BASE_URL, account)
        .then(function (response) {
            cb(response.data);
            if (account.role == "sinh_vien") {
                location.href = "/sinhvien"
            } else if (account.role == "giang_vien") {
                location.href = "/giangvien"
            } else if (account.role == "giao_vu") {
                location.href = "/giaovu"
            }

        })
        .catch(function (error) {
            console.log(error);
            if(error.response.status == 404){
                showLoginMessage("Không tìm thấy tài khoản");
            }
        })
}

export const authenticateLogined = (role, cb, fcb) =>{
    if(role == "sinh_vien"){
        axios(AUTHEN_URL+"sinhvien-authen", {headers: { Authorization: localStorage.getItem('token')}})
            .then(function (response) {
                location.href = "/sinhvien"
            })
            .catch(function (error) {
                console.log(error);
            })
    }else if (role == "giang_vien"){
        axios(AUTHEN_URL+"giangvien-authen", {headers: { Authorization: localStorage.getItem('token')}})
            .then(function (response) {
                location.href = "/giangvien"
            })
            .catch(function (error) {
                console.log(error);
            })
    }else if (role == "giao_vu"){
        axios(AUTHEN_URL+"giaovu-authen", {headers: { Authorization: localStorage.getItem('token')}})
            .then(function (response) {
                location.href = "/giaovu"
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}