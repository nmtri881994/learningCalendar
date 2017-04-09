/**
 * Created by Tri on 4/8/2017.
 */
import React, {Component} from 'react'

class TSMD_ClassCalendar extends Component {
    render() {
        return (<div className="class-week-calendar-time">
            <span className="week-calendar-time-summary">123321</span>
            <div className="week-calendar-time-detail">
                <div className="edit-title">
                    Thứ
                </div>
                <select className="halfLength">

                </select>
                <div className="edit-title">
                    Phòng
                </div>
                <select className="halfLength">

                </select>
                <div className="edit-title">
                    Từ tiết
                </div>
                <select id="start-lesson-selecbox" className="halfLength">
                </select>
                <div className="edit-title">
                    Tới tiết
                </div>
                <select id="end-lesson-selecbox" className="halfLength">
                </select>
                <div className="action-corner">
                    <button>OK</button>
                    <button className="week-calendar-time-cancel-button">Cancel</button>
                </div>
                <div className="error-message">
                </div>
            </div>
        </div>);
    }
    
    // componentDidMount(){
    //     $(document).ready(function () {
    //         $('.class-week-calendar-time').on('click', function (evt) {
    //             alert(1);
    //             $(this>'.week-calendar-time-detail').css("display", "block");
    //         })
    //     })
    // }
}

export default TSMD_ClassCalendar;