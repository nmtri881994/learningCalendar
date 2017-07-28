/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllKhoaKhoaHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            khoaKhoaHocs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.khoaKhoaHocs.length != 0 || nextProps.khoaKhoaHocs != this.state.khoaKhoaHocs) {
            const khoaKhoaHocs = nextProps.khoaKhoaHocs;
            this.setState({
                khoaKhoaHocs: khoaKhoaHocs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            khoaKhoaHocs.map(khoaKhoaHoc => {
                myTable.fnAddData([
                    index,
                    khoaKhoaHoc.khoa.ten,
                    khoaKhoaHoc.tkb_khoaHoc.nam,
                    khoaKhoaHoc.kiBatDau.kiHoc.ten + ' '+khoaKhoaHoc.kiBatDau.namHoc.name,
                    khoaKhoaHoc.kiKetThuc.kiHoc.ten + ' '+khoaKhoaHoc.kiKetThuc.namHoc.name,
                    khoaKhoaHoc.kiPhanNganh.kiHoc.ten + ' '+khoaKhoaHoc.kiPhanNganh.namHoc.name,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + khoaKhoaHoc.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + khoaKhoaHoc.id + '"/>'
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
                    <th>Khoa</th>
                    <th>Khóa học</th>
                    <th>Kì bắt đầu</th>
                    <th>Kì kết thúc</th>
                    <th>Kì phân ngành</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Khoa</th>
                    <th>Khóa học</th>
                    <th>Kì bắt đầu</th>
                    <th>Kì kết thúc</th>
                    <th>Kì phân ngành</th>
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
        const _deleteKhoaKhoaHoc = (id) => this.props._deleteKhoaKhoaHoc(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _deleteKhoaKhoaHoc($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllKhoaKhoaHocs