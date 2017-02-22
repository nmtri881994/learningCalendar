import {GET_ALL_CLASS} from '../constant'

export const allClasses = (state = null, action) => {
    switch(action.type){
        case GET_ALL_CLASS:
            return action.classes;
        default:
            return state;
    }
}