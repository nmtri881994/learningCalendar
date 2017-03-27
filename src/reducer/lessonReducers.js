/**
 * Created by XuanVinh on 3/28/2017.
 */
import {GET_ALL_CLASS} from '../constant'
export const allLessons = (state = null, action) => {
    switch (action.type){
        case GET_ALL_CLASS:
            return action.lessons;
        default:
            return state;
    }
}