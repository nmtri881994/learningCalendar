import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {allClasses} from './classReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    allClasses
});

export default rootReducer;