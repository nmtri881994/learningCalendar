/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR, CHECK_CAN_REGISTER, SET_CAN_REGISTER} from '../constant'

export const studentWeekCalendar = (state = null, action) => {
    switch (action.type) {
        case STUDENT_GET_CURRENT_WEEK_CALENDAR:
            return action.weekCalendar;
        default:
            return state;
    }
}

export const canRegister = (state = false, action) => {
    switch (action.type){
        case CHECK_CAN_REGISTER:
            return action.canRegister;
        case SET_CAN_REGISTER:
            return action.canRegister;
        default:
            return state;
    }
}

