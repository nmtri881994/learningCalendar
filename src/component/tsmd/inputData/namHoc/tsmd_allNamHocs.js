/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

class TSMD_AllNamHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            years: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.years.length != 0 || nextProps.years != this.state.years) {
            const years = nextProps.years;
            this.setState({
                years: years
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            years.map(year => {
                myTable.fnAddData([
                    index,
                    year.name,
                    year.ngayBatDau,
                    year.ngayKetThuc,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + year.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + year.id + '"/>'
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
                    <th>Tên</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
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

        const _triggerModal = (id) => this.props._triggerModal(id);
        const _onDeleteYear = (id) => this.props._onDeleteYear(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteYear($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllNamHocs