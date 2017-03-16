/**
 * Created by XuanVinh on 3/17/2017.
 */
import {LOGIN} from '../constant'

import * as API from '../apiUtility/LoginApi'
import {dispatch} from '../store'

export const login = (account) => {
    API.login(account, (token) => {
        dispatch({
            type: LOGIN,
            user: account,
            token: token.token
        })
    })
}