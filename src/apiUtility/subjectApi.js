/**
 * Created by Tri on 3/28/2017.
 */
import axios from "axios";
import {APP_URL} from "../configuration/appConfig"

export const getAllRoomOfSubject = (subjectId, cb) => {
    axios(APP_URL+"/api/monhoc/"+subjectId)
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}