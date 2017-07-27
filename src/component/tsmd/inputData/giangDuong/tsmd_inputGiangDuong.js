/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API from '../../../../apiUtility/inputDataApi'

//import components
import TSMD_AllGiangDuongs from './tsmd_allGiangDuongs'
import TSMD_EditGiangDuong from './tsmd_editGiangDuong'

class TSMD_InputGiangDuong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomTypes: [],
            rooms: [],
            roomCode: "",
            roomName: "",
            roomTypeId: 0,
            floor: 0,
            quantity: 0,
            errorMess: "",
            editingRoom: {
                id: 0,
                maGiangDuong: "",
                ten: "",
                dmLoaiPhong: {
                    id: 0,
                    ten: ""
                },
                tang: 0,
                soLuong: 0
            }
        }

        this._onRoomCodeChange = this._onRoomCodeChange.bind(this);
        this._onRoomNameChange = this._onRoomNameChange.bind(this);
        this._onRoomTypeChange = this._onRoomTypeChange.bind(this);
        this._onFloorChange = this._onFloorChange.bind(this);
        this._onQuantityChange = this._onQuantityChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._deleteRoom = this._deleteRoom.bind(this);
        this._editRoom = this._editRoom.bind(this);
        this._triggerModal = this._triggerModal.bind(this);
    }

    componentWillMount() {
        API.getAllRoomType((roomTypes) => {
            API.getAllGiangDuong((rooms) => {
                this.setState({
                    roomTypes: roomTypes,
                    rooms: rooms,
                    roomTypeId: roomTypes[0].id
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        API.insertRoom({
            id: 0,
            maGiangDuong: this.state.roomCode,
            ten: this.state.roomName,
            loaiPhongId: this.state.roomTypeId,
            tang: this.state.floor,
            soLuong: this.state.quantity
        }, (rooms) => {
            this.setState({
                rooms: rooms,
                roomCode: "",
                roomName: "",
                roomTypeId: this.state.roomTypes[0].id,
                floor: 0,
                quantity: 0,
                errorMess: ""
            })
        }, (error) => {
            console.log(error);
        })
    }

    _deleteRoom(roomId) {
        API.deleteRoom(roomId, (rooms) => {
            if (rooms.status == 422) {
                this.setState({
                    errorMess: "Không thể xóa giảng đường này bởi đã tồn tại lớp môn học học tại phòng này"
                })
            } else {
                this.setState({
                    rooms: rooms,
                    errorMess: ""
                })
            }

        }, (error) => {
            console.log(error);
        })
    }

    _editRoom(room) {
        API.editRoom(room, (rooms) => {
            this.setState({
                errorMess: "",
                rooms: rooms
            })
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const rooms = this.state.rooms;
        let editingRoom;

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].id == id) {
                editingRoom = rooms[i];
                break;
            }
        }

        this.setState({
            editingRoom: editingRoom
        })

        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onRoomCodeChange(e) {
        this.setState({
            roomCode: e.target.value
        })
    }

    _onRoomNameChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }

    _onRoomTypeChange(e) {
        this.setState({
            roomTypeId: e.target.value
        })
    }

    _onFloorChange(e) {
        this.setState({
            floor: e.target.value
        })
    }

    _onQuantityChange(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Nhập thông tin giảng đường</div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Mã giảng đường</span>
                        <input className="input-medium margin-left-20" value={this.state.roomCode}
                               onChange={this._onRoomCodeChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tên giảng đường</span>
                        <input className="input-medium margin-left-20" value={this.state.roomName}
                               onChange={this._onRoomNameChange}/>
                    </div>
                    <div className="choose-condition-item">
                    <span className="edit-title">
                        Loại giảng đường
                    </span>
                        <select className="input-medium margin-left-20" value={this.state.roomTypeId}
                                onChange={this._onRoomTypeChange}>
                            {this.state.roomTypes.map(roomType => <option key={roomType.id}
                                                                          value={roomType.id}>{roomType.ten}</option>)}
                        </select>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Tầng</span>
                        <input type="number" className="input-mini margin-left-20" value={this.state.floor}
                               onChange={this._onFloorChange}/>
                    </div>
                    <div className="choose-condition-item">
                        <span className="edit-title">Số lượng</span>
                        <input type="number" className="input-mini margin-left-20" value={this.state.quantity}
                               onChange={this._onQuantityChange}/>
                    </div>
                    <br/>
                    <div className="choose-condition-item">
                        <button className="ok-button button-mini" onClick={this._handleSubmit}>Thêm</button>
                    </div>

                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách giảng đường</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllGiangDuongs _triggerModal={this._triggerModal} _deleteRoom={this._deleteRoom}
                                             rooms={this.state.rooms}/>
                    </div>
                    <TSMD_EditGiangDuong _editRoom={this._editRoom} room={this.state.editingRoom}
                                         roomTypes={this.state.roomTypes}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputGiangDuong