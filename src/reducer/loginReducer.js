/**
 * Created by XuanVinh on 3/17/2017.
 */
import {LOGIN, SHOW_LOGIN_MESSAGE} from '../constant'

export const userLogined = (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('token', action.token);
            localStorage.setItem('role', action.user.role);
            return action.user;
        default:
            return state;
    }
}

export const loginMessage = (state = "", action) => {
    switch (action.type){
        case SHOW_LOGIN_MESSAGE:
            return action.message;
        default:
            return state;
    }
}