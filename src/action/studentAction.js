/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR, CHECK_CAN_REGISTER, SET_CAN_REGISTER} from '../constant'

import * as API from '../apiUtility/studentApi'
import {dispatch} from '../index'

export const getCurrentWeekCalendar = (date) => {
    API.getCalendarByWeek(date, (calendar) => {
        dispatch({
            type: STUDENT_GET_CURRENT_WEEK_CALENDAR,
            weekCalendar: calendar
        })
    })
}

export const editCalendarNote = (editStudentNote, currentDate) => {
    API.editCalendarStudentNote(editStudentNote, currentDate);
}

export const checkCanRegister = () => {
    API.checkCanRegister((canRegister) => {
        dispatch({
            type: CHECK_CAN_REGISTER,
            canRegister: canRegister
        })
    })
}

export const setCanRegister = (canRegister) =>{
    dispatch({
        type: SET_CAN_REGISTER,
        canRegister: canRegister
    })
}
