/**
 * Created by Tri on 4/8/2017.
 */
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import Apis
import * as API from '../../apiUtility/calendarApi'
import * as API2 from '../../apiUtility/tsmdApi'

//import Components
import Mini_Lessons from './../calendar/mini_lessons'

//import config
import {APP_URL} from '../../configuration/appConfig'

class TSMD_ClassCalendarEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stompClient: null,

            basicInfo: null,

            classId: 0,
            classType: 0,
            calendar: null,
            weekDays: [],
            chosenWeekDayId: 0,
            roomTypes: [],
            chosenRoomTypeId: 0,
            rooms: [],
            chosenRoomId: 0,
            availableLessons: [],
            chosenStartLessonId: 0,
            availableEndLessons: [],
            chosenEndLessonId: 0,
            availableWeeks: [],
            chosenStartWeek: 0,
            availableEndWeeks: [],
            chosenEndWeek: 0
        }

        this.switchMode = this.switchMode.bind(this);
        this.handleWeekDayChange = this.handleWeekDayChange.bind(this);
        this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleStartWeekChange = this.handleStartWeekChange.bind(this);
        this.handleEndWeekChange = this.handleEndWeekChange.bind(this);

        this.choseLesson = this.choseLesson.bind(this);
        this.resetLesson = this.resetLesson.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    switchMode() {
        const element = findDOMNode(this.refs.detail)
        $(element).slideToggle(300);
    }

    componentWillReceiveProps(nextProps) {
        this.helpRender(nextProps);
    }

    helpRender(props) {
        if (props.classId != 0 && props.classId != this.state.classId) {
            var calendar = props.calendar;
            var classId = props.classId

            this.setState({
                classId: classId
            })

            var availableWeeks = props.availableWeeks;
            var startWeek = calendar.tuanBatDau;
            var endWeek = calendar.tuanKetThuc;
            var availableEndWeeks = [];
            var lastWeek = availableWeeks[availableWeeks.length - 1];
            var basicInfo = props.basicInfo;
            for (var i = startWeek; i <= lastWeek; i++) {
                availableEndWeeks.push(i);
            }

            var classType1 = 0;
            var weekDays1 = [];
            var chosenWeekDayId = 0;
            var roomTypes1 = [];
            var chosenRoomTypeId = 0;
            var rooms1 = [];
            var chosenRoomId = 0;
            var availableLessons = [];
            var chosenStartLessonId = 0;
            var chosenEndLessonId = 0;

            API.getClassType(classId, (classType) => {
                classType1 = classType;
            }, (error) => {
                console.log(error);
            })

            API.getThus((weekDays) => {
                weekDays1 = weekDays;
                chosenWeekDayId = calendar.tkb_thu.id;
                API.getRoomTypes((roomTypes) => {
                    roomTypes1 = roomTypes;
                    chosenRoomTypeId = calendar.dmGiangDuong.dmLoaiPhong.id;
                    API.getRooms(classId, calendar.dmGiangDuong.dmLoaiPhong.id, (rooms) => {
                        rooms1 = rooms;
                        chosenRoomId = calendar.dmGiangDuong.id;
                        API.getAvailableLessons(classId, calendar.id, calendar.tkb_thu.id, calendar.dmGiangDuong.id, startWeek, endWeek, (lessons) => {
                            availableLessons = lessons;
                            chosenStartLessonId = calendar.tkb_tietDauTien.id;
                            chosenEndLessonId = calendar.tkb_tietCuoiCung.id;
                            this.setState({
                                basicInfo: basicInfo,
                                calendar: calendar,
                                availableWeeks: availableWeeks,
                                chosenStartWeek: startWeek,
                                availableEndWeeks: availableEndWeeks,
                                chosenEndWeek: endWeek,

                                classId: classId,
                                classType: classType1,
                                weekDays: weekDays1,
                                chosenWeekDayId: chosenWeekDayId,
                                roomTypes: roomTypes1,
                                chosenRoomTypeId: chosenRoomTypeId,
                                rooms: rooms1,
                                chosenRoomId: chosenRoomId,
                                availableLessons: availableLessons,
                                chosenStartLessonId: chosenStartLessonId,
                                chosenEndLessonId: chosenEndLessonId
                            });
                            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(calendar.tkb_tietDauTien.id, lessons);
                        }, (error) => {
                            console.log(error);
                        })
                    }, (error) => {
                        console.log(error);
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }
    }

    componentWillMount() {
        this.helpRender(this.props);
    }

    setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonId, lessons) {
        if (startLessonId == 0) {
            this.setState({
                availableEndLessons: [],
            })
        } else {
            var availableLessons = lessons ? lessons : this.state.availableLessons;
            var availableEndLessons = [];
            var indexOfStartLesson = -1;

            for (var i = 0; i < availableLessons.length; i++) {
                if (startLessonId == availableLessons[i].id) {
                    indexOfStartLesson = i;
                    break;
                }
            }
            var startLesson = availableLessons[indexOfStartLesson];

            for (var i = indexOfStartLesson; i < availableLessons.length; i++) {
                if ((availableLessons[i].thuTu - startLesson.thuTu) == (i - indexOfStartLesson)) {
                    availableEndLessons.push(availableLessons[i].thuTu);
                } else {
                    break;
                }
            }

            if (!this.checkExist(this.state.chosenEndLessonId, availableEndLessons)) {
                this.setState({
                    chosenEndLessonId: availableEndLessons[0]
                })
            }

            this.setState({
                availableEndLessons: availableEndLessons
            })
        }

    }

    handleWeekDayChange(e) {
        var chosenWeekDayId = e.target.value;
        this.setState({
            chosenWeekDayId: chosenWeekDayId
        })
        API.getRooms(this.state.classId, this.state.chosenRoomTypeId, (rooms) => {
            this.setState({
                rooms: rooms,
                chosenRoomId: rooms[0].id
            });
            API.getAvailableLessons(this.state.classId, this.state.calendar.id, chosenWeekDayId, rooms[0].id, this.state.chosenStartWeek, this.state.chosenEndWeek, (lessons) => {
                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: lessons[0].id
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleRoomTypeChange(e) {
        var chosenRoomTypeId = e.target.value;
        this.setState({
            chosenRoomTypeId: chosenRoomTypeId
        });
        API.getRooms(this.state.classId, chosenRoomTypeId, (rooms) => {
            this.setState({
                rooms: rooms,
                chosenRoomId: rooms[0].id
            });
            API.getAvailableLessons(this.state.classId, this.state.calendar.id, this.state.chosenWeekDayId, rooms[0].id, this.state.chosenStartWeek, this.state.chosenEndWeek, (lessons) => {
                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: lessons[0].id
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleRoomChange(e) {
        var chosenRoomId = e.target.value;
        this.setState({
            chosenRoomId: chosenRoomId
        })
        API.getAvailableLessons(this.state.classId, this.state.calendar.id, this.state.chosenWeekDayId, chosenRoomId, this.state.chosenStartWeek, this.state.chosenEndWeek, (lessons) => {
            this.setState({
                availableLessons: lessons,
                chosenStartLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
        }, (error) => {
            console.log(error);
        })
    }


    handleStartWeekChange(e) {
        var availableWeeks = this.state.availableWeeks;
        var lastWeek = availableWeeks[availableWeeks.length - 1];
        var chosenStartWeek = e.target.value;
        var availableEndWeeks = [];
        for (var i = chosenStartWeek; i <= lastWeek; i++) {
            availableEndWeeks.push(i);
        }
        this.setState({
            chosenStartWeek: chosenStartWeek,
            availableEndWeeks: availableEndWeeks,
            chosenEndWeek: availableEndWeeks[0]
        })
        API.getAvailableLessons(this.state.classId, this.state.calendar.id, this.state.chosenWeekDayId, this.state.chosenRoomId, chosenStartWeek, availableEndWeeks[0], (lessons) => {
            this.setState({
                availableLessons: lessons,
                chosenStartLessonId: lessons[0].id,
                chosenEndLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
        }, (error) => {
            console.log(error);
        })
    }

    handleEndWeekChange(e) {
        var chosenEndWeek = e.target.value;
        this.setState({
            chosenEndWeek: chosenEndWeek
        })
        API.getAvailableLessons(this.state.classId, this.state.calendar.id, this.state.chosenWeekDayId, this.state.chosenRoomId, this.state.chosenStartWeek, chosenEndWeek, (lessons) => {
            this.setState({
                availableLessons: lessons,
                chosenStartLessonId: lessons[0].id,
                chosenEndLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
        }, (error) => {
            console.log(error);
        })
    }

    handleSubmit() {
        var calendar = this.state.calendar;
        calendar.dmGiangDuong.id = this.state.chosenRoomId;
        calendar.tkb_thu.id = this.state.chosenWeekDayId;
        calendar.tkb_tietDauTien.id = this.state.chosenStartLessonId;
        calendar.tkb_tietCuoiCung.id = this.state.chosenEndLessonId;
        calendar.tuanBatDau = this.state.chosenStartWeek;
        calendar.tuanKetThuc = this.state.chosenEndWeek;
        var basicInfo = this.state.basicInfo;

        API2.updateWeekCalendar(calendar, basicInfo.yearId, basicInfo.termId, basicInfo.facultyId, basicInfo.yearOfAdmissionId, basicInfo.majorId, (newCalendar) => {
            var message = {
                type: 2,
                classId: this.state.classId
            }
            this.state.stompClient.send("/socket/week-calendar/edit", {}, JSON.stringify(message));

            this.switchMode();
        }, (error) => {
            if (error.response.status == 403) {
                this.setState({
                    errorMessage: "Khoảng thời gian này, khoa-khóa học đã có quá nhiều lớp học (>=3)"
                })
            }

            if (error.response.status == 409) {
                this.setState({
                    errorMessage: "Khoảng thời gian này, giáo viên đã có quá nhiều lớp học (>=3)"
                })
            }
        })
    }

    handleDelete() {
        API2.deleteWeekCalendar(this.state.calendar.id, (data) => {
            var message = {
                type: 1,
                classId: this.state.classId
            }
            this.state.stompClient.send("/socket/week-calendar/edit", {}, JSON.stringify(message));

            this.switchMode();
        }, (error) => {
            console.log(error);
        })
    }

    choseLesson(i) {
        var availableLessons = this.state.availableLessons;
        var availableEndLesson = this.state.availableEndLessons;
        console.log(i);
        console.log(availableLessons);
        console.log(this.state.chosenStartLessonId)
        console.log(this.state.chosenStartLessonId == 0 || availableEndLesson.indexOf(i) == -1)
        if (this.state.chosenStartLessonId == 0 || availableEndLesson.indexOf(i) == -1) {
            this.setState({
                chosenStartLessonId: i,
                chosenEndLessonId: 0
            })
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(i, availableLessons);
        } else {
            if (i >= this.state.chosenStartLessonId) {
                if (i < this.state.chosenEndLessonId) {
                    this.setState({
                        chosenStartLessonId: i
                    })
                } else {
                    this.setState({
                        chosenEndLessonId: i
                    })
                }
            } else {
                this.setState({
                    chosenStartLessonId: i
                })
            }
        }

    }

    resetLesson() {
        this.setState({
            chosenStartLessonId: 0,
            chosenEndLessonId: 0
        })
    }

    render() {
        var calendar = this.state.calendar;
        var weekDays = this.state.weekDays;
        var roomTypes = this.state.roomTypes;
        var rooms = this.state.rooms;
        var availableLessons = this.state.availableLessons;
        var availableEndLessons = this.state.availableEndLessons;
        var availableWeeks = this.state.availableWeeks;
        var availableEndWeeks = this.state.availableEndWeeks;
        return (<div className="class-week-calendar-time">
            <div className="week-calendar-time-summary" onClick={this.switchMode}>
                {calendar ? calendar.tkb_thu.ten + " - " + calendar.dmGiangDuong.ten + " - tuần " + calendar.tuanBatDau + " tới " + calendar.tuanKetThuc + " - " + calendar.tkb_tietDauTien.ten + " tới " + calendar.tkb_tietCuoiCung.ten : ""}
            </div>
            <div className="week-calendar-time-detail hide" ref="detail">
                <div className="edit-title">
                    Thứ
                </div>
                <select className="halfLength" value={this.state.chosenWeekDayId} onChange={this.handleWeekDayChange}>
                    {weekDays.map(weekDay => <option key={weekDay.id} value={weekDay.id}>{weekDay.ten}</option>)}
                </select>
                {this.state.classType == 3 ? <span> <div className="edit-title">
                    Dãy nhà
                </div>
                <select className="halfLength" value={this.state.chosenRoomTypeId} onChange={this.handleRoomTypeChange}>
                    {roomTypes.map(roomType => <option key={roomType.id} value={roomType.id}>{roomType.ten}</option>)}
                </select></span> : ""}
                <div className="edit-title">
                    Phòng
                </div>
                <select className="halfLength" value={this.state.chosenRoomId} onChange={this.handleRoomChange}>
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.ten}</option>)}
                </select>
                <div className="edit-title">
                    Từ tuần
                </div>
                <select id="start-lesson-selecbox" className="halfLength" value={this.state.chosenStartWeek}
                        onChange={this.handleStartWeekChange}>
                    {availableWeeks.map(week => <option key={week} value={week}>{week}</option>)}
                </select>
                <div className="edit-title">
                    Tới tuần
                </div>
                <select id="start-lesson-selecbox" className="halfLength" value={this.state.chosenEndWeek}
                        onChange={this.handleEndWeekChange}>
                    {availableEndWeeks.map(week => <option key={week} value={week}>{week}</option>)}
                </select>
                <div className="edit-title">
                    Chọn tiết
                </div>
                <Mini_Lessons choseLesson={this.choseLesson} resetLesson={this.resetLesson}
                              availableLessons={availableLessons}
                              startLessonId={this.state.chosenStartLessonId}
                              endLessonId={this.state.chosenEndLessonId}/>
                <div className="action-corner">
                    <button className="ok-button button-mini padding-top-bottom-3px" onClick={this.handleSubmit}>OK</button>
                    <button className="delete-button button-mini padding-top-bottom-3px" onClick={this.handleDelete}>Xóa</button>
                </div>
                <div className="error-message">
                </div>
            </div>
        </div>);
    }

    refresh(classId) {
        if (classId == this.state.classId) {
            var calendar1 = null;
            API.getOne(this.state.calendar.id, (calendar) => {
                calendar1 = calendar;
            }, (error) => {
                console.log(error);
            })
            API.getAvailableLessons(this.state.classId, this.state.calendar.id, this.state.chosenWeekDayId, this.state.chosenRoomId, this.state.chosenStartWeek, this.state.chosenEndWeek, (lessons) => {
                var startLessonsId = this.state.chosenStartLessonId;
                if (!this.checkExist(startLessonsId, lessons)) {
                    startLessonsId = lessons[0].id;
                    this.setState({
                        chosenStartLessonId: startLessonsId
                    });
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonsId, lessons);
                } else {
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonsId, lessons);
                }

                this.setState({
                    calendar: calendar1,
                    availableLessons: lessons,
                });

            }, (error) => {
                console.log(error);
            })
        }
    }

    checkExist(chosenId, lessons) {
        if (lessons) {
            for (var i = 0; i < lessons.length; i++) {
                if (chosenId == lessons[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    componentDidMount() {
        var socket = SockJS(APP_URL + "/week-calendar/edit");
        var stompClient = Stomp.over(socket);

        var refresh = (classId) => this.refresh(classId);

        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/week-calendar/edit", function (message) {
                refresh(JSON.parse(message.body).classId);
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default TSMD_ClassCalendarEdit;