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
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Sắp xếp thời khóa biểu</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/sap-xep-tkb/tu-dong" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Sắp xếp thời khóa biểu tự động</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/mo-dang-ky" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Mở đăng ký</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="slide-bar-nav-inner-calendars">
                                    <div className="slide-bar-nav-inner-heading not-first-heading">
                                        <strong>Nhập dữ liệu</strong>
                                    </div>
                                    <ul className="calendars">
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/khoa" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Khoa</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/khoa-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Khóa học</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/khoa-khoa-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Khoa - Khóa học</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/nganh" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Ngành</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/khoa-khoa-hoc-nganh" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Khoa - khóa học - ngành</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/nam-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Năm học</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/ki-hoc-nam-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Kì học - Năm học</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/lop-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Lớp</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/nhan-vien" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Nhân viên</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/nhan-vien-vai-tro" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Nhân viên - Vai trò</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/sinh-vien" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Sinh viên</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/sinh-vien-nganh" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Sinh viên - ngành</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/giang-duong" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Giảng đường</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/giaovu/nhap-du-lieu/mon-hoc" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Môn học</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Môn học - Giảng đường</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Lớp học phần</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Lớp học phần - Sinh viên</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Tiến độ</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="slide-bar-nav-inner-item-link">
                                                <div className="slide-bar-nav-inner-item-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div className="slide-bar-nav-inner-item-title">Các điều kiện ràng buộc</div>
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

export default TSMD_NavSideBar;