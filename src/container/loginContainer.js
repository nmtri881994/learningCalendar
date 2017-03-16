/**
 * Created by XuanVinh on 3/17/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Login from '../component/login'

const mapStatetoProps = (state, ownProps) => {
    console.log("container", state.userLogined);
    return {
        userLogined: state.userLogined
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const LoginContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Login)

export default LoginContainer;
