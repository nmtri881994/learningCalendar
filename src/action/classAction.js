import {GET_ALL_CLASS} from '../constant'
import * as API from '../apiUtility/classApi'
import {dispatch} from '../store'

export const getAllClasses = () => {
    API.getAllClass(
        (classes) => {
            dispatch({
                type: GET_ALL_CLASS,
                classes: classes
            })
        }
    )
}