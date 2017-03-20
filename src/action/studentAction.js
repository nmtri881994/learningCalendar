/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR} from '../constant'

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