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


class TSMD_ClassCalendarCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stompClient: null,
            stompClient2: null,
            classId: 0,
            classType: 0,
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
        this.handleEndLessonChange = this.handleEndLessonChange.bind(this);
        this.handleStartWeekChange = this.handleStartWeekChange.bind(this);
        this.handleEndWeekChange = this.handleEndWeekChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    switchMode() {
        const element = findDOMNode(this.refs.detail)
        $(element).slideToggle(300);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId) {
            var classId = nextProps.classId;
            var availableWeeks = nextProps.availableWeeks;
            this.setState({
                classId: classId,
                availableWeeks: availableWeeks,
                chosenStartWeek: availableWeeks[0],
                availableEndWeeks: availableWeeks,
                chosenEndWeek: availableWeeks[0]
            });

            API.getClassType(nextProps.classId, (classType) => {
                this.setState({
                    classType: classType
                });
                API.getThus((weekDays) => {
                    this.setState({
                        weekDays: weekDays,
                        chosenWeekDayId: weekDays[0].id
                    });
                    API.getRoomTypes((roomTypes) => {
                        this.setState({
                            roomTypes: roomTypes,
                            chosenRoomTypeId: roomTypes[0].id
                        });
                        var dayNhaId = 0;
                        if (classType == 1 || classType == 3) {
                            dayNhaId = 1;
                        } else {
                            dayNhaId = 2;
                        }
                        API.getRooms(classId, dayNhaId, (rooms) => {
                            this.setState({
                                rooms: rooms,
                                chosenRoomId: rooms[0].id
                            });
                            API.getAvailableLessons(classId, 0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
                                if (lessons.length != 0) {
                                    this.setState({
                                        availableLessons: lessons,
                                        chosenStartLessonId: lessons[0].id,
                                        chosenEndLessonId: lessons[0].id
                                    });
                                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
                                } else {
                                    this.setState({
                                        availableLessons: [],
                                        chosenStartLessonId: 0,
                                        chosenEndLessonId: 0
                                    });
                                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(0);
                                }

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
            }, (error) => {
                console.log(error);
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
            API.getAvailableLessons(this.state.classId, 0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
                if (lessons.length != 0) {
                    this.setState({
                        availableLessons: lessons,
                        chosenStartLessonId: lessons[0].id,
                        chosenEndLessonId: lessons[0].id
                    });
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
                } else {
                    this.setState({
                        availableLessons: [],
                        chosenStartLessonId: 0,
                        chosenEndLessonId: 0
                    });
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(0);
                }

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
            API.getAvailableLessons(this.state.classId, 0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
                if (lessons.length != 0) {
                    this.setState({
                        availableLessons: lessons,
                        chosenStartLessonId: lessons[0].id,
                        chosenEndLessonId: lessons[0].id
                    });
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
                } else {
                    this.setState({
                        availableLessons: [],
                        chosenStartLessonId: 0,
                        chosenEndLessonId: 0
                    });
                    this.setAvailableEndLessonsCorresspondingToChosenStartLessons(0);
                }

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
        API.getAvailableLessons(this.state.classId, 0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
            if (lessons.length != 0) {
                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: lessons[0].id,
                    chosenEndLessonId: lessons[0].id
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
            } else {
                this.setState({
                    availableLessons: [],
                    chosenStartLessonId: 0,
                    chosenEndLessonId: 0
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(0);
            }

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

    handleEndLessonChange(e) {
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
    }

    handleEndWeekChange(e) {
        var chosenEndWeek = e.target.value;
        this.setState({
            chosenEndWeek: chosenEndWeek
        })
    }

    handleSubmit() {
        var calendar = {
            id: 0,
            giangDuong: {
                id: this.state.chosenRoomId
            },
            tkb_thu: {
                id: this.state.chosenWeekDayId
            },
            tkb_tietDauTien: {
                id: this.state.chosenStartLessonId
            },
            tkb_tietCuoiCung: {
                id: this.state.chosenEndLessonId
            },
            tuanBatDau: this.state.chosenStartWeek,
            tuanKetThuc: this.state.chosenEndWeek
        }

        API2.addWeekCalendar(calendar, this.state.classId, (data) => {
            this.switchMode();
        }, (error) => {
            console.log(error);
        });
    }

    componentWillMount() {
    }

    setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonId) {
        if (startLessonId == 0) {
            this.setState({
                availableEndLessons: [],
            })
        } else {
            var availableLessons = this.state.availableLessons;
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

    refreshLesson(message) {
        var weekCalendar = JSON.parse(message.body);
        // if(weekCalendar.roomId == this.state.chosenRoomId && weekCalendar.weekDayId == this.state.chosenWeekDayId){
        API.getAvailableLessons(this.state.classId, 0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
            if (lessons.length != 0) {
                var changeChosenStartLesson = true;
                for (var i = 0; i < lessons.length; i++) {
                    if (lessons[i].id == this.state.chosenStartLessonId) {
                        changeChosenStartLesson = false;
                        break;
                    }
                }

                var changeChosenEndLesson = true;
                for (var i = 0; i < lessons.length; i++) {
                    if (lessons[i].id == this.state.chosenEndLessonId) {
                        changeChosenEndLesson = false;
                        break;
                    }
                }

                console.log(changeChosenStartLesson + " -------" + changeChosenEndLesson);

                var chosenStartLessonId = 0;
                var chosenEndlessonId = 0;
                if (!changeChosenStartLesson) {
                    chosenStartLessonId = this.state.chosenStartLessonId;
                    if (!changeChosenEndLesson) {
                        chosenEndlessonId = this.state.chosenEndLessonId;
                    } else {
                        chosenEndlessonId = chosenStartLessonId;
                    }
                } else {
                    chosenStartLessonId = lessons[0].id;
                    chosenEndlessonId = lessons[0].id;
                }


                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: chosenStartLessonId,
                    chosenEndLessonId: chosenEndlessonId
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(chosenStartLessonId);
            } else {
                this.setState({
                    availableLessons: [],
                    chosenStartLessonId: 0,
                    chosenEndLessonId: 0
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(0);
            }

        }, (error) => {
            console.log(error);
        })
        // }
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
                Thêm lịch
            </div>
            <div className="week-calendar-time-detail hide" ref="detail">
                <div className="edit-title">
                    Thứ
                </div>
                <select className="halfLength" onChange={this.handleWeekDayChange} value={this.state.chosenWeekDayId}>
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
                <select className="halfLength" onChange={this.handleRoomChange} value={this.state.chosenRoomId}>
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
                <select id="start-lesson-selecbox" className="halfLength" onChange={this.handleStartLessonChange}
                        value={this.state.chosenStartLessonId}>
                    {availableLessons.map(availableLesson => <option key={availableLesson.id}
                                                                     value={availableLesson.id}>{availableLesson.ten}</option>)}
                </select>
                <div className="edit-title">
                    Tới tiết
                </div>
                <select id="end-lesson-selecbox" className="halfLength" onChange={this.handleEndLessonChange}
                        value={this.state.chosenEndLessonId}>
                    {availableEndLessons.map(availableEndLesson => <option key={availableEndLesson.id}
                                                                           value={availableEndLesson.id}>{availableEndLesson.ten}</option>)}
                </select>
                <div className="action-corner">
                    <button onClick={this.handleSubmit}>OK</button>
                </div>
                <div className="error-message">
                </div>
            </div>
        </div>);
    }

    componentDidMount() {
    }
}

export default TSMD_ClassCalendarCreate;
