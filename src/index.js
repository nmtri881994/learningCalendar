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
import {studentWeekCalendar, canRegister} from './reducer/studentReducer'
import {currentLearningYear, currentWeekNumber, currentDate} from './reducer/calendarReducer'
import {teacherWeekCalendar, teacherEditLessonDetail} from './reducer/teacherReducer'
import {allLessons} from './reducer/lessonReducers'
import {subjectRooms} from './reducer/subjectReducer'
import {yearsNotEnd, semestersNotEnd} from './reducer/tsmdReducer'
//Import components
// import HomePage from './component/homePage'
// import Login from './component/login'
import CalendarNewStyle from './component/test/CalendarNewStyle'
import SystemChat from './component/systemChat'
import TSMD_OpenRegisteringTime from './component/tsmd/tsmd_openRegisteringTime'

//Import container
import LoginContainer from './container/loginContainer'
import Student_MainContainer from './container/student_mainContainer'
import Student_WeekCalendarContainer from './container/student_weekCalendarContainer'
import Student_RegisterSubjectClassContainer from './container/student_registerSubjectClassContainer'

import Teacher_MainContainer from './container/teacher_mainContainer'
import Teacher_WeekCalendarContainer from './container/teacher_weekCalendarContainer'

import TSMD_MainContainer from './container/tsmd_mainContainer'
import TSMD_ArrangeCalendarContainer from './container/tsmd_arrangeCalendarContainer'
import TSMD_AutoArrangeCalendarContainer from './container/tsmd_autoArrangeCalendarContainer'
//Import CSS
require("style-loader!css-loader!./css/header.css");
require("style-loader!css-loader!./css/body.css");
require("style-loader!css-loader!./css/navSideBar.css");
require("style-loader!css-loader!./css/pagePanel.css");
require("style-loader!css-loader!./css/footer.css");
require("style-loader!css-loader!./css/calendar.css");
require("style-loader!css-loader!./css/loginForm.css");
require("style-loader!css-loader!./css/modal.css");
require("style-loader!css-loader!./css/arrangeCalendar.css");
require("style-loader!css-loader!./css/switch.css");
require("style-loader!css-loader!./css/studentTime.css");
require("style-loader!css-loader!./css/styledCheckbox.css");
require("style-loader!css-loader!./css/condition.css");
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
        canRegister,
        currentLearningYear,
        currentWeekNumber,
        currentDate,
        teacherWeekCalendar,
        teacherEditLessonDetail,
        allLessons,
        subjectRooms,
        yearsNotEnd,
        semestersNotEnd,
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
            <Route path="test-calendar" component={CalendarNewStyle}/>
            <Route path="sinhvien" component={Student_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={Student_WeekCalendarContainer}/>
                <Route path="system-chat" component={SystemChat}/>
                <Route path="dang-ky-hoc" component={Student_RegisterSubjectClassContainer}/>
            </Route>
            <Route path="giangvien" component={Teacher_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={Teacher_WeekCalendarContainer}/>
                <Route path="system-chat" component={SystemChat}/>
            </Route>
            <Route path="giaovu" component={TSMD_MainContainer}>
                <Route path="sap-xep-tkb" component={TSMD_ArrangeCalendarContainer}/>
                <Route path="sap-xep-tkb/tu-dong" component={TSMD_AutoArrangeCalendarContainer}/>
                <Route path="mo-dang-ky" component={TSMD_OpenRegisteringTime}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)