/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import SV_MainComponent from '../component/sv_mainComponent'

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
)(SV_MainComponent)

export default SV_MainContainer;
