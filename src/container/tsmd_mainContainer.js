/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import TSMD_Main from '../component/tsmd/tsmd_main'

const mapStatetoProps = (state, ownProps) => {
    return {
        currentUserName: state.currentUserName
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const TSMD_MainContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(TSMD_Main)

export default TSMD_MainContainer;
