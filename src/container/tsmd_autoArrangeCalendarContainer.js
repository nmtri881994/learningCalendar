/**
 * Created by Tri on 4/4/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import TSMD_AutoArrangeCalendar from '../component/tsmd/tsmd_autoArrangeCalendar'

const mapStatetoProps = (state, ownProps) => {
    return {
        years: state.yearsNotEnd,
        semesters: state.semestersNotEnd
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const TSMD_AutoArrangeCalendarContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(TSMD_AutoArrangeCalendar)

export default TSMD_AutoArrangeCalendarContainer;
