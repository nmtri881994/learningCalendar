/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_AllKhoas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rooms.length != 0 || nextProps.rooms != this.state.rooms) {
            const rooms = nextProps.rooms;
            this.setState({
                rooms: rooms
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            rooms.map(room => {
                myTable.fnAddData([
                    index,
                    room.maGiangDuong,
                    room.ten,
                    room.dmLoaiPhong.ten,
                    room.tang,
                    room.soLuong,
                    '<i class="fa fa-pencil-square edit-icon cursor" data-id="' + room.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" data-id="' + room.id + '"/>'
                ]);
                index++;
            })
        }
    }

    render() {
        return (<div className="data-table">
            <table id="myTable" className="display" cellSpacing="0">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Loại phòng</th>
                    <th>Tầng</th>
                    <th>Số lượng</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Loại phòng</th>
                    <th>Tầng</th>
                    <th>Số lượng</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </tfoot>
                <tbody>
                </tbody>
            </table>
        </div>)
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#myTable').DataTable();
        });
    }

    componentDidUpdate() {
        var _deleteRoom = (roomId) => this.props._deleteRoom(roomId);
        var _triggerModal = (roomId) => this.props._triggerModal(roomId);
        $(document).ready(function () {
            $('.delete-icon').unbind('click').on('click', function (evt) {
                _deleteRoom($(this).attr("data-id"));
            });
            $('.edit-icon').unbind('click').on('click', function (evt) {
                _triggerModal($(this).attr("data-id"));
            });
        })
    }
}

export default TSMD_AllKhoas