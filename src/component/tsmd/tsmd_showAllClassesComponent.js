import React, {Component} from 'react'

class TSMD_ShowAllClassesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            khoaId: 0,
            khoaHocId: 0,
            tableData: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            classes: nextProps.classes,
            khoa: nextProps.khoa,
            khoaHoc: nextProps.khoaHoc
            // tableData: tableData
        })
    }


    render() {
        var myTable = $('#myTable').dataTable();

        var index = 1;

        var classes = this.state.classes;
        myTable.fnClearTable();
        if (classes.length != 0) {
            classes.map(cl => {
                myTable.fnAddData([
                    index,
                    cl.monHoc.maMonHoc + "." + this.state.khoa.maKhoa + "." + this.state.khoaHoc.nam + "." + cl.id,
                    cl.monHoc.ten,
                    cl.giaoVien.hoDem + " " + cl.giaoVien.ten,
                    cl.soLuongToiDa,
                    cl.soTietLyThuyet,
                    cl.soTietThucHanh,
                    '<i class="fa fa-cog arrange-class-icon cursor" aria-hidden="true" data-id="' + cl.id + '" data-name="' + cl.monHoc.ten + '"/>'
                ]);
                index++;
            })
        }


        return (
            <div className="data-table">
                <table id="myTable" className="display" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Môn học</th>
                        <th>Giáo viên</th>
                        <th>Số lượng tối đa</th>
                        <th>Số tiết LT</th>
                        <th>Số tiết TH</th>
                        <th>Xếp lịch</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Môn học</th>
                        <th>Giáo viên</th>
                        <th>Số lượng tối đa</th>
                        <th>Số tiết LT</th>
                        <th>Số tiết TH</th>
                        <th>Xếp lịch</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {/*{tableData}*/}
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {

        $(document).ready(function () {
            $('#myTable').DataTable();

        });
    }

    componentDidUpdate() {
        var triggerModal = (id, name) => this.props.triggerModal(id, name);
        $(document).ready(function () {
            $('.arrange-class-icon').on('click', function (evt) {
                triggerModal($(this).attr("data-id"), $(this).attr("data-name"));
            })
        })
    }

}

export default TSMD_ShowAllClassesComponent;