/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'
import Weekday from './weekday'
import WeekdayTest from './weekdayTest'
class Calendar extends Component{
    render(){
        return (
            <div className="calendar">
                <Weekday name="Monday" date="23"/>
                <WeekdayTest name="Tuesday" date="24"/>
            </div>
        );
    }
}

export default Calendar;