/**
 * Created by Tri on 4/21/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Student_RegisterSubjectClass from '../component/student/student_registerSubjectClass'

const mapStatetoProps = (state, ownProps) => {
    return {
        canRegister: state.canRegister
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Student_RegisterSubjectClassContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Student_RegisterSubjectClass)

export default Student_RegisterSubjectClassContainer;