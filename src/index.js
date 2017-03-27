import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

//Import reducers
import {userLogined, loginMessage} from './reducer/loginReducer'
import {testContent} from './reducer/testReducer'
import {currentUserName} from './reducer/userReducer'
import {studentWeekCalendar} from './reducer/studentReducer'
import {currentLearningYear, currentWeekNumber, currentDate} from './reducer/calendarReducer'
import {teacherWeekCalendar} from './reducer/teacherReducer'
//Import components
// import HomePage from './component/homePage'
// import Login from './component/login'
import SystemChat from './component/systemChat'

//Import container
import LoginContainer from './container/loginContainer'
import Student_MainContainer from './container/student_mainContainer'
import Student_WeekCalendarContainer from './container/student_weekCalendarContainer'


import Teacher_MainContainer from './container/teacher_mainContainer'
import Teacher_WeekCalendarContainer from './container/teacher_weekCalendarContainer'

//Import CSS
require("style-loader!css-loader!./css/header.css");
require("style-loader!css-loader!./css/body.css");
require("style-loader!css-loader!./css/navSideBar.css");
require("style-loader!css-loader!./css/pagePanel.css");
require("style-loader!css-loader!./css/footer.css");
require("style-loader!css-loader!./css/calendar.css");
require("style-loader!css-loader!./css/loginForm.css");
require("style-loader!css-loader!./css/modal.css");
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
        currentLearningYear,
        currentWeekNumber,
        currentDate,
        teacherWeekCalendar,
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
            <Route path="sinhvien" component={Student_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={Student_WeekCalendarContainer}/>
                <Route path="system-chat" component={SystemChat}/>
            </Route>
            <Route path="giangvien" component={Teacher_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={Teacher_WeekCalendarContainer}/>
                <Route path="system-chat" component={SystemChat}/>
            </Route>
            <Route path="giaovu" component={Student_MainContainer}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)