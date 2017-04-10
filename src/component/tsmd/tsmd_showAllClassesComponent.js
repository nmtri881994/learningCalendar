import React, {Component} from 'react'

class TSMD_ShowAllClassesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            tableData: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        var classes = nextProps.classes;
        // var index = 0;
        // var tableData = "";
        // if (classes.length != 0) {
        //     tableData = classes.map(cl => {
        //             index++;
        //             return <tr key={cl.id}>
        //                 <td>{index}</td>
        //                 <td>{cl.id}</td>
        //                 <td>{cl.monHoc.ten}</td>
        //                 <td>{cl.giaoVien.ten}</td>
        //                 <td>{cl.soLuongToiDa}</td>
        //                 <td>{cl.soTietLyThuyet}</td>
        //                 <td>{cl.soTietThucHanh}</td>
        //                 <td>{cl.soBuoiLyThuyetMotTuan}</td>
        //                 <td>{cl.soTietLyThuyetMotTuan}</td>
        //                 <td>{cl.soBuoiThucHanhMotTuan}</td>
        //                 <td>{cl.soTietThucHanhMotTuan}</td>
        //                 <td><i className="fa fa-cog arrange-class-icon cursor" data={cl.id} aria-hidden="true"
        //                        onClick={this.triggerModal.bind(null, cl.id)}/></td>
        //             </tr>
        //         }
        //     )
        // }
        this.setState({
            classes: classes
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
                var triggerModal = () => this.triggerModal.bind(null, cl.id);
                myTable.fnAddData([
                    index,
                    cl.id,
                    cl.monHoc.ten,
                    cl.giaoVien.hoDem + " " +cl.giaoVien.ten,
                    cl.soLuongToiDa,
                    cl.soTietLyThuyet,
                    cl.soTietThucHanh,
                    cl.soBuoiLyThuyetMotTuan,
                    cl.soTietLyThuyetMotTuan,
                    cl.soBuoiThucHanhMotTuan,
                    cl.soTietThucHanhMotTuan,
                    '<i class="fa fa-cog arrange-class-icon cursor" aria-hidden="true" data-id="'+cl.id+'" data-name="'+cl.monHoc.ten+'"/>'
                ]);
                index ++;
            })
        }


        return (
            <div>
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
                            <th>Số buổi LT/tuần</th>
                            <th>Số tiết LT/tuần</th>
                            <th>Số buổi TH/tuần</th>
                            <th>Số tiết TH/tuần</th>
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
                            <th>Số buổi LT/tuần</th>
                            <th>Số tiết LT/tuần</th>
                            <th>Số buổi TH/tuần</th>
                            <th>Số tiết TH/tuần</th>
                            <th>Xếp lịch</th>
                        </tr>
                        </tfoot>
                        <tbody>
                        {/*{tableData}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {

        $(document).ready(function () {
            $('#myTable').DataTable();

        });
    }

    componentDidUpdate(){
        var triggerModal = (id, name) => this.props.triggerModal(id, name);
        $(document).ready(function () {
            $('.arrange-class-icon').on('click', function(evt){
                triggerModal($(this).attr("data-id"), $(this).attr("data-name"));
            })
        })
    }

}

export default TSMD_ShowAllClassesComponent;