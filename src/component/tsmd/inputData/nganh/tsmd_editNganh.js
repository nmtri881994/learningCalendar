/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditNganh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nganh:{
                id: 0,
                ten: ""
            },
            errorMess1: ""
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onTenNganhChange = this._onTenNganhChange.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            nganh: nextProps.nganh
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        if(this.state.nganh.ten == ""){
            this.setState({
                errorMess: "Chưa nhập tên ngành"
            })
        }else{
            this.setState({
                errorMess: ""
            })
            this.props._onEditNganh(this.state.nganh);
            var modal = $("#myModal")[0];
            modal.style.display = "none";
        }

    }

    _onTenNganhChange(e){
        let nganh = this.state.nganh;
        nganh.ten = e.target.value;
        this.setState({
            nganh: nganh
        })
    }

    render() {
        return (<div id="myModal" className="modal">

            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Thay đổi thông tin khoa</h3>
                </div>
                <div className="modal-body">
                    <div className="section">
                        <div className="choose-condition-item">
                            <span className="edit-title">Tên ngành</span>
                            <input className="input-large margin-left-20" value={this.state.nganh.ten}
                                   onChange={this._onTenNganhChange}/>
                        </div>
                        <div className="error-message margin-left-20">{this.state.errorMess1}</div>
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

export default TSMD_EditNganh