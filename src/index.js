import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//Import reducers
import {userLogined, loginMessage} from './reducer/loginReducer'
import {testContent} from './reducer/testReducer'
import {currentUserName} from './reducer/userReducer'
import {studentWeekCalendar, studentCurrentLearningYear, studentWeekNumber} from './reducer/studentReducer'

//Import components
import HomePage from './component/homePage'
// import Login from './component/login'

//Import container
import SV_MainContainer from './container/sv_mainContainer'
import LoginContainer from './container/loginContainer'
import SV_WeekCalendarContainer from './container/sv_weekCalendarContainer'

//Import CSS
require("style-loader!css-loader!./css/header.css");
require("style-loader!css-loader!./css/body.css");
require("style-loader!css-loader!./css/navSideBar.css");
require("style-loader!css-loader!./css/pagePanel.css");
require("style-loader!css-loader!./css/footer.css");
require("style-loader!css-loader!./css/calendar.css");
require("style-loader!css-loader!./css/loginForm.css");
// require("style-loader!css-loader!./css/googleForm.css");

//Import JS
// require("style-loader!./js/googleForm");
// require("./../assets/loading");

const store = createStore(
    combineReducers({
        userLogined,
        loginMessage,
        testContent,
        currentUserName,
        studentWeekCalendar,
        studentCurrentLearningYear,
        studentWeekNumber,
        routing: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const dispatch = store.dispatch;

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={LoginContainer}/>
            <Route path="sinhvien" component={SV_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={SV_WeekCalendarContainer} />
            </Route>
            <Route path="giangvien" component={SV_MainContainer}/>
            <Route path="giaovu" component={SV_MainContainer}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)