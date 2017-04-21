/**
 * Created by Tri on 4/21/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../apiUtility/studentApi'

class Student_RegisterSubjectClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        var canRegister = nextProps.canRegister;

        var content = "";
        if (canRegister) {

            API.getClassesCanRegister(canRegister.registerTimeId, (classes) => {
                if(classes.length == 0){
                    content = "Bạn không có lớp nào để đăng ký trong đợt đăng ký này"
                }else{
                    var myTable = $('#myTable').dataTable();
                    myTable.fnClearTable();

                    var index = 1;
                    classes.map(cl => {
                        API.getFacultyCode(cl.khoa_khoaHoc.id, (maKhoa) => {
                            myTable.fnAddData([
                                index,
                                cl.monHoc.maMonHoc + "." + maKhoa + "." + cl.khoa_khoaHoc.khoaHoc.nam + "." + cl.id,
                                cl.monHoc.ten,
                                cl.monHoc.soTinChi,
                                cl.giaoVien.hoDem + " " + cl.giaoVien.ten,
                                '<button>Chọn</button>'
                            ]);
                        }, (error) => {
                            console.log(error);
                        })
                        index++;
                    })
                }
            }, (error) => {
                console.log(error);
            })
        } else {
            content = <div className="error-message">Bây giờ không phải thời gian đăng ký của bạn</div>;
        }

        this.setState({
            content: content
        })
    }

    render() {
        return (<div>
            {this.state.content}
            <div className="data-table">
                <table id="myTable" className="display" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Môn học</th>
                        <th>Tín chỉ</th>
                        <th>Giáo viên</th>
                        <th>Đăng ký</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Môn học</th>
                        <th>Tín chỉ</th>
                        <th>Giáo viên</th>
                        <th>Đăng ký</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>)
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#myTable').DataTable();

        });
    }

    componentDidUpdate() {

    }
}

export  default Student_RegisterSubjectClass