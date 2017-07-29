/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllLopHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classes.length != 0 || nextProps.classes != this.state.classes) {
            const classes = nextProps.classes;
            this.setState({
                classes: classes
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            classes.map(cl => {
                myTable.fnAddData([
                    index,
                    cl.ma,
                    cl.ten,
                    cl.khoaKhoaHoc.khoa.ten + ' ' + cl.khoaKhoaHoc.tkb_khoaHoc.nam,
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
                    <th>Mã lớp</th>
                    <th>Tên lớp</th>
                    <th>Khoa - Khóa học</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã lớp</th>
                    <th>Tên lớp</th>
                    <th>Khoa - Khóa học</th>
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
        const _onDeleteClass = (id) => this.props._onDeleteClass(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteClass($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllLopHocs