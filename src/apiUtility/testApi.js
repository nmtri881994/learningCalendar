/**
 * Created by XuanVinh on 3/24/2017.
 */
import axios from "axios";
import {APP_URL} from '../configuration/appConfig'

const BASE_URL = `${APP_URL}/api/test/chat`;

export const sendChat = (chatMess, cb) => {
    console.log("sending message")
    axios.post(BASE_URL, chatMess)
        .then(function (response) {
            console.log("send successfully");
            console.log(response);
        })
        .catch(function (error) {
            console.log("send failed");
            console.log(error);
        })
}