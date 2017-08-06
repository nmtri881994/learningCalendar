/**
 * Created by Tri on 4/4/2017.
 */
import React, {Component} from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

//import actions
import {getYearsNotEnd, getSemestersNotEndOfYear} from '../../action/tsmdAction'

//import APIs
import * as API from '../../apiUtility/tsmdApi'
import * as API2 from '../../apiUtility/calendarApi'

//import components
import TSMD_ShowAllClassesComponent from './tsmd_showAllClassesComponent'
import TSMD_EditClass from './tsmd_editClass'
import Week_Calendar from '../week_calendar/week_calendar'

//import config
import {APP_URL} from '../../configuration/appConfig'

class TSMD_ArrangeCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stompClient: null,

            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermId: 0,
            faculties: [],
            chosenFacultyId: 0,
            yearOfAdmissions: [],
            chosenYearOfAdmissionId: 0,
            haveMajor: false,
            majors: [],
            chosenMajorId: 0,
            classes: [],
            classes1: [],
            editingClassId: 0,
            editingClassName: ""
        }

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleYearOfAdmissionChange = this.handleYearOfAdmissionChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.triggerModal = this.triggerModal.bind(this);

        this.refreshCaledar = this.refreshCaledar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            years: nextProps.years,
            chosenYearId: nextProps.years[0].id,
        });
        API.getSemestersNotEndOfYear(nextProps.years[0].id, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms[0].id
            });
            API2.getAllFaculties((faculties) => {
                this.setState({
                    faculties: faculties,
                    chosenFacultyId: faculties[0].id
                });
                API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, this.state.chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
                    this.setState({
                        yearOfAdmissions: yearOfAdmissions,
                        chosenYearOfAdmissionId: yearOfAdmissions[0].id
                    });
                    API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                        this.setState({
                                haveMajor: true,
                                majors: majors,
                                chosenMajorId: majors[0].id
                            }
                        )
                    }, (error) => {
                        this.setState({
                                haveMajor: false,
                                majors: [],
                                chosenMajorId: 0
                            }
                        )
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error)
        });

    }

    componentWillMount() {
        getYearsNotEnd();
    }

    handleYearChange(e) {
        var chosenYearId = e.target.value;
        this.setState({
            chosenYearId: chosenYearId
        })
        API.getSemestersNotEndOfYear(e.target.value, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms[0].id
            });
            API2.getAllFaculties((faculties) => {
                this.setState({
                    faculties: faculties,
                    chosenFacultyId: faculties[0].id
                });
                API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
                    this.setState({
                        yearOfAdmissions: yearOfAdmissions,
                        chosenYearOfAdmissionId: yearOfAdmissions[0].id
                    });
                    API2.getAvailableMajors(chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                        this.setState({
                                haveMajor: true,
                                majors: majors,
                                chosenMajorId: majors[0].id
                            }
                        )
                    }, (error) => {
                        this.setState({
                                haveMajor: false,
                                majors: [],
                                chosenMajorId: 0
                            }
                        )
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error)
        });
    }

    handleTermChange(e) {
        var chosenTermId = e.target.value;
        this.setState({
            chosenTermId: chosenTermId
        });
        API2.getAllFaculties((faculties) => {
            this.setState({
                faculties: faculties,
                chosenFacultyId: faculties[0].id
            });
            API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, this.state.chosenYearId, chosenTermId, (yearOfAdmissions) => {
                this.setState({
                    yearOfAdmissions: yearOfAdmissions,
                    chosenYearOfAdmissionId: yearOfAdmissions[0].id
                });
                API2.getAvailableMajors(this.state.chosenYearId, chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                    this.setState({
                            haveMajor: true,
                            majors: majors,
                            chosenMajorId: majors[0].id
                        }
                    )
                }, (error) => {
                    this.setState({
                            haveMajor: false,
                            majors: [],
                            chosenMajorId: 0
                        }
                    )
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleFacultyChange(e) {
        var chosenFacultyId = e.target.value;
        this.setState({
            chosenFacultyId: chosenFacultyId
        });
        API2.getAvailableYearOfAdmissions(chosenFacultyId, this.state.chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
            this.setState({
                yearOfAdmissions: yearOfAdmissions,
                chosenYearOfAdmissionId: yearOfAdmissions[0].id
            });
            API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {

                this.setState({
                        haveMajor: true,
                        majors: majors,
                        chosenMajorId: majors[0].id
                    }
                )
            }, (error) => {
                this.setState({
                        haveMajor: false,
                        majors: [],
                        chosenMajorId: 0
                    }
                )
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleYearOfAdmissionChange(e) {
        this.setState({
            chosenYearOfAdmissionId: e.target.value
        });
        API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, e.target.value, (majors) => {
            this.setState({
                    haveMajor: true,
                    majors: majors,
                    chosenMajorId: majors[0].id
                }
            )
        }, (error) => {
            this.setState({
                    haveMajor: false,
                    majors: [],
                    chosenMajorId: 0
                }
            )
        })
    }

    handleMajorChange(e) {
        this.setState({
            chosenMajorId: e.target.value
        })
    }

    handleSubmit() {
        var state = this.state;
        API2.getClasses(state.chosenYearId, state.chosenTermId, state.chosenFacultyId, state.chosenYearOfAdmissionId, state.chosenMajorId, (classes) => {
            let classes1 = [];
            classes.map(cl => {
                classes1.push({
                    class: cl
                })
            })
            this.setState({
                classes: classes,
                classes1: classes1
            });
        }, (error) => {
            console.log(error);
        });
    }

    triggerModal(id, name) {
        this.setState({
            editingClassId: id,
            editingClassName: name
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    render() {
        var years = this.state.years;
        var terms = this.state.terms;
        var faculties = this.state.faculties;
        var yearOfAdmissions = this.state.yearOfAdmissions;
        var haveMajor = this.state.haveMajor;
        var majors = this.state.majors;

        var chosenKhoa;
        for (var i = 0; i < faculties.length; i++) {
            if (faculties[i].id == this.state.chosenFacultyId) {
                chosenKhoa = faculties[i];
                break;
            }
        }

        var chosenYearOfAdmission;
        for (var i = 0; i < yearOfAdmissions.length; i++) {
            if (yearOfAdmissions[i].id == this.state.chosenYearOfAdmissionId) {
                chosenYearOfAdmission = yearOfAdmissions[i];
                break;
            }
        }

        return (<div>
            <div className="choose-condition">
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Năm học
                    </span>
                    <select className="year-select-short" onChange={this.handleYearChange}
                            value={this.state.chosenYearId}>
                        {years.map(year => <option key={year.id} value={year.id}>{year.name}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Kỳ học
                    </span>
                    <select className="year-select-short" onChange={this.handleTermChange}
                            value={this.state.chosenTermId}>
                        {terms.map(term => <option key={term.id} value={term.id}>{term.ten}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Khoa
                    </span>
                    <select className="year-select-long" onChange={this.handleFacultyChange}
                            value={this.state.chosenFacultyId}>
                        {faculties.map(faculty => <option key={faculty.id} value={faculty.id}>{faculty.ten}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Khóa
                    </span>
                    <select className="year-select-short" onChange={this.handleYearOfAdmissionChange}
                            value={this.state.chosenYearOfAdmissionId}>
                        {yearOfAdmissions.map(yearOfAdmission => <option key={yearOfAdmission.id}
                                                                         value={yearOfAdmission.id}>
                            {yearOfAdmission.nam}</option>)}
                    </select>
                </div>
                {haveMajor ? <div className="choose-condition-item">
                    <span className="edit-title">
                        Ngành
                    </span>
                        <select className="year-select-long" onChange={this.handleMajorChange}
                                value={this.state.chosenMajorId}>
                            {majors.map(major => <option key={major.id} value={major.id}>{major.ten}</option>)}
                        </select>
                    </div> : ""}
                <div className="choose-condition-item">
                    <button className="ok-button button-mini" onClick={this.handleSubmit}>OK</button>
                </div>
            </div>
            <div id="classes-table">
                <TSMD_ShowAllClassesComponent khoa={chosenKhoa}
                                              khoaHoc={chosenYearOfAdmission}
                                              classes={this.state.classes} triggerModal={this.triggerModal}/>
            </div>

            <div id="classes-calendar">
                <Week_Calendar khoa={chosenKhoa} khoaHoc={chosenYearOfAdmission} classes={this.state.classes1}/>
            </div>
            <TSMD_EditClass termId={this.state.chosenTermId} yearId={this.state.chosenYearId}
                            facultyId={this.state.chosenFacultyId}
                            yearOfAdmissionId={this.state.chosenYearOfAdmissionId} majorId={this.state.chosenMajorId}
                            classId={this.state.editingClassId} className={this.state.editingClassName}/>

        </div>)
    }

    refreshCaledar(classId) {
        var shoudldRefresh = false;
        var classes = this.state.classes;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].id == classId) {
                shoudldRefresh = true;
                break;
            }
        }
        if (shoudldRefresh) {
            var state = this.state;
            API2.getClasses(state.chosenYearId, state.chosenTermId, state.chosenFacultyId, state.chosenYearOfAdmissionId, state.chosenMajorId, (classes) => {
                let classes1 = [];
                classes.map(cl=>{
                    classes1.push({
                        class: cl
                    })
                })
                this.setState({
                    classes: classes,
                    classes1: classes1
                });
            }, (error) => {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        var socket = SockJS(APP_URL + "/week-calendar/edit");
        var stompClient = Stomp.over(socket);

        var refresh = (classId) => this.refreshCaledar(classId);

        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/socket/week-calendar/edit", function (message) {
                refresh(JSON.parse(message.body).classId);
            });
        });
        this.setState({
            stompClient: stompClient
        })
    }
}

export default TSMD_ArrangeCalendar;