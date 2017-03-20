/**
 * Created by XuanVinh on 3/17/2017.
 */
import {LOGIN, SHOW_LOGIN_MESSAGE} from '../constant'

import * as API from '../apiUtility/loginApi'
import {dispatch} from '../index'

export const login = (account) => {
    API.login(account, (token) => {
        dispatch({
            type: LOGIN,
            user: account,
            token: token.token
        })
    })
}

export const showLoginMessage = (message) => {
    dispatch({
        type: SHOW_LOGIN_MESSAGE,
        message
    })
}

export const authenLogin1 = (role) => {
    API.authenticateLogined1(role);
}

export const authenLogin2 = (role) => {
    API.authenticateLogined2(role);
}

export const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    location.href = "/";
}