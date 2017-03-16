/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import MainComponent from '../component/mainComponent'

const mapStatetoProps = (state, ownProps) => {
    console.log("container", state.userLogined);
    return {
        userLogined: state.userLogined
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const MainContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(MainComponent)

export default MainContainer;
