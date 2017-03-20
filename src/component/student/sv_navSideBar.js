/**
 * Created by Tri on 3/2/2017.
 */

import React, {Component} from 'react';

class NavSideBar extends Component {
    render() {
        return (
            <div className="slide-bar">
                <div className="slide-bar-wrapper">
                    <div className="slide-bar-body">
                        <header></header>
                        <nav className="slide-bar-nav">
                            <div className="slide-bar-nav-inner">
                                <div className="slide-bar-nav-inner-calendars">
                                    <div className="slide-bar-nav-inner-heading">
                                        <strong>Thời khóa biểu</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="/sinhvien/thoi-khoa-bieu-tuan" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">Theo tuần</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="slide-bar-nav-inner-calendars">
                                    <div className="slide-bar-nav-inner-heading not-first-heading">
                                        <strong>Thiết lập</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">1</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">2</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">3</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">4</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="slide-bar-footer">
                        aaaa
                    </div>
                </div>
            </div>
        );
    }
}

export default NavSideBar;