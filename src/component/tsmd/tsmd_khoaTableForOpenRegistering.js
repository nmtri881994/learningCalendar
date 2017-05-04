/**
 * Created by XuanVinh on 4/19/2017.
 */
import React, {Component} from 'react'
import moment from 'moment'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import configs
import {DATE_TIME_FORMAT_DISPLAY} from '../../configuration/appConfig'

//import APIs
import * as API from '../../apiUtility/tsmdApi'

class TSMD_KhoaTableForOpenRegistering extends Component {
    constructor(props) {
        super(props);

        this.state={
            stompClient: null,

            khoas: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.khoas.length != 0) {
            var khoas = nextProps.khoas;

            this.setState({
                khoas: khoas
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            khoas.map(khoa => {
                var khoa_khoaHocs = khoa.khoa_khoaHocs;
                khoa_khoaHocs.map(khoa_khoaHoc => {
                    var registerTime = khoa_khoaHoc.registerTimes[0];
                    var disable = "";
                    if(!registerTime){
                        disable = "disabled = 'disabled'";
                    }
                    var openning = false;
                    var id = 0;
                    if (registerTime) {
                        openning = registerTime.status;
                        id = registerTime.id;
                    }
                    var checked = "";
                    if (openning) {
                        checked = "checked"
                    }
                    myTable.fnAddData([
                        index,
                        khoa.ten,
                        khoa_khoaHoc.khoaHoc.nam,
                        registerTime ? moment(registerTime.startTime).format(DATE_TIME_FORMAT_DISPLAY) : "chưa xác định",
                        registerTime ? moment(registerTime.endTime).format(DATE_TIME_FORMAT_DISPLAY) : "chưa xác định",
                        '<label class="switch"> <input '+disable+' class="status-switch" data-id="' + id + '" type="checkbox" ' + checked + ' > <div class="slider round"></div> </label>'
                    ]);
                    index++;
                })

            })
        }
    }

    componentWillMount() {
    }

    render() {
        return (<div className="data-table">
            <table id="myTable" className="display" cellSpacing="0">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Khoa</th>
                    <th>Khóa học</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Tình trạng</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Khoa</th>
                    <th>Khóa học</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Tình trạng</th>
                </tr>
                </tfoot>
                <tbody>
                </tbody>
            </table>
        </div>)
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#myTable').DataTable();
        });

        var socket = SockJS('http://localhost:8080/register'); // <3>
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/register", function (message) {
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }

    openRegistering(registerTimeId, statusSwitch) {
        if (registerTimeId != 0) {
            API.openRegistering(registerTimeId, () => {
                var message = {
                    canRegister: true,
                    registerTimeId: registerTimeId
                }

                this.state.stompClient.send("/socket/register",{}, JSON.stringify(message))
            }, (error) => {
                console.log(error);
            });
        }

    }

    closeRegistering(registerTimeId, statusSwitch) {
        if (registerTimeId != 0) {
            API.closeRegistering(registerTimeId, () => {
                var message = {
                    canRegister: false,
                    registerTimeId: registerTimeId
                }

                this.state.stompClient.send("/socket/register",{}, JSON.stringify(message))
            }, (error) => {
                console.log(error);
            });
        }
    }

    componentDidUpdate() {
        var openRegistering = (registerTimeId) => this.openRegistering(registerTimeId);
        var closeRegistering = (registerTimeId) => this.closeRegistering(registerTimeId);
        $(document).ready(function () {
            $('.status-switch').on('click', function (evt) {
                var attr = $(this).attr('checked');
                if (typeof attr !== typeof undefined && attr !== false) {
                    closeRegistering($(this).attr("data-id"), $(this));
                    $(this).removeAttr("checked");
                } else {
                    openRegistering($(this).attr("data-id"), $(this));
                    $(this).attr("checked","checked");
                }
            })

        })
    }
}

export default TSMD_KhoaTableForOpenRegistering