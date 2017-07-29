/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllNhanViens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nhanViens: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nhanViens.length != 0 || nextProps.nhanViens != this.state.nhanViens) {
            const nhanViens = nextProps.nhanViens;
            this.setState({
                nhanViens: nhanViens
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            nhanViens.map(nhanVien => {
                myTable.fnAddData([
                    index,
                    nhanVien.maNhanVien,
                    nhanVien.hoDem,
                    nhanVien.ten,
                    nhanVien.dmDonVi.ten,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + nhanVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + nhanVien.id + '"/>'
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
                    <th>Mã nhân viên</th>
                    <th>Họ đệm</th>
                    <th>Tên</th>
                    <th>Khoa</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã nhân viên</th>
                    <th>Họ đệm</th>
                    <th>Tên</th>
                    <th>Khoa</th>
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
        const _onDeleteNhanVien = (id) => this.props._onDeleteNhanVien(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteNhanVien($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllNhanViens