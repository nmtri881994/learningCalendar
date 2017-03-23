/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import SV_Main from '../component/student/sv_main'

const mapStatetoProps = (state, ownProps) => {
    return {
        currentUserName: state.currentUserName
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const SV_MainContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(SV_Main)

export default SV_MainContainer;
