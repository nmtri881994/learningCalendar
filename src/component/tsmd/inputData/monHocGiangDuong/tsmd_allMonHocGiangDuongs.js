/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllMonHocGiangDuongs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monHocGiangDuongs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.monHocGiangDuongs.length != 0 || nextProps.monHocGiangDuongs != this.state.monHocGiangDuongs) {
            const monHocGiangDuongs = nextProps.monHocGiangDuongs;
            this.setState({
                monHocGiangDuongs: monHocGiangDuongs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            monHocGiangDuongs.map(mhgd => {
                myTable.fnAddData([
                    index,
                    mhgd.dmMonHoc.maMonHoc +" "+mhgd.dmMonHoc.ten,
                    mhgd.dmGiangDuong.maGiangDuong,
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + mhgd.id + '"/>'
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
                    <th>Môn học</th>
                    <th>Giảng đường</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Môn học</th>
                    <th>Giảng đường</th>
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

        const _onDeleteMHGD = (id) => this.props._onDeleteMHGD(id);

        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteMHGD($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllMonHocGiangDuongs