/**
 * Created by XuanVinh on 3/28/2017.
 */
import {GET_ALL_CLASS} from '../constant'
import * as API from '../apiUtility/lessonApi'
import {dispatch} from '../index'

export const getAllLesson = () => {
    API.getAllLesson((lessons) => {
        dispatch({
            type: GET_ALL_CLASS,
            lessons: lessons
        })
    })
}