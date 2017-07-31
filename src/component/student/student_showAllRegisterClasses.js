/**
 * Created by XuanVinh on 4/22/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import {APP_URL} from '../../configuration/appConfig'

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
        // var monRegistered = [];
        // classes.map(cl => {
        //     if(cl.registered){
        //         monRegistered.push(cl.class.dmMonHoc.id)
        //     }
        // })
        this.setState({
            message: ""
        })
        if (classes.length > 0) {
            classes.sort(function (a,b) {
                return a.class.id - b.class.id;
            })
            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();
            var index = 1;
            classes.map(cl => {
                var class1 = cl.class;
                var disabled = "";
                if (cl.quantity >= class1.soLuongToiDa) {
                    disabled = "disabled = 'disabled'"
                }

                // if(monRegistered.indexOf(cl.class.dmMonHoc.id)){
                //     disabled = "disabled = 'disabled'"
                // }
                myTable.fnAddData([
                    index,
                    class1.dmMonHoc.maMonHoc + "." + cl.maKhoa + "." + class1.tkb_khoa_khoaHoc.tkb_khoaHoc.nam + "." + class1.id,
                    class1.dmMonHoc.ten,
                    class1.dmMonHoc.soTinChi,
                    class1.dmNhanVien.hoDem + " " + class1.dmNhanVien.ten,
                    class1.soTietLyThuyet,
                    class1.soTietThucHanh,
                    cl.quantity + "/" + class1.soLuongToiDa,
                    cl.registered ? '<button class="delete-button button-mini" data-id="' + class1.id + '">Hủy</button>' : '<button ' + disabled + ' class="ok-button button-mini" data-id="' + class1.id + '">Chọn</button>'
                ]);
                index++;
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


        var socket = SockJS(`${APP_URL}/student/register`); // <3>
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
            if (result == 1) {
                var message = {
                    type: 1,
                    classId: classId
                }

                this.state.stompClient.send("/socket/student/register", {}, JSON.stringify(message))
            }
        }, (error) => {
            console.log(error);
        })
    }

    cancelRegister(classId) {
        API.cancelRegisterClass(classId, (result) => {
            if (result) {
                var message = {
                    type: 2,
                    classId: classId
                }

                this.state.stompClient.send("/socket/student/register", {}, JSON.stringify(message))
            }
        }, (error) => {
            console.log(error);
        })
    }

    componentDidUpdate() {

        var register = (classId) => this.register(classId);
        var cancelRegister = (classId) => this.cancelRegister(classId);
        $(document).ready(function () {
            $('.ok-button').on('click', function (evt) {
                register($(this).attr("data-id"));
            })
            $('.delete-button').on('click', function (evt) {
                cancelRegister($(this).attr("data-id"));
            })
        })
    }

}

export default Student_ShowAllRegisterClasses;