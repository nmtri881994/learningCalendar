import React, {Component} from 'react'


//Import actions

//Import APIs
import * as API2 from '../../apiUtility/calendarApi'

//Import components
import TSMD_Weekday from './tsmd_weekday'

class TSMD_Calendar extends Component {

    constructor(props) {
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

    componentWillReceiveProps(nextProps) {

        var lopHocThu2s = [];
        var lopHocThu3s = [];
        var lopHocThu4s = [];
        var lopHocThu5s = [];
        var lopHocThu6s = [];
        var lopHocThu7s = [];
        var lopHocCNs = [];

        var classes = nextProps.classes;
        classes.map(cl => {
            cl.tkb_lichHocTheoTuans.map(tkb => {
                switch (tkb.tkb_thu.ten){
                    case "Thứ 2":
                        lopHocThu2s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Thứ 3":
                        lopHocThu3s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Thứ 4":
                        lopHocThu4s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Thứ 5":
                        lopHocThu5s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Thứ 6":
                        lopHocThu6s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Thứ 7":
                        lopHocThu7s.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    case "Chủ nhật":
                        lopHocCNs.push(this.getLopHoc(cl.monHoc, cl.giaoVien, tkb));
                        break;
                    default:
                        console.log(tkb.tkb_thu.ten);
                }
            })
        })

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

    getLopHoc(monHoc, giaoVien, tkb){
        return {
            monHoc: monHoc,
            giaoVien: giaoVien,
            giangDuong: tkb.giangDuong,
            tkb_thu: tkb.tkb_thu,
            tkb_tietDauTien: tkb.tkb_tietDauTien,
            tkb_tietCuoiCung: tkb.tkb_tietCuoiCung
        }
    }

    render() {
        return (
            <div className="calendar-panel">
                <div className="calendar">
                    <TSMD_Weekday name="Thứ 2" lopHocs={this.state.lopHocThu2s}/>
                    <TSMD_Weekday name="Thứ 3" lopHocs={this.state.lopHocThu3s}/>
                    <TSMD_Weekday name="Thứ 4" lopHocs={this.state.lopHocThu4s}/>
                    <TSMD_Weekday name="Thứ 5" lopHocs={this.state.lopHocThu5s}/>
                    <TSMD_Weekday name="Thứ 6" lopHocs={this.state.lopHocThu6s}/>
                    <TSMD_Weekday name="Thứ 7" lopHocs={this.state.lopHocThu7s}/>
                    <TSMD_Weekday name="Chủ nhật" lopHocs={this.state.lopHocCNs}/>
                </div>
            </div>

        );
    }
}

export default TSMD_Calendar;