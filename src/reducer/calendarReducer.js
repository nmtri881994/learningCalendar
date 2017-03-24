/**
 * Created by Tri on 3/24/2017.
 */
import {GET_LEARNING_YEAR, GET_WEEK_NUMBER, SET_CURRENT_DATE} from '../constant'

export const currentLearningYear = (state = null, action) => {
    switch (action.type) {
        case GET_LEARNING_YEAR:
            return action.year;
        default:
            return state;
    }
}

export const currentWeekNumber = (state = 0, action) => {
    switch (action.type) {
        case GET_WEEK_NUMBER:
            return action.weekNumber;
        default:
            return state;
    }
}

export const currentDate = (state = "", action) => {
    switch (action.type){
        case SET_CURRENT_DATE:
            return action.date;
        default:
            return state;
    }
}