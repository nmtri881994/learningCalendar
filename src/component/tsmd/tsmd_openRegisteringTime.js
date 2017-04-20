/**
 * Created by XuanVinh on 4/19/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../apiUtility/tsmdApi'

//import components
import TSMD_KhoaTableForOpenRegistering from './tsmd_khoaTableForOpenRegistering'

class TSMD_OpenRegisteringTime extends Component {

    constructor(props) {
        super(props);

        this.state = {
            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermsId: 0,
            khoas: []
        }

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        API.getYearsNotEnd((years) => {
            API.getSemestersNotEndOfYear(years[0].id, (terms) => {
                this.setState({
                    years: years,
                    chosenYearId: years[0].id,
                    terms: terms,
                    chosenTermId: terms[0].id
                })
            })
        })
    }

    handleYearChange(e) {
        var yearId = e.target.value;
        API.getSemestersNotEndOfYear(yearId, (terms) => {
            this.setState({
                chosenYearId: yearId,
                terms: terms,
                chosenTermId: terms[0].id
            })
        })
    }

    handleTermChange(e) {
        var termId = e.target.value;
        this.setState({
            chosenTermId: termId
        })
    }

    handleSubmit() {
        API.getKhoas(this.state.chosenYearId, this.state.chosenTermId,(khoas) =>{
            this.setState({
                khoas: khoas
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        var years = this.state.years;
        var terms = this.state.terms;
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
                    <button onClick={this.handleSubmit}>OK</button>
                </div>
            </div>
            <div id="classes-table">
                <TSMD_KhoaTableForOpenRegistering khoas={this.state.khoas} />
            </div>
        </div>)
    }

    componentDidMount() {
    }
}

export default TSMD_OpenRegisteringTime;