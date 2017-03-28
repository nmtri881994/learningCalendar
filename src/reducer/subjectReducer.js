/**
 * Created by Tri on 3/28/2017.
 */

import {GET_ALL_ROOMS_OF_SUBJECT} from '../constant'

export const subjectRooms = (state = [], action) =>{
    switch (action.type){
        case GET_ALL_ROOMS_OF_SUBJECT:
            return action.rooms;
        default:
            return state;
    }
}