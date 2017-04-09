/**
 * Created by Tri on 3/2/2017.
 */

import React, {Component} from 'react';

class TSMD_NavSideBar extends Component {
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
                                        <strong>Thiết lập</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="/giaovu/sap-xep-tkb" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">Sắp xếp thời khóa biểu</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/mo-dang-ky" className="slide-bar-nav-inner-item-link">
                                                <span className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                                <span className="slide-bar-nav-inner-item-title">Mở đăng ký</span>
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

export default TSMD_NavSideBar;