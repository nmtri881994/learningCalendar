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

class TSMD_ClassCalendarEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stompClient: null,
            stompClient2: null,

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
        this.handleStartLessonChange = this.handleStartLessonChange.bind(this);
        this.handleEndLessonChang = this.handleEndLessonChang.bind(this);
        this.handleStartWeekChange = this.handleStartWeekChange.bind(this);
        this.handleEndWeekChange = this.handleEndWeekChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    switchMode() {
        const element = findDOMNode(this.refs.detail)
        $(element).slideToggle(300);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.classId != 0 && nextProps.classId != this.state.classId){
            var calendar = nextProps.calendar;
            var classId = nextProps.classId
            var availableWeeks = nextProps.availableWeeks;
            var startWeek = calendar.tuanBatDau;
            var endWeek = calendar.tuanKetThuc;
            var availableEndWeeks = [];
            var lastWeek = availableWeeks[availableWeeks.length - 1];
            var basicInfo = nextProps.basicInfo;
            for (var i = startWeek; i <= lastWeek; i++) {
                availableEndWeeks.push(i);
            }

            var classType = 0;
            var weekDays = [];
            var chosenWeekDayId = 0;
            var roomTypes = [];
            var chosenRoomTypeId = 0;
            var rooms = [];
            var chosenRoomId = 0;
            var availableLessons = [];
            var chosenStartLessonId = 0;
            var chosenEndLessonId = 0;

            API.getClassType(classId, (classType) => {
                classType = classType;
            }, (error) => {
                console.log(error);
            })

            API.getThus((weekDays) => {
                weekDays = weekDays;
                chosenWeekDayId = calendar.tkb_thu.id;
                API.getRoomTypes((roomTypes) => {
                    roomTypes = roomTypes;
                    chosenRoomTypeId = calendar.giangDuong.dayNha.id;
                    API.getRooms(classId, calendar.giangDuong.dayNha.id, (rooms) => {
                        rooms = rooms;
                        chosenRoomId = calendar.giangDuong.id;
                        API.getAvailableLessons(classId, calendar.id, calendar.tkb_thu.id, calendar.giangDuong.id, startWeek, endWeek, (lessons) => {
                            availableLessons = lessons;
                            chosenStartLessonId = calendar.tkb_tietDauTien.id;
                            chosenEndLessonId = calendar.tkb_tietCuoiCung.id;
                            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(calendar.tkb_tietDauTien.id, lessons);
                            this.setState({
                                basicInfo: basicInfo,
                                classId: classId,
                                calendar: calendar,
                                availableWeeks: availableWeeks,
                                chosenStartWeek: startWeek,
                                availableEndWeeks: availableEndWeeks,
                                chosenEndWeek: endWeek,

                                classType: classType,
                                weekDays: weekDays,
                                chosenWeekDayId: chosenWeekDayId,
                                roomTypes: roomTypes,
                                chosenRoomTypeId: chosenRoomTypeId,
                                rooms: rooms,
                                chosenRoomId: chosenRoomId,
                                availableLessons: availableLessons,
                                chosenStartLessonId: chosenStartLessonId,
                                chosenEndLessonId: chosenEndLessonId
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
            }, (error) => {
                console.log(error);
            })


        }

    }

    componentWillMount() {

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
                    break
                }
            }
            var startLesson = availableLessons[indexOfStartLesson];

            for (var i = indexOfStartLesson; i < availableLessons.length; i++) {
                if ((availableLessons[i].thuTu - startLesson.thuTu) == (i - indexOfStartLesson)) {
                    availableEndLessons.push(availableLessons[i]);
                } else {
                    break;
                }
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
                    chosenStartLessonId: lessons[0].id,
                    chosenEndLessonId: lessons[0].id
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
                    chosenStartLessonId: lessons[0].id,
                    chosenEndLessonId: lessons[0].id
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
                chosenStartLessonId: lessons[0].id,
                chosenEndLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id, lessons);
        }, (error) => {
            console.log(error);
        })
    }

    handleStartLessonChange(e) {
        var chosenStartLessonId = e.target.value;
        this.setState({
            chosenStartLessonId: chosenStartLessonId,
            chosenEndLessonId: chosenStartLessonId
        })
        this.setAvailableEndLessonsCorresspondingToChosenStartLessons(chosenStartLessonId);
    }

    handleEndLessonChang(e) {
        var chosenEndLessonId = e.target.value;
        this.setState({
            chosenEndLessonId: chosenEndLessonId
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
        calendar.giangDuong.id = this.state.chosenRoomId;
        calendar.tkb_thu.id = this.state.chosenWeekDayId;
        calendar.tkb_tietDauTien.id = this.state.chosenStartLessonId;
        calendar.tkb_tietCuoiCung.id = this.state.chosenEndLessonId;

        var basicInfo = this.state.basicInfo;

        API2.updateWeekCalendar(calendar, basicInfo.yearId, basicInfo.termId, basicInfo.facultyId, basicInfo.yearOfAdmissionId, basicInfo.majorId, (newCalendar) => {
            this.setState({
                calendar: newCalendar
            });
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
            this.switchMode();
        }, (error) => {
            console.log(error);
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
                {calendar ? calendar.tkb_thu.ten + " - " + calendar.giangDuong.ten + " - tuần " + calendar.tuanBatDau + " tới " + calendar.tuanKetThuc + " - " + calendar.tkb_tietDauTien.ten + " tới " + calendar.tkb_tietCuoiCung.ten : ""}
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
                    Từ tiết
                </div>
                <select id="start-lesson-selecbox" className="halfLength" value={this.state.chosenStartLessonId}
                        onChange={this.handleStartLessonChange}>
                    {availableLessons.map(availableLesson => <option key={availableLesson.id}
                                                                     value={availableLesson.id}>{availableLesson.ten}</option>)}
                </select>
                <div className="edit-title">
                    Tới tiết
                </div>
                <select id="end-lesson-selecbox" className="halfLength" value={this.state.chosenEndLessonId}
                        onChange={this.handleEndLessonChang}>
                    {availableEndLessons.map(availableEndLesson => <option key={availableEndLesson.id}
                                                                           value={availableEndLesson.id}>{availableEndLesson.ten}</option>)}
                </select>
                <div className="action-corner">
                    <button onClick={this.handleSubmit}>OK</button>
                    <button onClick={this.handleDelete}>Xóa</button>
                </div>
                <div className="error-message">
                </div>
            </div>
        </div>);
    }

    componentDidMount() {
    }
}

export default TSMD_ClassCalendarEdit;