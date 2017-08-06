import React, {Component} from 'react'


//Import actions

//Import APIs
import * as API2 from '../../apiUtility/calendarApi'

//Import components
import Week_Weekday from './week_weekday'

class Week_Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: null,
            lopHocThu2s: [],
            lopHocThu3s: [],
            lopHocThu4s: [],
            lopHocThu5s: [],
            lopHocThu6s: [],
            lopHocThu7s: [],
            lopHocCNs: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.classes.length > 0 || nextProps.classes!=this.state.classes){
            var classes = nextProps.classes;
            this.setState({
                classes: classes
            })

            // var khoa = nextProps.khoa;

            var lopHocThu2s = [];
            var lopHocThu3s = [];
            var lopHocThu4s = [];
            var lopHocThu5s = [];
            var lopHocThu6s = [];
            var lopHocThu7s = [];
            var lopHocCNs = [];


            classes.map(cl => {
                var khoaHoc  = cl.class.tkb_khoa_khoaHoc.tkb_khoaHoc;
                cl.class.tkb_lichHocTheoTuans.map(tkb => {
                    switch (tkb.tkb_thu.ten) {
                        case "Thứ 2":
                            lopHocThu2s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Thứ 3":
                            lopHocThu3s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Thứ 4":
                            lopHocThu4s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Thứ 5":
                            lopHocThu5s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Thứ 6":
                            lopHocThu6s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Thứ 7":
                            lopHocThu7s.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        case "Chủ nhật":
                            lopHocCNs.push(this.getLopHoc(khoaHoc, cl.class.id, cl.class.dmMonHoc, cl.class.dmNhanVien, tkb));
                            break;
                        default:
                            console.log(tkb.tkb_thu.ten);
                    }
                })
            })
        }
        //
        // console.log(lopHocThu2s);
        // console.log(lopHocThu3s);
        // console.log(lopHocThu4s);
        // console.log(lopHocThu5s);
        // console.log(lopHocThu6s);
        // console.log(lopHocThu7s);
        // console.log(lopHocCNs);

        this.setState({
            lopHocThu2s: lopHocThu2s,
            lopHocThu3s: lopHocThu3s,
            lopHocThu4s: lopHocThu4s,
            lopHocThu5s: lopHocThu5s,
            lopHocThu6s: lopHocThu6s,
            lopHocThu7s: lopHocThu7s,
            lopHocCNs: lopHocCNs
        })
    }

    getLopHoc(khoaHoc, classId, dmMonHoc, dmNhanVien, tkb) {
        return {
            maLopHoc: dmMonHoc.maMonHoc + "." + khoaHoc.nam + "." + classId,
            dmMonHoc: dmMonHoc,
            dmNhanVien: dmNhanVien,
            dmGiangDuong: tkb.dmGiangDuong,
            tkb: tkb
        }
    }

    render() {
        return (
            <div className="calendar-panel">
                <div className="calendar">
                    <Week_Weekday name="Thứ 2" lopHocs={this.state.lopHocThu2s}/>
                    <Week_Weekday name="Thứ 3" lopHocs={this.state.lopHocThu3s}/>
                    <Week_Weekday name="Thứ 4" lopHocs={this.state.lopHocThu4s}/>
                    <Week_Weekday name="Thứ 5" lopHocs={this.state.lopHocThu5s}/>
                    <Week_Weekday name="Thứ 6" lopHocs={this.state.lopHocThu6s}/>
                    <Week_Weekday name="Thứ 7" lopHocs={this.state.lopHocThu7s}/>
                    <Week_Weekday name="Chủ nhật" lopHocs={this.state.lopHocCNs}/>
                </div>
            </div>

        );
    }

}

export default Week_Calendar;