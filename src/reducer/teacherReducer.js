/**
 * Created by Tri on 3/24/2017.
 */
import {TEACHER_GET_WEEK_CALENDAR} from '../constant'

export const teacherWeekCalendar = (state = null, action) => {
    switch (action.type) {
        case TEACHER_GET_WEEK_CALENDAR:
            return action.weekCalendar;
        default:
            return state;
    }
}
