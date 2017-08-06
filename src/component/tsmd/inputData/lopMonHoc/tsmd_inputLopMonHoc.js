/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'
import * as API3 from '../../../../apiUtility/inputDataApi'
import * as API from '../../../../apiUtility/tsmdApi'
import * as API2 from '../../../../apiUtility/calendarApi'

//import components
import TSMD_AllLopMonHocs from './tsmd_allLopMonHocs'
import TSMD_EditLopMonHoc from './tsmd_editLopMonHoc'

class TSMD_InputLopMonHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [],
            chosenYearId: 0,
            terms: [],
            chosenTermId: 0,
            faculties: [],
            chosenFacultyId: 0,
            yearOfAdmissions: [],
            chosenYearOfAdmissionId: 0,
            haveMajor: false,
            majors: [],
            chosenMajorId: 0,
            lopMonHocs: [],

            lopMonHoc: {
                id: 0,
                dmMonHoc: {
                    id: 0
                },
                dmNhanVien: {
                    id: 0
                },
                tkb_kiHoc_namHoc: {
                    kiHoc: {
                        id: 0
                    },
                    namHoc: {
                        id: 0
                    }
                },
                tkb_khoa_khoaHoc: {
                    khoa: {
                        id: 0
                    },
                    tkb_khoaHoc: {
                        id: 0
                    }
                },
                dmNganh: {
                    id: 0
                },
                soTietLyThuyet: 0,
                soTietThucHanh: 0,
                soLuongToiDa: 0,
                gioiHanTuanBatDau: 0,
                gioiHanTuanKetThuc: 0
            },
            editingLopMonHoc:{
                id: 0,
                dmMonHoc: {
                    id: 0,
                    maMonHoc: "",
                    ten: ""
                },
                dmNhanVien: {
                    id: 0,
                    maNhanVien: "",
                    hoDem: "",
                    ten: ""
                },
                tkb_kiHoc_namHoc: {
                    id: 0,
                    kiHoc: {
                        id: 0,
                        ten: ""
                    },
                    namHoc: {
                        id: 0,
                        name: ""
                    }
                },
                tkb_khoa_khoaHoc: {
                    id: 0,
                    khoa: {
                        id: 0,
                        ten: ""
                    },
                    tkb_khoaHoc: {
                        id: 0,
                        nam: 0
                    }
                },
                dmNganh: {
                    id: 0,
                    ten: ""
                },
                soTietLyThuyet: 0,
                soTietThucHanh: 0,
                soLuongToiDa: 0,
                gioiHanTuanBatDau: 0,
                gioiHanTuanKetThuc: 0
            },
            monHocs: [],
            nhanViens: [],
            tuans: [],
            tuanKetThucs: [],
            errorMess: ""
        }

        this._triggerModal = this._triggerModal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleSubmit2 = this._handleSubmit2.bind(this);
        this._onDeleteLopMonHoc = this._onDeleteLopMonHoc.bind(this);
        this._onEditLopMonHoc = this._onEditLopMonHoc.bind(this);

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleYearOfAdmissionChange = this.handleYearOfAdmissionChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);

        this._onMonHocChange = this._onMonHocChange.bind(this);
        this._onGiangVienChange = this._onGiangVienChange.bind(this);
        this._onSoTietLyThuyetChange = this._onSoTietLyThuyetChange.bind(this);
        this._onSoTietThucHanhChange = this._onSoTietThucHanhChange.bind(this);
        this._onSoLuongToiDaChange = this._onSoLuongToiDaChange.bind(this);
        this._onGioiHanTuanBatDauChange = this._onGioiHanTuanBatDauChange.bind(this);
        this._onGioiHanTuanKetThucChange = this._onGioiHanTuanKetThucChange.bind(this);
        this._onTuanBatDauChange = this._onTuanBatDauChange.bind(this);
        this._onTuanKetThucChange = this._onTuanKetThucChange.bind(this);
    }

    componentWillMount() {
        API.getYearsNotEnd((years) => {
            this.setState({
                years: years,
                chosenYearId: years.length != 0 ? years[0].id : 0
            });
            API.getSemestersNotEndOfYear(this.state.chosenYearId, (terms) => {
                this.setState({
                    terms: terms,
                    chosenTermId: terms.length != 0 ? terms[0].id : 0
                });
                API2.getAllFaculties((faculties) => {
                    this.setState({
                        faculties: faculties,
                        chosenFacultyId: faculties.length != 0 ? faculties[0].id : 0
                    });
                    API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, this.state.chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
                        this.setState({
                            yearOfAdmissions: yearOfAdmissions,
                            chosenYearOfAdmissionId: yearOfAdmissions.length != 0 ? yearOfAdmissions[0].id : 0
                        });
                        API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                            this.setState({
                                    haveMajor: majors.length != 0,
                                    majors: majors,
                                    chosenMajorId: majors.length != 0 ? majors[0].id : 0
                                }
                            );

                        }, (error) => {
                            this.setState({
                                    haveMajor: false,
                                    majors: [],
                                    chosenMajorId: 0
                                }
                            )
                        })
                    }, (error) => {
                        console.log(error);
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error)
            });
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    _handleSubmit() {
        const state = this.state;
        API3.getAllLopMonHocs(state.chosenYearId, state.chosenTermId, state.chosenFacultyId, state.chosenYearOfAdmissionId, state.chosenMajorId, (classes) => {
            this.setState({
                lopMonHocs: classes
            });
            API3.getAllMonHocs((monHocs) => {
                API3.getAllNhanViens((nhanViens) => {
                    API2.getTermWeekTime(this.state.chosenTermId, this.state.chosenYearId, (weekTime) => {
                        nhanViens = nhanViens.filter(nhanVien => nhanVien.maNhanVien != null);
                        let lopMonHoc = this.state.lopMonHoc;
                        lopMonHoc.dmMonHoc.id = monHocs.length != 0 ? monHocs[0].id : 0;
                        lopMonHoc.dmNhanVien.id = nhanViens.length != 0 ? nhanViens[0].id : 0;
                        let tuans = [];
                        for (var i = weekTime.startWeek; i <= weekTime.endWeek; i++) {
                            tuans.push(i);
                        }
                        lopMonHoc.gioiHanTuanBatDau = tuans.length != 0 ? tuans[0] : 0;
                        lopMonHoc.gioiHanTuanKetThuc = tuans.length != 0 ? tuans[0] : 0;
                        this.setState({
                            monHocs: monHocs,
                            nhanViens: nhanViens,
                            lopMonHoc: lopMonHoc,
                            tuans: tuans,
                            tuanKetThucs: tuans
                        })
                    }, (error) => {
                        console.log(error)
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        });
    }

    _handleSubmit2() {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.tkb_kiHoc_namHoc.kiHoc.id = this.state.chosenTermId;
        lopMonHoc.tkb_kiHoc_namHoc.namHoc.id = this.state.chosenYearId;
        lopMonHoc.tkb_khoa_khoaHoc.khoa.id = this.state.chosenFacultyId;
        lopMonHoc.tkb_khoa_khoaHoc.tkb_khoaHoc.id = this.state.chosenYearOfAdmissionId;
        lopMonHoc.dmNganh.id = this.state.chosenMajorId;

        console.log(lopMonHoc);

        API3.insertLopMonHoc(lopMonHoc, (lopMonHocs) => {
            this.setState({
                lopMonHocs: lopMonHocs
            })
        }, (error) => {
            console.log(error);
        })
    }

    _triggerModal(id) {
        const lopMonHocs = this.state.lopMonHocs;
        // console.log(terms);
        let editingLopMonHoc;
        for (let i = 0; i < lopMonHocs.length; i++) {
            if (lopMonHocs[i].id == id) {
                editingLopMonHoc = lopMonHocs[i];
                break;
            }
        }
        this.setState({
            editingLopMonHoc: editingLopMonHoc
        })
        var modal = $("#myModal");
        modal[0].style.display = "block";
    }

    _onDeleteLopMonHoc(id){
        API3.deleteLopMonHoc(id, (lopMonHocs)=>{
            if(lopMonHocs.status == 422){
                this.setState({
                    errorMess: "Không thể xóa lớp môn học này vì đã tồn tại sinh viên hoặc lịch học"
                })
            }else{
                this.setState({
                    lopMonHocs: lopMonHocs,
                    errorMess: ""
                })
            }
        })
    }

    _onEditLopMonHoc(lopMonHoc){
        API3.editLopMonHoc(lopMonHoc, (lopMonHocs)=>{
            this.setState({
                errorMess: "",
                lopMonHocs: lopMonHocs
            })
        }, (error)=>{
            console.log(error);
        })
    }

    handleYearChange(e) {
        var chosenYearId = e.target.value;
        this.setState({
            chosenYearId: chosenYearId
        })
        API.getSemestersNotEndOfYear(e.target.value, (terms) => {
            this.setState({
                terms: terms,
                chosenTermId: terms.length != 0 ? terms[0].id : 0
            });
            API2.getAllFaculties((faculties) => {
                this.setState({
                    faculties: faculties,
                    chosenFacultyId: faculties.length != 0 ? faculties[0].id : 0
                });
                API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
                    this.setState({
                        yearOfAdmissions: yearOfAdmissions,
                        chosenYearOfAdmissionId: yearOfAdmissions.length != 0 ? yearOfAdmissions[0].id : 0
                    });
                    API2.getAvailableMajors(chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                        this.setState({
                                haveMajor: majors.length != 0,
                                majors: majors,
                                chosenMajorId: majors.length != 0 ? majors[0].id : 0
                            }
                        )
                    }, (error) => {
                        this.setState({
                                haveMajor: false,
                                majors: [],
                                chosenMajorId: 0
                            }
                        )
                    })
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error)
        });
    }

    handleTermChange(e) {
        var chosenTermId = e.target.value;
        this.setState({
            chosenTermId: chosenTermId
        });
        API2.getAllFaculties((faculties) => {
            this.setState({
                faculties: faculties,
                chosenFacultyId: faculties.length != 0 ? faculties[0].id : 0
            });
            API2.getAvailableYearOfAdmissions(this.state.chosenFacultyId, this.state.chosenYearId, chosenTermId, (yearOfAdmissions) => {
                this.setState({
                    yearOfAdmissions: yearOfAdmissions,
                    chosenYearOfAdmissionId: yearOfAdmissions.length != 0 ? yearOfAdmissions[0].id : 0
                });
                API2.getAvailableMajors(this.state.chosenYearId, chosenTermId, this.state.chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {
                    this.setState({
                            haveMajor: majors.length != 0,
                            majors: majors,
                            chosenMajorId: majors.length != 0 ? majors[0].id : 0
                        }
                    )
                }, (error) => {
                    this.setState({
                            haveMajor: false,
                            majors: [],
                            chosenMajorId: 0
                        }
                    )
                })
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleFacultyChange(e) {
        var chosenFacultyId = e.target.value;
        this.setState({
            chosenFacultyId: chosenFacultyId
        });
        API2.getAvailableYearOfAdmissions(chosenFacultyId, this.state.chosenYearId, this.state.chosenTermId, (yearOfAdmissions) => {
            this.setState({
                yearOfAdmissions: yearOfAdmissions,
                chosenYearOfAdmissionId: yearOfAdmissions.length != 0 ? yearOfAdmissions[0].id : 0
            });
            API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, chosenFacultyId, this.state.chosenYearOfAdmissionId, (majors) => {

                this.setState({
                        haveMajor: majors.length != 0,
                        majors: majors,
                        chosenMajorId: majors.length != 0 ? majors[0].id : 0
                    }
                )
            }, (error) => {
                this.setState({
                        haveMajor: false,
                        majors: [],
                        chosenMajorId: 0
                    }
                )
            })
        }, (error) => {
            console.log(error);
        })
    }

    handleYearOfAdmissionChange(e) {
        this.setState({
            chosenYearOfAdmissionId: e.target.value
        });
        API2.getAvailableMajors(this.state.chosenYearId, this.state.chosenTermId, this.state.chosenFacultyId, e.target.value, (majors) => {
            this.setState({
                    haveMajor: majors.length != 0,
                    majors: majors,
                    chosenMajorId: majors.length != 0 ? majors[0].id : 0
                }
            )
        }, (error) => {
            this.setState({
                    haveMajor: false,
                    majors: [],
                    chosenMajorId: 0
                }
            )
        })
    }

    handleMajorChange(e) {
        this.setState({
            chosenMajorId: e.target.value
        })
    }

    _onMonHocChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.dmMonHoc.id = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGiangVienChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.dmNhanVien.id = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoTietLyThuyetChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soTietLyThuyet = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoTietThucHanhChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soTietThucHanh = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onSoLuongToiDaChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.soLuongToiDa = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGioiHanTuanBatDauChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanBatDau = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onGioiHanTuanKetThucChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanKetThuc = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    _onTuanBatDauChange(e) {
        const tuanBatDau = e.target.value;
        let lopMonHoc = this.state.lopMonHoc;
        let tuanKetThucs = [];
        const tuanCuoiCung = this.state.tuans[this.state.tuans.length - 1];
        for (let i = tuanBatDau; i <= tuanCuoiCung; i++) {
            tuanKetThucs.push(i);
        }
        lopMonHoc.gioiHanTuanBatDau = tuanBatDau;
        lopMonHoc.gioiHanTuanKetThuc = tuanBatDau;
        this.setState({
            lopMonHoc: lopMonHoc,
            tuanKetThucs: tuanKetThucs
        })
    }

    _onTuanKetThucChange(e) {
        let lopMonHoc = this.state.lopMonHoc;
        lopMonHoc.gioiHanTuanKetThuc = e.target.value;
        this.setState({
            lopMonHoc: lopMonHoc
        })
    }

    render() {

        const years = this.state.years;
        const terms = this.state.terms;
        const faculties = this.state.faculties;
        const yearOfAdmissions = this.state.yearOfAdmissions;
        const haveMajor = this.state.haveMajor;
        const majors = this.state.majors;

        return (
            <div>
                <div className="section">
                    <div className="section-title margin-left-20">Chọn kỳ học - năm học và khoa - khóa học</div>
                    <div className="choose-condition-item">
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Năm học
                    </span>
                            <select className="year-select-short" onChange={this.handleYearChange}
                                    value={this.state.chosenYearId}>
                                {years.map(year => <option key={year.id} value={year.id}>{year.name}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Kỳ học
                    </span>
                            <select className="year-select-short" onChange={this.handleTermChange}
                                    value={this.state.chosenTermId}>
                                {terms.map(term => <option key={term.id} value={term.id}>{term.ten}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Khoa
                    </span>
                            <select className="year-select-long" onChange={this.handleFacultyChange}
                                    value={this.state.chosenFacultyId}>
                                {faculties.map(faculty => <option key={faculty.id}
                                                                  value={faculty.id}>{faculty.ten}</option>)}
                            </select>
                        </div>
                        <div className="choose-condition-item">
                    <span className="edit-title">
                        Khóa
                    </span>
                            <select className="year-select-short" onChange={this.handleYearOfAdmissionChange}
                                    value={this.state.chosenYearOfAdmissionId}>
                                {yearOfAdmissions.map(yearOfAdmission => <option key={yearOfAdmission.id}
                                                                                 value={yearOfAdmission.id}>
                                    {yearOfAdmission.nam}</option>)}
                            </select>
                        </div>
                        {haveMajor ? <div className="choose-condition-item">
                    <span className="edit-title">
                        Ngành
                    </span>
                            <select className="year-select-long" onChange={this.handleMajorChange}
                                    value={this.state.chosenMajorId}>
                                {majors.map(major => <option key={major.id} value={major.id}>{major.ten}</option>)}
                            </select>
                        </div> : ""}
                        <div className="choose-condition-item">
                            <button className="ok-button button-mini" onClick={this._handleSubmit}>OK</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="section-title margin-left-20">Thêm lớp môn học</div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Môn học
                    </span>
                    <select className="input-append" onChange={this._onMonHocChange}
                            value={this.state.lopMonHoc.dmMonHoc.id}>
                        {this.state.monHocs.map(monHoc => <option key={monHoc.id}
                                                                  value={monHoc.id}>{monHoc.maMonHoc + " " + monHoc.ten}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">
                        Giảng viên
                    </span>
                    <select className="input-append" onChange={this._onGiangVienChange}
                            value={this.state.lopMonHoc.dmNhanVien.id}>
                        {this.state.nhanViens.map(nhanVien => <option key={nhanVien.id}
                                                                      value={nhanVien.id}>{nhanVien.maNhanVien + " " + nhanVien.hoDem + " " + nhanVien.ten}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">Số tiết lý thuyết</span>
                    <input className="input-small margin-left-20" value={this.state.lopMonHoc.soTietLyThuyet}
                           type="number" onChange={this._onSoTietLyThuyetChange}/>
                </div>

                <div className="choose-condition-item">
                    <span className="edit-title">Số tiết thực hành</span>
                    <input className="input-small margin-left-20" value={this.state.lopMonHoc.soTietThucHanh}
                           type="number" onChange={this._onSoTietThucHanhChange}/>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">Số lượng tối đa</span>
                    <input className="input-small margin-left-20" value={this.state.lopMonHoc.soLuongToiDa}
                           type="number" onChange={this._onSoLuongToiDaChange}/>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">Giới hạn tuần bắt đầu</span>
                    <select className="input-append" onChange={this._onTuanBatDauChange}
                            value={this.state.lopMonHoc.gioiHanTuanBatDau}>
                        {this.state.tuans.map(tuan => <option key={tuan}
                                                              value={tuan}>{"Tuần " + tuan}</option>)}
                    </select>
                </div>
                <div className="choose-condition-item">
                    <span className="edit-title">Giới hạn tuần kết thúc</span>
                    <select className="input-append" onChange={this._onTuanKetThucChange}
                            value={this.state.lopMonHoc.gioiHanTuanKetThuc}>
                        {this.state.tuanKetThucs.map(tuan => <option key={tuan}
                                                                     value={tuan}>{"Tuần " + tuan}</option>)}
                    </select>
                </div>
                <br/>
                <div className="choose-condition-item">
                    <button className="ok-button button-mini" onClick={this._handleSubmit2}>Thêm</button>
                </div>
                <div className="section">
                    <div className="section-title margin-left-20">Danh sách lớp môn học</div>
                    <div className="error-message margin-left-20">{this.state.errorMess}</div>
                    <div className="margin-left-20">
                        <TSMD_AllLopMonHocs _onDeleteLopMonHoc={this._onDeleteLopMonHoc} _triggerModal={this._triggerModal}
                                            lopMonHocs={this.state.lopMonHocs}/>
                    </div>
                    <TSMD_EditLopMonHoc _onEditLopMonHoc={this._onEditLopMonHoc} monHocs={this.state.monHocs} nhanViens={this.state.nhanViens}
                                        tuans={this.state.tuans} lopMonHoc={this.state.editingLopMonHoc}/>
                </div>
            </div>)
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }
}

export default TSMD_InputLopMonHoc