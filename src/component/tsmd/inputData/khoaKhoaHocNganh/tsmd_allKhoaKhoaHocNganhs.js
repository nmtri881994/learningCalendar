/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllKhoaKhoaHocNganhs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            khoaKhoaHocNganhs: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.khoaKhoaHocNganhs.length != 0 || nextProps.khoaKhoaHocNganhs != this.state.khoaKhoaHocNganhs) {
            const khoaKhoaHocNganhs = nextProps.khoaKhoaHocNganhs;
            this.setState({
                khoaKhoaHocNganhs: khoaKhoaHocNganhs
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            khoaKhoaHocNganhs.map(kkhn => {
                myTable.fnAddData([
                    index,
                    kkhn.khoaKhoaHoc.khoa.ten,
                    kkhn.khoaKhoaHoc.tkb_khoaHoc.nam,
                    kkhn.dmNganh.ten,
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + kkhn.id + '"/>'
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
                    <th>Ngành</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Khoa</th>
                    <th>Khóa học</th>
                    <th>Ngành</th>
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

        const _onDeleteKhoaKhoaHocNganh = (id) => this.props._onDeleteKhoaKhoaHocNganh(id);

        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteKhoaKhoaHocNganh($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllKhoaKhoaHocNganhs