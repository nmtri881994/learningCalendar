import {createStore} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducer'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const dispatch = store.dispatch;
export const history = syncHistoryWithStore(browserHistory, store);
export default store;