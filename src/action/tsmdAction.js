/**
 * Created by Tri on 3/24/2017.
 */
import {TSMD_GET_YEARS_NOT_END, TSMD_GET_SEMESTERS_NOT_END} from '../constant'

import * as API from '../apiUtility/tsmdApi'
import {dispatch} from '../index'

export const getYearsNotEnd = () => {
    API.getYearsNotEnd((years) => {
        dispatch({
            type: TSMD_GET_YEARS_NOT_END,
            years: years
        })
    })
}

export const getSemestersNotEndOfYear = (yearId) => {
    API.getSemestersNotEndOfYear(yearId, (semesters) => {
        dispatch({
            type: TSMD_GET_SEMESTERS_NOT_END,
            semesters: semesters
        })
    })
}
