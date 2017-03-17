/**
 * Created by XuanVinh on 3/17/2017.
 */
import {TEST} from '../constant'

export const testContent = (state = [], action) => {
    switch (action.type){
        case TEST:
            return action.testContent;
        default:
            return state;
    }
}