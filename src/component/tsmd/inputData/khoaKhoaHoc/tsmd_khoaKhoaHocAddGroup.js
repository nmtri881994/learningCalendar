/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_KhoaKhoaHocAddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            groupNumber: 0,
            addingGroupKhoaKhoaHocId: 0,
            mess: ""
        }

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onGroupNumberChange = this._onGroupNumberChange.bind(this);
        this._onAdd = this._onAdd.bind(this);

    }


    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addingGroupKhoaKhoaHocId != 0) {
            API.getNhomOfKhoaKhoaHoc(nextProps.addingGroupKhoaKhoaHocId, (groups) => {
                if (groups != "") {
                    this.setState({
                        addingGroupKhoaKhoaHocId: nextProps.addingGroupKhoaKhoaHocId,
                        groups: groups
                    })
                } else {
                    this.setState({
                        groups: [],
                        addingGroupKhoaKhoaHocId: nextProps.addingGroupKhoaKhoaHocId
                    })
                }
            }, (error) => {
                console.log(error);
            })
        }
    }

    close() {
        var modal = $("#myModal1")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        var modal = $("#myModal1")[0];
        modal.style.display = "none";
        this.props._onReload();
    }

    _onGroupNumberChange(e) {
        this.setState({
            groupNumber: e.target.value
        })
    }

    _onAdd() {
        const groups = this.state.groups;
        let coincident = false;
        for (let i = 0; i < groups.length; i++) {
            if (this.state.groupNumber == groups[i].nhom) {
                coincident = true;
                break;
            }
        }
        if (coincident) {
            this.setState({
                mess: "Nhóm "+this.state.groupNumber+" đã bị trùng"
            })
        } else {
            API.khoaKhoaHocAddNhom(this.state.addingGroupKhoaKhoaHocId, this.state.groupNumber, (groups) => {
                this.setState({
                    groups: groups
                })
            }, (error) => {
                console.log(error);
            })
        }

    }

    _onDelete(groupId) {
        API.deleteNhom(this.state.addingGroupKhoaKhoaHocId, 0, groupId, (groups) => {
            if (groups != "") {
                this.setState({
                    groups: groups
                })
            } else {
                this.setState({
                    groups: []
                })
            }

        }, (error) => {
            console.log(error);
        })
    }

    render() {
        const groups = this.state.groups;
        return (<div id="myModal1" className="modal">
            {/*<!-- Modal content -->*/}
            <div className="modal-content modal-small">
                <div className="modal-header text-center">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>Nhóm của khoa - khóa học</h3>
                </div>
                <div className="modal-body">
                    {groups.map(group =>
                        <div className="section2" key={group.id}>
                            <span style={{
                                display: 'inline-block',
                                backgroundColor: "#F8BBD0",
                                borderRadius: 5,
                                padding: "5px 0px 5px 5px"
                            }} className="input-medium">
                                {group.nhom}
                            </span>
                            <button className="delete-button margin-left-20 button-mini" onClick={() => {
                                this._onDelete(group.id)
                            }}>Xóa
                            </button>
                        </div>
                    )}
                    <div className="section">
                        <input placeholder="nhóm" className="input-medium" type="number"
                               onChange={this._onGroupNumberChange}/>
                        <button className="margin-left-20 button-mini ok-button" onClick={this._onAdd}>Thêm</button>
                    </div>
                    <div className="section">
                        <div className="error-message">{this.state.mess}</div>
                    </div>
                </div>
                <div className="modal-footer text-center">
                    <button className="ok-button button-mini" onClick={this._handleSubmit}>Xong</button>
                </div>
            </div>

        </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }
}

export default TSMD_KhoaKhoaHocAddGroup