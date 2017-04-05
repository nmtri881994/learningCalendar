/**
 * Created by Tri on 3/24/2017.
 */
import {TSMD_GET_YEARS_NOT_END, TSMD_GET_SEMESTERS_NOT_END} from '../constant'

export const yearsNotEnd = (state = [], action) => {
    switch (action.type){
        case TSMD_GET_YEARS_NOT_END:
            return action.years;
        default:
            return state;
    }
}

export const semestersNotEnd = (state = [], action) => {
    switch (action.type){
        case TSMD_GET_SEMESTERS_NOT_END:
            return action.semesters;
        default:
            return state;
    }
}