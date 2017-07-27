/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_EditKhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                id: 0,
                maGiangDuong: "",
                ten: "",
                dmLoaiPhong: {
                    id: 0,
                    ten: ""
                },
                tang: 0,
                soLuong: 0
            },
            roomTypes: []
        }
        this._onRoomCodeChange = this._onRoomCodeChange.bind(this);
        this._onRoomNameChange = this._onRoomNameChange.bind(this);
        this._onRoomTypeChange = this._onRoomTypeChange.bind(this);
        this._onFloorChange = this._onFloorChange.bind(this);
        this._onQuantityChange = this._onQuantityChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            room: nextProps.room,
            roomTypes: nextProps.roomTypes
        })

    }

    close() {
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _handleSubmit() {
        var room = this.state.room;
        this.props._editRoom({
            id: room.id,
            maGiangDuong: room.maGiangDuong,
            ten: room.ten,
            loaiPhongId: room.dmLoaiPhong.id,
            tang: room.tang,
            soLuong: room.soLuong
        });
        var modal = $("#myModal")[0];
        modal.style.display = "none";
    }


    _onRoomCodeChange(e) {
        let room = this.state.room;
        room.maGiangDuong = e.target.value;
        this.setState({
            room: room
        })
    }

    _onRoomNameChange(e) {
        let room = this.state.room;
        room.ten = e.target.value;
        this.setState({
            room: room
        })
    }

    _onRoomTypeChange(e) {
        let room = this.state.room;
        room.dmLoaiPhong.id = e.target.value;
        this.setState({
            room: room
        })
    }

    _onFloorChange(e) {
        let room = this.state.room;
        room.tang = e.target.value;
        this.setState({
            room: room
        })
    }

    _onQuantityChange(e) {
        let room = this.state.room;
        room.soLuong = e.target.value;
        this.setState({
            room: room
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
                        <div className="section-title margin-left-20">Nhập thông tin khoa</div>
                        <div>
                            <div className="edit-title">Mã giảng đường</div>
                            <input className="input-medium" value={this.state.room.maGiangDuong}
                                   onChange={this._onRoomCodeChange}/>
                        </div>
                        <div>
                            <div className="edit-title">Tên giảng đường</div>
                            <input className="input-medium" value={this.state.room.ten}
                                   onChange={this._onRoomNameChange}/>
                        </div>
                        <div>
                            <div className="edit-title">
                                Loại giảng đường
                            </div>
                            <select className="input-medium" value={this.state.room.dmLoaiPhong.id}
                                    onChange={this._onRoomTypeChange}>
                                {this.state.roomTypes.map(roomType => <option key={roomType.id}
                                                                              value={roomType.id}>{roomType.ten}</option>)}
                            </select>
                        </div>
                        <span>
                            <span className="edit-title">Tầng</span>
                            <input type="number" className="input-mini margin-left-20" value={this.state.room.tang}
                                   onChange={this._onFloorChange}/>
                        </span>
                        <span className="margin-left-20">
                            <span className="edit-title">Số lượng</span>
                            <input type="number" className="input-mini margin-left-20" value={this.state.room.soLuong}
                                   onChange={this._onQuantityChange}/>
                        </span>
                        <br/>

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

export default TSMD_EditKhoa