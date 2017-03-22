/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR, GET_LEARNING_YEAR, GET_WEEK_NUMBER, SET_CURRENT_DATE} from '../constant'

export const studentWeekCalendar = (state = null, action) => {
    switch (action.type) {
        case STUDENT_GET_CURRENT_WEEK_CALENDAR:
            return action.weekCalendar;
        default:
            return state;
    }
}

export const studentCurrentLearningYear = (state = null, action) => {
    switch (action.type) {
        case GET_LEARNING_YEAR:
            return action.year;
        default:
            return state;
    }
}

export const studentWeekNumber = (state = 0, action) => {
    switch (action.type) {
        case GET_WEEK_NUMBER:
            return action.weekNumber;
        default:
            return state;
    }
}

export const studentCurrentDate = (state = "", action) => {
    switch (action.type){
        case SET_CURRENT_DATE:
            return action.date;
        default:
            return state;
    }
}