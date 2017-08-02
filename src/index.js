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
import Student_PrintCalendar from './component/student/student_printCalendar'
import Teacher_PrintCalendar from './component/teacher/teacher_printCalendar'
import TSMD_InputKhoa from './component/tsmd/inputData/khoa/tsmd_inputKhoa'
import TSMD_InputGiangDuong from './component/tsmd/inputData/giangDuong/tsmd_inputGiangDuong'
import TSMD_InputKhoaHoc from './component/tsmd/inputData/khoaHoc/tsmd_inputKhoaHoc'
import TSMD_InputNamHoc from './component/tsmd/inputData/namHoc/tsmd_inputNamHoc'
import TSMD_InputKiHocNamHoc from './component/tsmd/inputData/kiHocNamHoc/tsmd_inputKiHocNamHoc'
import TSMD_InputKhoaKhoaHoc from './component/tsmd/inputData/khoaKhoaHoc/tsmd_inputKhoaKhoaHoc'
import TSMD_InputLopHoc from './component/tsmd/inputData/lopHoc/tsmd_inputLopHoc'
import TSMD_InputNhanVien from './component/tsmd/inputData/nhanVien/tsmd_inputNhanVien'
import TSMD_InputNhanVienVaiTro from './component/tsmd/inputData/nhanVienVaiTro/tsmd_inputNhanVienVaiTro'
import TSMD_InputNganh from './component/tsmd/inputData/nganh/tsmd_inputNganh'
import TSMD_InputKhoaKhoaHocNganh from './component/tsmd/inputData/khoaKhoaHocNganh/tsmd_inputKhoaKhoaHocNganh'
import TSMD_InputSinhVien from './component/tsmd/inputData/sinhVien/tsmd_inputSinhVien'
import TSMD_InputMonHoc from './component/tsmd/inputData/monHoc/tsmd_inputMonHoc'
import TSMD_InputMonHocGiangDuong from './component/tsmd/inputData/monHocGiangDuong/tsmd_inputMonHocGiangDuong'

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

//  Import SCSS
require("!style-loader!css-loader!sass-loader!./css/table.scss");

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
                <Route path="in-thoi-khoa-bieu" component={Student_PrintCalendar}/>
                <Route path="system-chat" component={SystemChat}/>
                <Route path="dang-ky-hoc" component={Student_RegisterSubjectClassContainer}/>
            </Route>
            <Route path="giangvien" component={Teacher_MainContainer}>
                <Route path="thoi-khoa-bieu-tuan" component={Teacher_WeekCalendarContainer}/>
                <Route path="in-thoi-khoa-bieu" component={Teacher_PrintCalendar}/>
                <Route path="system-chat" component={SystemChat}/>
            </Route>
            <Route path="giaovu" component={TSMD_MainContainer}>
                <Route path="sap-xep-tkb" component={TSMD_ArrangeCalendarContainer}/>
                <Route path="sap-xep-tkb/tu-dong" component={TSMD_AutoArrangeCalendarContainer}/>
                <Route path="mo-dang-ky" component={TSMD_OpenRegisteringTime}/>
                <Route path="nhap-du-lieu/khoa" component={TSMD_InputKhoa}/>
                <Route path="nhap-du-lieu/giang-duong" component={TSMD_InputGiangDuong}/>
                <Route path="nhap-du-lieu/khoa-hoc" component={TSMD_InputKhoaHoc}/>
                <Route path="nhap-du-lieu/nam-hoc" component={TSMD_InputNamHoc}/>
                <Route path="nhap-du-lieu/ki-hoc-nam-hoc" component={TSMD_InputKiHocNamHoc}/>
                <Route path="nhap-du-lieu/khoa-khoa-hoc" component={TSMD_InputKhoaKhoaHoc}/>
                <Route path="nhap-du-lieu/khoa-khoa-hoc" component={TSMD_InputKhoaKhoaHoc}/>
                <Route path="nhap-du-lieu/lop-hoc" component={TSMD_InputLopHoc}/>
                <Route path="nhap-du-lieu/nhan-vien" component={TSMD_InputNhanVien}/>
                <Route path="nhap-du-lieu/nhan-vien-vai-tro" component={TSMD_InputNhanVienVaiTro}/>
                <Route path="nhap-du-lieu/nganh" component={TSMD_InputNganh}/>
                <Route path="nhap-du-lieu/khoa-khoa-hoc-nganh" component={TSMD_InputKhoaKhoaHocNganh}/>
                <Route path="nhap-du-lieu/sinh-vien" component={TSMD_InputSinhVien}/>
                <Route path="nhap-du-lieu/mon-hoc" component={TSMD_InputMonHoc}/>
                <Route path="nhap-du-lieu/mon-hoc-giang-duong" component={TSMD_InputMonHocGiangDuong}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)