/**
 * Created by XuanVinh on 3/20/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Student_WeekCalendar from '../component/student/student_weekCalendar'

const mapStatetoProps = (state, ownProps) => {
    return {
        year: state.currentLearningYear,
        weekCalendar: state.studentWeekCalendar,
        weekNumber: state.currentWeekNumber,
        currentDay: state.currentDate
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
}

const SV_WeekCalendarContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Student_WeekCalendar)

export default SV_WeekCalendarContainer;
