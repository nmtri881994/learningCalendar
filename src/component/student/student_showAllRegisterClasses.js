/**
 * Created by XuanVinh on 4/22/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import APIs
import * as API from '../../apiUtility/studentApi'

class Student_ShowAllRegisterClasses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            stompClient: null
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        var classes = nextProps.classes;
        this.setState({
            message: ""
        })
        if (classes.length > 0) {
            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();
            classes.map(cl => {
                var class1 = cl.class;
                myTable.fnAddData([
                    cl.index,
                    class1.monHoc.maMonHoc + "." + cl.maKhoa + "." + class1.khoa_khoaHoc.khoaHoc.nam + "." + class1.id,
                    class1.monHoc.ten,
                    class1.monHoc.soTinChi,
                    class1.giaoVien.hoDem + " " + class1.giaoVien.ten,
                    class1.soTietLyThuyet,
                    class1.soTietThucHanh,
                    cl.quantity + "/" + class1.soLuongToiDa,
                    cl.registered ? '<button class="cancel-register-btn" data-id="' + class1.id + '">Hủy</button>' : '<button class="register-btn" data-id="' + class1.id + '">Chọn</button>'
                ]);
            });
        }

    }

    render() {
        return (<div>
            <div className="error-message">{this.state.message}</div>
            <div className="data-table">
                <table id="myTable" className="display" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Môn học</th>
                        <th>Tín chỉ</th>
                        <th>Giáo viên</th>
                        <th>Số tiết lý thuyết</th>
                        <th>Số tiết thực hành</th>
                        <th>Số lượng</th>
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
                        <th>Số tiết lý thuyết</th>
                        <th>Số tiết thực hành</th>
                        <th>Số lượng</th>
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

        var socket = SockJS('http://localhost:8080/student/register'); // <3>
        var stompClient = Stomp.over(socket);
        // stompClient.connect({}, function (frame) {
        //     stompClient.subscribe("/socket/student/register", function (message) {
        //     });
        // });
        this.setState({
            stompClient: stompClient
        })
    }

    register(classId) {
        API.registerClass(classId, (result) => {
            if(result == 1){
                var message = {
                    type: 1,
                    classId: classId
                }

                this.state.stompClient.send("/socket/student/register",{}, JSON.stringify(message))
            }
        }, (error) => {
            console.log(error);
        })
    }

    cancelRegister(classId) {
        API.cancelRegisterClass(classId, (result) => {
            if(result){
                var message = {
                    type: 2,
                    classId: classId
                }

                this.state.stompClient.send("/socket/student/register",{}, JSON.stringify(message))
            }
        }, (error) => {
            console.log(error);
        })
    }

    componentDidUpdate() {

        var register = (classId) => this.register(classId);
        var cancelRegister = (classId) => this.cancelRegister(classId);
        $(document).ready(function () {
            $('.register-btn').on('click', function (evt) {
                register($(this).attr("data-id"));
            })
            $('.cancel-register-btn').on('click', function (evt) {
                cancelRegister($(this).attr("data-id"));
            })
        })
    }

}

export default Student_ShowAllRegisterClasses;