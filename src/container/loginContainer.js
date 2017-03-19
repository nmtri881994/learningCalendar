/**
 * Created by XuanVinh on 3/18/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import Login from '../component/login'

const mapStatetoProps = (state, ownProps) => {
    return {
        loginMessage: state.loginMessage
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const LoginContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(Login)

export default LoginContainer;
