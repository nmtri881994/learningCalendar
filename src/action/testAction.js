/**
 * Created by XuanVinh on 3/17/2017.
 */
import {TEST} from '../constant'

import {dispatch} from '../index'

export const test = () => {
    dispatch({
        type: TEST,
        testContent: "123"
    })
}