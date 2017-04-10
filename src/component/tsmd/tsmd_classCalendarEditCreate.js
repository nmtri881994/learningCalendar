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
            chosenEndLessonId: 0
        }

        this.switchMode = this.switchMode.bind(this);
    }

    switchMode() {
        const element = findDOMNode(this.refs.detail)
        $(element).slideToggle(300);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        this.setState({
            classId: this.props.classId
        });

        API.getClassType(this.props.classId, (classType) => {
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
                    API.getRooms(this.props.classId, dayNhaId, (rooms) => {
                        this.setState({
                            rooms: rooms,
                            chosenRoomId: rooms[0].id
                        });
                        API.getAvailableLessons(0, weekDays[0].id, rooms[0].id, (lessons) => {
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

    refreshLesson(message) {
        var weekCalendar = JSON.parse(message.body);
        // if(weekCalendar.roomId == this.state.chosenRoomId && weekCalendar.weekDayId == this.state.chosenWeekDayId){
        API.getAvailableLessons(0, this.state.chosenWeekDayId, this.state.chosenRoomId, (lessons) => {
            this.setState({
                availableLessons: lessons,
                chosenStartLessonId: lessons[0].id,
                chosenEndLessonId: lessons[0].id
            });
            this.setAvailableEndLessonsCorresspondingToChosenStartLessons(lessons[0].id);
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
        return (<div className="class-week-calendar-time">
            <div className="week-calendar-time-summary" onClick={this.switchMode}>
                Thêm lịch
            </div>
            <div className="week-calendar-time-detail hide" ref="detail">
                <div className="edit-title">
                    Thứ
                </div>
                <select className="halfLength">
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
                <select className="halfLength">
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.ten}</option>)}
                </select>
                <div className="edit-title">
                    Từ tiết
                </div>
                <select id="start-lesson-selecbox" className="halfLength">
                    {availableLessons.map(availableLesson => <option key={availableLesson.id}
                                                                     value={availableLesson.id}>{availableLesson.ten}</option>)}
                </select>
                <div className="edit-title">
                    Tới tiết
                </div>
                <select id="end-lesson-selecbox" className="halfLength">
                    {availableEndLessons.map(availableEndLesson => <option key={availableEndLesson.id}
                                                                           value={availableEndLesson.id}>{availableEndLesson.ten}</option>)}
                </select>
                <div className="action-corner">
                    <button>OK</button>
                </div>
                <div className="error-message">
                </div>
            </div>
        </div>);
    }

    componentDidMount() {
        var socket = SockJS('http://localhost:8080/week-calendar'); // <3>
        var stompClient = Stomp.over(socket);
        var refreshLesson = (message) => this.refreshLesson(message);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/week-calendar", function (message) {
                refreshLesson(message);
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default TSMD_ClassCalendarCreate;
