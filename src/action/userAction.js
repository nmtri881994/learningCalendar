/**
 * Created by XuanVinh on 3/19/2017.
 */
import {GET_CURRENT_USER_NAME, CHECK_CAN_REGISTER} from '../constant'

import {dispatch} from '../index'

//Import APIs
import * as API from '../apiUtility/userApi'

export const getCurrentUserName = () =>{
    API.getCurrentUserName((userName)=>{
        dispatch({
            type: GET_CURRENT_USER_NAME,
            currentUserName: userName
        })
    })
}
