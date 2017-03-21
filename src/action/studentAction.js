/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR, GET_LEARNING_YEAR, GET_WEEK_NUMBER} from '../constant'

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

export const getLearningYear = (date) => {
    API.getLearningYear(date, (year) => {
        dispatch({
            type: GET_LEARNING_YEAR,
            year: year
        })
    })
}

export const getWeekNumber = (date) => {
    API.getWeekNumber(date, (weekNumber) => {
        dispatch({
            type: GET_WEEK_NUMBER,
            weekNumber: weekNumber
        })
    })
}