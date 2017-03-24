/**
 * Created by Tri on 3/24/2017.
 */
import {TEACHER_GET_WEEK_CALENDAR} from '../constant'

import * as API from '../apiUtility/teacherApi'
import {dispatch} from '../index'

export const getCurrentWeekCalendar = (date) => {
    API.getCalendarByWeek(date, (calendar) => {
        dispatch({
            type: TEACHER_GET_WEEK_CALENDAR,
            weekCalendar: calendar
        })
    })
}

