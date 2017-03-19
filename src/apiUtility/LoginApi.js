/**
 * Created by XuanVinh on 3/17/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/login`;

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
            // window.document.getElementById("login-message").innerHTML("Không tìm thấy tài khoản");
            console.log(error);
            if(error.response.status == 404){
                showLoginMessage("Không tìm thấy tài khoản");
            }
        })
}