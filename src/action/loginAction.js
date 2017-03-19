/**
 * Created by XuanVinh on 3/17/2017.
 */
import {LOGIN, SHOW_LOGIN_MESSAGE} from '../constant'

import * as API from '../apiUtility/LoginApi'
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

export const authenLogin = (role) => {
    API.authenticateLogined(role);
}