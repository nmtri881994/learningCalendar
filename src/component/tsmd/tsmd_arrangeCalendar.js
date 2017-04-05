/**
 * Created by Tri on 4/4/2017.
 */
import React, {Component} from 'react'

//import actions
import {getYearsNotEnd, getSemestersNotEndOfYear} from '../../action/tsmdAction'

//import APIs
import * as API from '../../apiUtility/tsmdApi'
import * as API2 from '../../apiUtility/calendarApi'

class TSMD_ArrangeCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            chosenMajorId: 0
        }

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
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
            })
        }, (error) => {
            console.log(error)
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
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillMount() {
        getYearsNotEnd();
    }

    handleYearChange(e) {
        this.setState({
            chosenYearId: e.target.value
        })
        API.getSemestersNotEndOfYear(e.target.value, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms[0].id
            })
        }, (error) => {
            console.log(error)
        })
    }

    handleTermChange(e) {
        this.setState({
            chosenTermId: e.target.value
        })
    }

    handleFacultyChange(e){
        this.setState({
            chosenFacultyId: e.target.value
        });
        API2.getAvailableYearOfAdmissions(e.target.value, this.state.chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
            this.setState({
                yearOfAdmissions: yearOfAdmissions,
                chosenYearOfAdmissionId: yearOfAdmissions[0].id
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        var years = this.state.years;
        var terms = this.state.terms;
        var faculties = this.state.faculties;
        var yearOfAdmissions = this.state.yearOfAdmissions;
        var haveMajor = this.state.haveMajor;
        var majors = this.state.majors;
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
                    <select className="year-select-long" onChange={this.handleFacultyChange} value={this.state.chosenFacultyId}>
                        {faculties.map(faculty => <option key={faculty.id} value={faculty.id}>{faculty.ten}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Khóa
                    </span>
                    <select className="year-select-short" value={this.state.chosenYearOfAdmissionId}>
                        {yearOfAdmissions.map(yearOfAdmission => <option key={yearOfAdmission.id}
                                                                         value={yearOfAdmission.id}>
                            {yearOfAdmission.nam}</option>)}
                    </select>
                </div>
                {haveMajor ? <div className="choose-condition-item">
                    <span className="edit-title">
                        Ngành
                    </span>
                        <select className="year-select-short">
                            {majors.map(major => <option key={major.id} value={major.id}>{major.ten}</option>)}
                        </select>
                    </div> : ""}
                <div className="choose-condition-item">
                    <button>OK</button>
                </div>
            </div>

        </div>)
    }
}

export default TSMD_ArrangeCalendar;