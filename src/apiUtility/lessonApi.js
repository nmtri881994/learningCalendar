/**
 * Created by XuanVinh on 3/28/2017.
 */
import axios from "axios";
import {APP_URL} from "../configuration/appConfig"

export const getAllLesson = (cb) => {
    axios(APP_URL+"/api/tiet")
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}