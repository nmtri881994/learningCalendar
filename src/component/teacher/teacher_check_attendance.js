/**
 * Created by Tri on 7/9/2017.
 */
import React, {Component} from 'react'

//Import APIs
import * as API from '../../apiUtility/teacherApi'

class Teacher_Check_Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: 0,
            lessonName: "",
            students: [],
            checkAttendanceHistory: []
        }

        this.updatePresentStatus = this.updatePresentStatus.bind(this);
    }

    componentWillMount() {
    }

    checkAlreadyPresented(studentId, checkAttendanceHistory) {
        for (var i = 0; i < checkAttendanceHistory.length; i++) {
            if (studentId == checkAttendanceHistory[i].studentId) {
                return checkAttendanceHistory[i].presented;
            }
        }

        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lessonId != 0) {
            API.getStudentsOfLesson(nextProps.lessonId, (students) => {
                API.getLessonCheckAttendanceHistory(nextProps.lessonId, (checkAttendanceHistory) => {
                    var myTable = $('#myTable').dataTable();
                    var index = 1;
                    students.map(student => {
                        var checked = "";
                        if(this.checkAlreadyPresented(student.id, checkAttendanceHistory)){
                            checked = "checked"
                        }
                        myTable.fnAddData([
                            index,
                            student.maSinhVien,
                            student.hoDem + " " + student.ten,
                            student.lop,
                            '<input type="checkbox" class="present-status" data-student-id='+student.id+' '+checked+'/>'
                        ]);
                        index++;
                    })
                    this.setState({
                        lessonId: nextProps.lessonId,
                        lessonName: nextProps.lessonName,
                        students: students,
                        checkAttendanceHistory: checkAttendanceHistory
                    }, (error) => {
                        console.log(error);
                    })
                }, (error) => {
                    console.log(error);
                })
            })
        }

    }

    close() {
        var modal = $("#myModal2")[0];
        modal.style.display = "none";
    }

    render() {
        return (
            <div id="myModal2" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content modal-medium">
                    <div className="modal-header">
                        <span className="close" onClick={this.close}>&times;</span>
                        <h2>{this.state.lessonName}</h2>
                    </div>
                    <div className="data-table data-table-align">
                        <table id="myTable" className="display" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>MSV</th>
                                <th>Họ và tên</th>
                                <th>Lớp</th>
                                <th>Có mặt</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>STT</th>
                                <th>MSV</th>
                                <th>Họ và tên</th>
                                <th>Lớp</th>
                                <th>Có mặt</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">

                    </div>
                </div>

            </div>
        )
    }

    componentDidMount() {

    }

    updatePresentStatus(studentId, status){
        API.updatePresentStatus(this.state.lessonId, studentId, status);
    }

    componentDidUpdate() {
        var updatePresentStatus = (studentId, status) => this.updatePresentStatus(studentId, status);
        $(document).ready(function () {
            $('.present-status').on('click', function () {
                var attr = $(this).attr('checked');
                if (typeof attr !== typeof undefined && attr !== false) {
                    updatePresentStatus($(this).attr("data-student-id"), false);
                    $(this).removeAttr("checked");
                } else {
                    updatePresentStatus($(this).attr("data-student-id"), true);
                    $(this).attr("checked","checked");
                }
            })
        })
    }
}

export default Teacher_Check_Attendance