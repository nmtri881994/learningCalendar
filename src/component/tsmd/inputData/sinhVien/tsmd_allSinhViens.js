/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllSinhViens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sinhViens: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sinhViens.length != 0 || nextProps.sinhViens != this.state.sinhViens) {
            const sinhViens = nextProps.sinhViens;
            this.setState({
                sinhViens: sinhViens
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            sinhViens.map(sinhVien => {
                myTable.fnAddData([
                    index,
                    sinhVien.maSinhVien,
                    sinhVien.hoDem,
                    sinhVien.ten,
                    sinhVien.lopHoc.ma,
                    sinhVien.dmNganh ? sinhVien.dmNganh.ten : "Chưa có ngành",
                    '<i class="fa fa-pencil-square edit-icon cursor" name="chonNganh" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="boNganh" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + sinhVien.id + '"/>'
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
                    <th>Mã sinh viên</th>
                    <th>Họ đệm</th>
                    <th>Tên</th>
                    <th>Lớp</th>
                    <th>Ngành</th>
                    <th>Chọn ngành</th>
                    <th>Bỏ ngành</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã sinh viên</th>
                    <th>Họ đệm</th>
                    <th>Tên</th>
                    <th>Lớp</th>
                    <th>Chọn ngành</th>
                    <th>Bỏ ngành</th>
                    <th>Sửa</th>
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
        const _triggerModal2 = (id) => this.props._triggerModal2(id);
        const _onDeleteSinhVien = (id) => this.props._onDeleteSinhVien(id);
        const _onBoNganhSinhVien = (id) => this.props._onBoNganhSinhVien(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteSinhVien($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
        $('#myTable tbody').on('click', 'i[name="chonNganh"]', function () {
            _triggerModal2($(this).attr("data-id"));
        })
        $('#myTable tbody').on('click', 'i[name="boNganh"]', function () {
            _onBoNganhSinhVien($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllSinhViens