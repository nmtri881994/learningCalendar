/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllNganhs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nganhs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nganhs.length != 0 || nextProps.nganhs != this.state.nganhs) {
            const nganhs = nextProps.nganhs;
            this.setState({
                nganhs: nganhs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            nganhs.map(nganh => {
                myTable.fnAddData([
                    index,
                    nganh.ten,
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + nganh.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + nganh.id + '"/>'
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
                    <th>Tên ngành</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Tên ngành</th>
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
        const _onDeleteNganh = (id) => this.props._onDeleteNganh(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteNganh($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllNganhs