/**
 * Created by Tri on 3/24/2017.
 */
import {GET_LEARNING_YEAR, GET_WEEK_NUMBER, SET_CURRENT_DATE} from '../constant'

import * as API from '../apiUtility/CalendarApi'
import {dispatch} from '../index'

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

export const setCurrentDate = (date) => {
    dispatch({
        type: SET_CURRENT_DATE,
        date: date
    })
}