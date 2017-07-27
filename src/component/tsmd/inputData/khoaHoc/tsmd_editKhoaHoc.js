/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditKhoaHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: {
                id: 0,
                nam: 0
            }
        }

        this._onChangeYear = this._onChangeYear.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            term: nextProps.term
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        this.props._editTerm(this.state.term);
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }

    _onChangeYear(e){
        let term = this.state.term;
        term.nam = e.target.value;
        this.setState({
            term: term
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin khóa học</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div>
                            <div className="edit-title">Năm</div>
                            <input className="input-large" value={this.state.term.nam} onChange={this._onChangeYear}/>
                        </div>
                    </div>

                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Lưu</button>
                </div>
            </div>

        </div>)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default TSMD_EditKhoaHoc