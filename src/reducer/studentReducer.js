/**
 * Created by XuanVinh on 3/20/2017.
 */
import {STUDENT_GET_CURRENT_WEEK_CALENDAR} from '../constant'

export const studentWeekCalendar = (state = null, action) => {
    switch (action.type) {
        case STUDENT_GET_CURRENT_WEEK_CALENDAR:
            return action.weekCalendar;
        default:
            return state;
    }
}
