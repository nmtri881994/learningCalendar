/**
 * Created by XuanVinh on 3/19/2017.
 */
import {GET_CURRENT_USER_NAME} from '../constant'

export const currentUserName = (state = "", action) => {
    switch (action.type){
        case GET_CURRENT_USER_NAME:
            return action.currentUserName;
        default:
            return state;
    }
}