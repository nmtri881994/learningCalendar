import React, {Component} from 'react'
import moment from 'moment'

//Import actions
import {getCurrentWeekCalendar, getLearningYear, getWeekNumber} from '../../action/studentAction'

//Import components
import Weekday from '../calendar/weekday'

class SV_WeekCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lopHocThu2s: [],
            lopHocThu3s: [],
            lopHocThu4s: [],
            lopHocThu5s: [],
            lopHocThu6s: [],
            lopHocThu7s: [],
            lopHocCNs: [],
            year: null,
            weekNumber: 0
        }
    }

    componentWillMount() {
        var currentDate = moment().format("YYYY-MM-DD");
        getCurrentWeekCalendar(currentDate);
        getLearningYear(currentDate);
        getWeekNumber(currentDate);
    }

    getTietByTenTiet(tenTiet) {
        switch (tenTiet) {
            case "Tiết 1":
                return 1;
            case "Tiết 2":
                return 2;
            case "Tiết 3":
                return 3;
            case "Tiết 4":
                return 4;
            case "Tiết 5":
                return 5;
            case "Tiết 6":
                return 6;
            case "Tiết 7":
                return 7;
            case "Tiết 8":
                return 8;
            case "Tiết 9":
                return 9;
            case "Tiết 10":
                return 10;
            default:
                console.log(lichHocTheoNgay.tkb_tietDauTien.ten);
                return 0;
        }
    }

    getLopHoc(lichHocTheoNgay, name) {
        var type = "";
        if (lichHocTheoNgay.giangDuong.dayNha.ten == "Dãy nhà lý thuyết") {
            type = "Lý thuyết";
        }
        if (lichHocTheoNgay.giangDuong.dayNha.ten == "Dãy nhà thực hành") {
            type = "Thực hành";
        }

        var tietDauTien = this.getTietByTenTiet(lichHocTheoNgay.tkb_tietDauTien.ten);
        var tietCuoiCung = this.getTietByTenTiet(lichHocTheoNgay.tkb_tietCuoiCung.ten);

        return {
            name: name,
            startLesson: tietDauTien,
            endLesson: tietCuoiCung,
            type: type
        };
    }

    componentWillReceiveProps(nextProps) {
        var lopHocThu2s = [];
        var lopHocThu3s = [];
        var lopHocThu4s = [];
        var lopHocThu5s = [];
        var lopHocThu6s = [];
        var lopHocThu7s = [];
        var lopHocCNs = [];

        var weekCalendar = nextProps.weekCalendar;

        console.log(weekCalendar);

        if (weekCalendar != null) {
            for (var i = 0; i < weekCalendar.length; i++) {
                var name = weekCalendar[i].monHoc.ten;
                var lichHocTheoNgays = weekCalendar[i].tkb_lichHocTheoNgays;
                for (var j = 0; j < lichHocTheoNgays.length; j++) {
                    switch (lichHocTheoNgays[j].tkb_thu.ten) {
                        case "Thứ 2":
                            lopHocThu2s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 3":
                            lopHocThu3s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 4":
                            lopHocThu4s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 5":
                            lopHocThu5s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 6":
                            lopHocThu6s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Thứ 7":
                            lopHocThu7s.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        case "Chủ nhật":
                            lopHocCNss.push(this.getLopHoc(lichHocTheoNgays[j], name));
                            break;
                        default:
                            console.log(lichHocTheoNgays[j].tkb_thu.ten);
                    }
                }
            }
        }

        this.setState({
            lopHocThu2s: lopHocThu2s,
            lopHocThu3s: lopHocThu3s,
            lopHocThu4s: lopHocThu4s,
            lopHocThu5s: lopHocThu5s,
            lopHocThu6s: lopHocThu6s,
            lopHocThu7s: lopHocThu7s,
            lopHocCNs: lopHocCNs,
            year: nextProps.year,
            weekNumber: nextProps.weekNumber
        });

    }

    render() {
        return (
            <div>
                {this.state.year!=null?this.state.year.name:""} <br/>
                {this.state.weekNumber}
                <div className="calendar">
                    <Weekday name="Thứ 2" lopHocs={this.state.lopHocThu2s}/>
                    <Weekday name="Thứ 3" lopHocs={this.state.lopHocThu3s}/>
                    <Weekday name="Thứ 4" lopHocs={this.state.lopHocThu4s}/>
                    <Weekday name="Thứ 5" lopHocs={this.state.lopHocThu5s}/>
                    <Weekday name="Thứ 6" lopHocs={this.state.lopHocThu6s}/>
                    <Weekday name="Thứ 7" lopHocs={this.state.lopHocThu7s}/>
                    <Weekday name="Chủ nhật" lopHocs={this.state.lopHocCNs}/>
                </div>
            </div>

        );
    }
}

export default SV_WeekCalendar;