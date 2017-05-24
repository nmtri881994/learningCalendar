/**
 * Created by Tri on 3/2/2017.
 */

import React, {Component} from 'react';

//import Components
import Student_Time from './student_time'

class NavSideBar extends Component {
    render() {
        return (
            <div className="slide-bar">
                <div className="slide-bar-wrapper">
                    <div className="slide-bar-body">
                        <header></header>
                        <nav className="slide-bar-nav">
                            <div className="slide-bar-nav-inner">
                                <Student_Time canRegister={this.props.canRegister}/>
                                <div className="slide-bar-nav-inner-calendars">
                                    <div className="slide-bar-nav-inner-heading">
                                        <strong>Thời khóa biểu</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="/sinhvien/thoi-khoa-bieu-tuan" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Theo tuần</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="slide-bar-nav-inner-calendars">
                                    <div className="slide-bar-nav-inner-heading not-first-heading">
                                        <strong>Đăng ký</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="/sinhvien/dang-ky-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Đăng ký học</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="slide-bar-footer">

                    </div>
                </div>
            </div>
        );
    }
}

export default NavSideBar;