/**
 * Created by XuanVinh on 3/17/2017.
 */
import {LOGIN} from '../constant'

export const userLogined = (state = null, action) => {
    switch (action.type){
        case LOGIN:
            localStorage.setItem('token', action.token);
            alert(1);
            return action.user;
        default:
            return state;
    }
}