import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {allClasses} from './classReducer'
import {userLogined} from './loginReducer'
import {testContent} from './testReducer'
const rootReducer = combineReducers({
    routing: routerReducer,
    allClasses,
    userLogined,
    testContent
});

export default rootReducer;