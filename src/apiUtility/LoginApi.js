/**
 * Created by XuanVinh on 3/17/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/login`;

export const login = (account, cb) =>{
    axios.post(BASE_URL, account)
        .then(function (response) {
            cb(response.data);
            location.href = '/main';
        })
        .catch(function (error) {
            console.log(error);
        })
}