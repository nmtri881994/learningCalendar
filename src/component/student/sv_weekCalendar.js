import React, {Component} from 'react'
import moment from 'moment'

//Import actions
import {getCurrentWeekCalendar} from '../../action/studentAction'

//Import components
import Weekday from '../calendar/weekday'

class SV_WeekCalendar extends Component {

    constructor(props){
        super(props);
        this.state = {
            lopHocThu2s: [],
            lopHocThu3s: [],
            lopHocThu4s: [],
            lopHocThu5s: [],
            lopHocThu6s: [],
            lopHocThu7s: [],
            lopHocCNs: []
        }
    }

    componentWillMount(){
        getCurrentWeekCalendar(moment().format("YYYY-MM-DD"));
    }

    getTietNumbersFromTiets(tiets){
        var tietNumbers = [];
        for(var m =0; m < tiets.length; m++) {
            switch (tiets[m].tkb_tiet.ten){
                case "Tiết 1":
                    tietNumbers.push(1);
                    break;
                case "Tiết 2":
                    tietNumbers.push(2);
                    break;
                case "Tiết 3":
                    tietNumbers.push(3);
                    break;
                case "Tiết 4":
                    tietNumbers.push(4);
                    break;
                case "Tiết 5":
                    tietNumbers.push(5);
                    break;
                case "Tiết 6":
                    tietNumbers.push(6);
                    break;
                case "Tiết 7":
                    tietNumbers.push(7);
                    break;
                case "Tiết 8":
                    tietNumbers.push(8);
                    break;
                case "Tiết 9":
                    tietNumbers.push(9);
                    break;
                case "Tiết 10":
                    tietNumbers.push(10);
                    break;
                default:
                    console.log(tiets[m].tkb_tiet.ten);
            }
        }

        return tietNumbers;
    }

    componentWillReceiveProps(nextProps){

        var lopHocThu2s = [];
        var lopHocThu3s = [];
        var lopHocThu4s = [];
        var lopHocThu5s = [];
        var lopHocThu6s = [];
        var lopHocThu7s = [];
        var lopHocCNs = [];

        var weekCalendar = nextProps.weekCalendar;

        if(weekCalendar != null){
            for(var i = 0; i< weekCalendar.length; i++){
                var name = weekCalendar[i].monHoc.ten;
                var lichHocTheoNgays = weekCalendar[i].tkb_lichHocTheoNgays;
                for(var j = 0; j< lichHocTheoNgays.length; j++){
                    var tiets = [];
                    var tietNumbers = [];
                    switch(lichHocTheoNgays[j].tkb_thu.ten){
                        case "Thứ 2":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu2s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Thứ 3":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu3s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Thứ 4":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu4s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Thứ 5":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu5s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Thứ 6":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu6s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Thứ 7":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocThu7s.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

                            break;
                        case "Chủ nhật":
                            tiets = lichHocTheoNgays[j].tkb_lichHocTheoNgay_tiets;
                            tietNumbers = this.getTietNumbersFromTiets(tiets);

                            var type;
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà lý thuyết"){
                                type="Lý thuyết";
                            }
                            if(lichHocTheoNgays[j].giangDuong.dayNha.ten == "Dãy nhà thực hành"){
                                type="Thực hành";
                            }

                            lopHocCNs.push({
                                name: name,
                                startLesson: Math.min(...tietNumbers),
                                endLesson: Math.max(...tietNumbers),
                                type: type
                            });

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
            lopHocCNs: lopHocCNs
        });

    }

    render() {
        return (
            <div className="calendar">
                <Weekday name="Thứ 2" lopHocs= {this.state.lopHocThu2s}/>
                <Weekday name="Thứ 3" lopHocs= {this.state.lopHocThu3s}/>
                <Weekday name="Thứ 4" lopHocs= {this.state.lopHocThu4s}/>
                <Weekday name="Thứ 5" lopHocs= {this.state.lopHocThu5s}/>
                <Weekday name="Thứ 6" lopHocs= {this.state.lopHocThu6s}/>
                <Weekday name="Thứ 7" lopHocs= {this.state.lopHocThu7s}/>
                <Weekday name="Chủ nhật" lopHocs= {this.state.lopHocCNs}/>
            </div>
        );
    }
}

export default SV_WeekCalendar;