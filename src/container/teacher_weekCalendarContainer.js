/**
 * Created by XuanVinh on 3/20/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Teacher_WeekCalendar from '../component/teacher/teacher_weekCalendar'

const mapStatetoProps = (state, ownProps) => {
    return {
        year: state.currentLearningYear,
        weekCalendar: state.teacherWeekCalendar,
        weekNumber: state.currentWeekNumber,
        currentDay: state.currentDate,
        teacherEditLessonDetail: state.teacherEditLessonDetail,
        allLessons: state.allLessons
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
}

const SV_WeekCalendarContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Teacher_WeekCalendar)

export default SV_WeekCalendarContainer;
