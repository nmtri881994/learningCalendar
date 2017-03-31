/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'
import {DATE_FORMAT_PICKER} from '../../configuration/appConfig'

//Import APIS
import * as API from '../../apiUtility/studentApi'

//import actions
import {editCalendarNote} from '../../action/studentAction'

class EditClass extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            lessonId: 0,
            lessonName: "",
            studentNote: "",
            currentDate: ""
        }

        this.handleStudentNoteChange = this.handleStudentNoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.lessonId != 0){
            API.getCalendarStudentNote(nextProps.lessonId, (note)=>{
                this.setState({
                    studentNote: note
                })
            }, (error) => {
                console.log("error: ", error);
            })
        }
        this.setState({
            lessonId: nextProps.lessonId,
            lessonName: nextProps.lessonName,
            currentDate: nextProps.currentDate
        })
    }


    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    handleStudentNoteChange(e){
        this.setState({
            studentNote: e.target.value
        })
    }

    handleSubmit(){
        var editStudentNote = {
            lessonId: this.state.lessonId,
            editedNote: this.state.studentNote
        }
        editCalendarNote(editStudentNote, this.state.currentDate)
    }

    render() {
        return (<div>
            {/*<!-- The Modal -->*/}
            <div id="myModal" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.close}>&times;</span>
                        <h2>{this.state.lessonName}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="field-section">
                            <div className="edit-title">
                                Thay đổi ghi chú cá nhân
                            </div>
                            <textarea className="edit-note-textArea fullLength" value={this.state.studentNote} onChange={this.handleStudentNoteChange}/><br/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleSubmit}>Lưu</button>
                        {/*<button >Cancel</button>*/}
                    </div>
                </div>

            </div>
        </div>);
    }

    componentDidMount() {
        var dateToday = new Date();
        $('#datetimepicker').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
            minDate: dateToday
        });

        const set = (val) => this.setState(val);
        // var lessonDetail = this.state.lessonDetail;
        // console.log(lessonDetail);

        $('#datetimepicker').change(function (val) {
            // var lessonDetail = this.state.lessonDetail;
            // console.log(val);
            var date = $('#datetimepicker').val();
            // console.log("1",lessonDetail);
            set({dateChange: date});
        });
    }
}

export default EditClass;