/**
 * Created by XuanVinh on 3/20/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import SV_WeekCalendar from '../component/student/sv_weekCalendar'

const mapStatetoProps = (state, ownProps) => {
    return {
        year: state.studentCurrentLearningYear,
        weekCalendar: state.studentWeekCalendar,
        weekNumber: state.studentWeekNumber,
        currentDay: state.studentCurrentDate
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
}

const SV_WeekCalendarContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(SV_WeekCalendar)

export default SV_WeekCalendarContainer;
