/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

//import Components
import TSMD_EditSinhVienNganh from './tsmd_editSinhVienNganh'

class TSMD_AllSinhVienNganhs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sinhViens: [],
            editingSinhVienId: 0
        }

        this._onDeleteSinhVienNganh = this._onDeleteSinhVienNganh.bind(this);
        this._triggerModal = this._triggerModal.bind(this);
        this._onChonNganh = this._onChonNganh.bind(this);
    }

    componentWillMount() {
        API.getAllSinhViens((sinhViens) => {
            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            sinhViens.map(sinhVien => {
                myTable.fnAddData([
                    index,
                    sinhVien.maSinhVien,
                    sinhVien.hoDem,
                    sinhVien.ten,
                    sinhVien.lopHoc.ma,
                    sinhVien.dmNganh ? sinhVien.dmNganh.ten : "Chưa có ngành",
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + sinhVien.id + '"/>'
                ]);
                index++;
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _onDeleteSinhVienNganh(id){
        API.deleteSinhVienNganh(id, (sinhViens)=>{
            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            sinhViens.map(sinhVien => {
                myTable.fnAddData([
                    index,
                    sinhVien.maSinhVien,
                    sinhVien.hoDem,
                    sinhVien.ten,
                    sinhVien.lopHoc.ma,
                    sinhVien.dmNganh ? sinhVien.dmNganh.ten : "Chưa có ngành",
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + sinhVien.id + '"/>'
                ]);
                index++;
            })
            this.setState({
                sinhViens: sinhViens
            })
        }, (error)=>{
            console.log(error);
        })
    }

    _triggerModal(id){
        this.setState({
            editingSinhVienId: id
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onChonNganh(sinhVienId, nganhId){
        API.editSinhVienNganh(sinhVienId, nganhId, (sinhViens)=>{
            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            sinhViens.map(sinhVien => {
                myTable.fnAddData([
                    index,
                    sinhVien.maSinhVien,
                    sinhVien.hoDem,
                    sinhVien.ten,
                    sinhVien.lopHoc.ma,
                    sinhVien.dmNganh ? sinhVien.dmNganh.ten : "Chưa có ngành",
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + sinhVien.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + sinhVien.id + '"/>'
                ]);
                index++;
            })
            this.setState({
                sinhViens: sinhViens
            })
        }, (error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <TSMD_EditSinhVienNganh editingSinhVienId={this.state.editingSinhVienId} _onChonNganh={this._onChonNganh} />
                <div className="data-table">
                    <table id="myTable" className="display" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ đệm</th>
                            <th>Tên</th>
                            <th>Lớp</th>
                            <th>Ngành</th>
                            <th>Chọn ngành</th>
                            <th>Bỏ ngành</th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ đệm</th>
                            <th>Tên</th>
                            <th>Lớp</th>
                            <th>Ngành</th>
                            <th>Chọn ngành</th>
                            <th>Bỏ ngành</th>
                        </tr>
                        </tfoot>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>)
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#myTable').DataTable();
        });

        const _triggerModal = (id) => this._triggerModal(id);
        const _onDeleteSinhVienNganh = (id) => this._onDeleteSinhVienNganh(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _onDeleteSinhVienNganh($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllSinhVienNganhs