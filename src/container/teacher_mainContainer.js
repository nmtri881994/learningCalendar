/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Teacher_Main from '../component/teacher/teacher_main'

const mapStatetoProps = (state, ownProps) => {
    return {
        currentUserName: state.currentUserName
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Teacher_MainContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Teacher_Main)

export default Teacher_MainContainer;
