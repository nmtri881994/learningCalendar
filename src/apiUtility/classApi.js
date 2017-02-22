import axios from "axios";
import {APP_URL} from "../configuration/appConfig"

const BASE_URL = `${APP_URL}/api/class`;

export const getAllClass = (cb,fcb) => {
	axios(BASE_URL)
		.then(function(response){
			cb(response.data);
		})
		.catch(function(error){
			console.log(error);
		})
}