/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllLopMonHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lopMonHocs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lopMonHocs.length != 0 || nextProps.lopMonHocs != this.state.lopMonHocs) {
            const lopMonHocs = nextProps.lopMonHocs;
            this.setState({
                lopMonHocs: lopMonHocs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            lopMonHocs.map(cl => {
                myTable.fnAddData([
                    index,
                    cl.dmMonHoc.maMonHoc + " " + cl.dmMonHoc.ten,
                    cl.dmNhanVien.maNhanVien + " " + cl.dmNhanVien.hoDem + " " + cl.dmNhanVien.ten,
                    cl.soTietLyThuyet,
                    cl.soTietThucHanh,
                    cl.soLuongToiDa,
                    cl.gioiHanTuanBatDau,
                    cl.gioiHanTuanKetThuc,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + cl.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + cl.id + '"/>'
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
                    <th>Môn học</th>
                    <th>Giảng viên</th>
                    <th>Số tiết lý thuyết</th>
                    <th>Số tiết thực hành</th>
                    <th>Số lượng sinh viên tối đa</th>
                    <th>Tuần bắt đầu</th>
                    <th>Tuần kết thúc</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Môn học</th>
                    <th>Giảng viên</th>
                    <th>Số tiết lý thuyết</th>
                    <th>Số tiết thực hành</th>
                    <th>Số lượng sinh viên tối đa</th>
                    <th>Tuần bắt đầu</th>
                    <th>Tuần kết thúc</th>
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

        const _triggerModal = (id) => this.props._triggerModal(id);
        const _onDeleteLopMonHoc = (id) => this.props._onDeleteLopMonHoc(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteLopMonHoc($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllLopMonHocs