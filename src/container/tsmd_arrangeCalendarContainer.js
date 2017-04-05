/**
 * Created by Tri on 4/4/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import TSMD_ArrangeCalendar from '../component/tsmd/tsmd_arrangeCalendar'

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

const TSMD_ArrangeCalendarContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(TSMD_ArrangeCalendar)

export default TSMD_ArrangeCalendarContainer;
