/**
 * Created by XuanVinh on 3/19/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

export const getCurrentUserName = (cb, fcb) =>{
    axios(APP_URL+"/api/user-name", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}