/**
 * Created by Tri on 3/28/2017.
 */
import {GET_ALL_ROOMS_OF_SUBJECT} from '../constant'
import * as API from '../apiUtility/subjectApi'
import {dispatch} from '../index'

export const getAllRoomsBySubject = (subjectId) => {
    API.getAllRoomOfSubject(subjectId, (rooms) => {
        dispatch({
            type: GET_ALL_ROOMS_OF_SUBJECT,
            rooms: rooms
        })
    })
}
