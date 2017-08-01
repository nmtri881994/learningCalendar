/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllMonHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monHocs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.monHocs.length != 0 || nextProps.monHocs != this.state.monHocs) {
            const monHocs = nextProps.monHocs;
            this.setState({
                monHocs: monHocs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            monHocs.map(monHoc => {
                myTable.fnAddData([
                    index,
                    monHoc.maMonHoc,
                    monHoc.ten,
                    monHoc.soTinChi,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + monHoc.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + monHoc.id + '"/>'
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
                    <th>Mã môn học</th>
                    <th>Tên</th>
                    <th>Số tín chỉ</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã môn học</th>
                    <th>Tên</th>
                    <th>Số tín chỉ</th>
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
        const _onDeleteMonHoc = (id) => this.props._onDeleteMonHoc(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteMonHoc($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllMonHocs