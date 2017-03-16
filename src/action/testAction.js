/**
 * Created by XuanVinh on 3/17/2017.
 */
import {TEST} from '../constant'

import {dispatch} from '../store'

export const test = () => {
    alert(1);
    dispatch({
        type: TEST,
        testContent: "123"
    })
}