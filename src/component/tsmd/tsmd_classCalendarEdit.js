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
            chosenEndLessonId: 0
        }

        this.switchMode = this.switchMode.bind(this);
        this.handleWeekDayChange = this.handleWeekDayChange.bind(this);
        this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleStartLessonChange = this.handleStartLessonChange.bind(this);
        this.handleEndLessonChang = this.handleEndLessonChang.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    switchMode() {
        const element = findDOMNode(this.refs.detail)
        $(element).slideToggle(300);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        var calendar = this.props.calendar;

        this.setState({
            classId: this.props.classId,
            calendar: calendar
        })

        API.getClassType(this.props.classId, (classType) => {
            this.setState({
                classType: classType
            })
        }, (error) => {
            console.log(error);
        })

        API.getThus((weekDays) => {
            this.setState({
                weekDays: weekDays,
                chosenWeekDayId: calendar.tkb_thu.id
            });
            API.getRoomTypes((roomTypes) => {
                this.setState({
                    roomTypes: roomTypes,
                    chosenRoomTypeId: calendar.giangDuong.dayNha.id
                });
                API.getRooms(this.props.classId, calendar.giangDuong.dayNha.id, (rooms) => {
                    this.setState({
                        rooms: rooms,
                        chosenRoomId: calendar.giangDuong.id
                    });
                    API.getAvailableLessons(calendar.id, calendar.tkb_thu.id, calendar.giangDuong.id, (lessons) => {
                        this.setState({
                            availableLessons: lessons,
                            chosenStartLessonId: calendar.tkb_tietDauTien.id,
                            chosenEndLessonId: calendar.tkb_tietCuoiCung.id
                        });
                        this.setAvailableEndLessonsCorresspondingToChosenStartLessons(calendar.tkb_tietDauTien.id);
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

    setAvailableEndLessonsCorresspondingToChosenStartLessons(startLessonId) {
        if(startLessonId == 0){
            this.setState({
                availableEndLessons: [],
            })
        }else{
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
            API.getAvailableLessons(this.state.calendar.id, chosenWeekDayId, rooms[0].id, (lessons) => {
                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: lessons[0].id,
                    chosenEndLessonId: lessons[0].id
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
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
            API.getAvailableLessons(this.state.calendar.id, this.state.chosenWeekDayId, rooms[0].id, (lessons) => {
                this.setState({
                    availableLessons: lessons,
                    chosenStartLessonId: lessons[0].id,
                    chosenEndLessonId: lessons[0].id
                });
                this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
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
        API.getAvailableLessons(this.state.calendar.id, this.state.chosenWeekDayId, chosenRoomId, (lessons) => {
            this.setState({
                availableLessons: lessons,
                chosenStartLessonId: lessons[0].id,
                chosenEndLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
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

    handleSubmit(){
        var calendar = this.state.calendar;
        calendar.giangDuong.id = this.state.chosenRoomId;
        calendar.tkb_thu.id = this.state.chosenWeekDayId;
        calendar.tkb_tietDauTien.id = this.state.chosenStartLessonId;
        calendar.tkb_tietCuoiCung.id = this.state.chosenEndLessonId;

        console.log(calendar);

        API2.updateWeekCalendar(calendar, (newCalendar) => {
            this.setState({
                calendar: newCalendar
            });
            this.state.stompClient.send("/socket/week-calendar/edit", {}, JSON.stringify({roomId: calendar.giangDuong.id, weekDayId: calendar.tkb_thu.id}));
            this.switchMode();
        },(error) =>{
            console.log(error);
        })
    }

    handleDelete(){
        API2.deleteWeekCalendar(this.state.calendar.id, (data)=>{
            this.state.stompClient2.send("/socket/week-calendar/add-or-delete", {}, JSON.stringify({classId: this.state.classId}));
            this.switchMode();
        }, (error)=>{
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
        return (<div className="class-week-calendar-time">
            <div className="week-calendar-time-summary" onClick={this.switchMode}>
                {calendar.tkb_thu.ten} - {calendar.giangDuong.ten} - {calendar.tkb_tietDauTien.ten} tới {calendar.tkb_tietCuoiCung.ten}
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
        var socket = SockJS('http://localhost:8080/week-calendar/edit'); // <3>
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/week-calendar/edit", function (message) {
            });
        });

        this.setState({
            stompClient: stompClient
        })

        var socket2 = SockJS('http://localhost:8080/week-calendar/add-or-delete'); // <3>
        var stompClient2 = Stomp.over(socket2);
        stompClient2.connect({}, function (frame) {
            stompClient2.subscribe("/socket/week-calendar/add-or-delete", function (message) {
            });
        });
        this.setState({
            stompClient2: stompClient2
        })
    }
}

export default TSMD_ClassCalendarEdit;