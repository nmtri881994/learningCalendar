/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllKhoas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faculties: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.faculties.length != 0 || nextProps.faculties != this.state.faculties) {
            const faculties = nextProps.faculties;
            this.setState({
                faculties: faculties
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            faculties.map(faculty => {
                myTable.fnAddData([
                    index,
                    faculty.ma,
                    faculty.ten,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + faculty.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + faculty.id + '"/>'
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
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
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

        const _onDeleteFaculty = (id) => this.props._onDeleteFaculty(id);
        const _triggerModal = (id) => this.props._triggerModal(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteFaculty($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllKhoas