/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllKiHocNamHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            termYears: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.termYears.length != 0 || nextProps.termYears != this.state.termYears) {
            const termYears = nextProps.termYears;
            this.setState({
                termYears: termYears
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            termYears.map(termYear => {
                myTable.fnAddData([
                    index,
                    termYear.namHoc.name,
                    termYear.kiHoc.ten,
                    termYear.ngayBatDau,
                    termYear.ngayKetThuc,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + termYear.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + termYear.id + '"/>'
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
                    <th>Năm học</th>
                    <th>Kì học</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Năm học</th>
                    <th>Kì học</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
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
        const _onDeleteTermYear = (id) => this.props._onDeleteTermYear(id);
        const _triggerModal = (id) => this.props._triggerModal(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteTermYear($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllKiHocNamHocs