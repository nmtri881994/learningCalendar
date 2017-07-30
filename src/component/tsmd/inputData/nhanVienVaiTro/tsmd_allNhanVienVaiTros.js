/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllNhanVienVaiTros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nhanVienVaiTros: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nhanVienVaiTros.length != 0 || nextProps.nhanVienVaiTros != this.state.nhanVienVaiTros) {
            const nhanVienVaiTros = nextProps.nhanVienVaiTros;
            this.setState({
                nhanVienVaiTros: nhanVienVaiTros
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            nhanVienVaiTros.map(nvvt => {
                myTable.fnAddData([
                    index,
                    nvvt.taiKhoan.tenDangNhap,
                    nvvt.taiKhoan.hoVaTen,
                    nvvt.vaiTro.tenVaiTro,
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + nvvt.id + '"/>'
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
                    <th>Họ và têh</th>
                    <th>Vai trò</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã nhân viên</th>
                    <th>Họ và têh</th>
                    <th>Vai trò</th>
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

        const _onDeleteNhanVienVaiTro = (id) => this.props._onDeleteNhanVienVaiTro(id);

        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteNhanVienVaiTro($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllNhanVienVaiTros