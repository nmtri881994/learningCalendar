/**
 * Created by Tri on 7/26/2017.
 */
import axios from "axios";
import {APP_URL} from "../configuration/appConfig"

const BASE_URL = `${APP_URL}/api/input-data`;

export const getAllFaculties = (cb, fcb) => {
    axios(BASE_URL + "/all-khoas", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const inputFaculty = (falcuty, cb, fcb) => {
    axios.post(BASE_URL + "/khoa", falcuty, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editFaculty = (falcuty, cb, fcb) => {
    axios.post(BASE_URL + "/edit-khoa", falcuty, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteFaculty = (facultyId, cb, fcb) => {
    axios(BASE_URL + "/delete-khoa/" + facultyId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllRoomType = (cb, fcb) => {
    axios(BASE_URL + "/all-loai-phong", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllGiangDuong = (cb, fcb) => {
    axios(BASE_URL + "/all-giang-duong", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertRoom = (room, cb, fcb) => {
    axios.post(BASE_URL + "/giang-duong", room, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editRoom = (room, cb, fcb) => {
    axios.post(BASE_URL + "/giang-duong/edit", room, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteRoom = (roomId, cb, fcb) => {
    axios(BASE_URL + "/giang-duong/delete/" + roomId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//terms
export const getAllTerms = (cb, fcb) => {
    axios(BASE_URL + "/all-khoa-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertTerm = (term, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-hoc", term, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editTerm = (term, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-hoc/edit", term, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteTerm = (termId, cb, fcb) => {
    axios(BASE_URL + "/khoa-hoc/delete/" + termId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//years
export const getAllYears = (cb, fcb) => {
    axios(BASE_URL + "/all-nam-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertYear = (year, cb, fcb) => {
    axios.post(BASE_URL + "/nam-hoc", year, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editYear = (year, cb, fcb) => {
    axios.post(BASE_URL + "/nam-hoc/edit", year, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteYear = (yearId, cb, fcb) => {
    axios(BASE_URL + "/nam-hoc/delete/" + yearId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//term - year
export const getAllTerms1 = (cb, fcb) => {
    axios(BASE_URL + "/all-ki-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllTermYears = (cb, fcb) => {
    axios(BASE_URL + "/all-ki-hoc-nam-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};


export const insertTermYear = (termYear, cb, fcb) => {
    axios.post(BASE_URL + "/ki-hoc-nam-hoc", termYear, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editTermYear = (termYear, cb, fcb) => {
    axios.post(BASE_URL + "/ki-hoc-nam-hoc/edit", termYear, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteTermYear = (termYearId, cb, fcb) => {
    axios(BASE_URL + "/ki-hoc-nam-hoc/delete/" + termYearId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//khoa - khoa hoc
export const getAllKhoaKhoaHocs = (cb, fcb) => {
    axios(BASE_URL + "/all-khoa-khoa-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertKhoaKhoaHoc = (khoaKhoaHoc, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-khoa-hoc", khoaKhoaHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editKhoaKhoaHoc = (khoaKhoaHoc, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-khoa-hoc/edit", khoaKhoaHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteKhoaKhoaHoc = (khoaKhoaHocId, cb, fcb) => {
    axios(BASE_URL + "/khoa-khoa-hoc/delete/" + khoaKhoaHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//lop hoc
export const getAllLopHocs = (cb, fcb) => {
    axios(BASE_URL + "/all-lop-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertLopHoc = (lopHoc, cb, fcb) => {
    axios.post(BASE_URL + "/lop-hoc", lopHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editLopHoc = (lopHoc, cb, fcb) => {
    axios.post(BASE_URL + "/lop-hoc/edit", lopHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteLopHoc = (lopHocId, cb, fcb) => {
    axios(BASE_URL + "/lop-hoc/delete/" + lopHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//nhan vien
export const getAllNhanViens = (cb, fcb) => {
    axios(BASE_URL + "/all-nhan-vien", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertNhanVien = (nhanVien, cb, fcb) => {
    axios.post(BASE_URL + "/nhan-vien", nhanVien, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editNhanVien = (nhanVien, cb, fcb) => {
    axios.post(BASE_URL + "/nhan-vien/edit", nhanVien, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteNhanVien = (nhanVienId, cb, fcb) => {
    axios(BASE_URL + "/nhan-vien/delete/" + nhanVienId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//nhan vien - vai tro
export const getAllNhanVienVaiTros = (cb, fcb) => {
    axios(BASE_URL + "/all-nhan-vien-vai-tro", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllVaiTros = (cb, fcb) => {
    axios(BASE_URL + "/all-vai-tro", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllTaiKhoanNhanViens = (cb, fcb) => {
    axios(BASE_URL + "/all-tai-khoan-nhan-vien", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertNhanVienVaiTro = (nhanVienVaiTro, cb, fcb) => {
    axios.post(BASE_URL + "/nhan-vien-vai-tro", nhanVienVaiTro, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};


export const deleteNhanVienVaiTro = (nhanVienVaiTroId, cb, fcb) => {
    axios(BASE_URL + "/nhan-vien-vai-tro/delete/" + nhanVienVaiTroId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};


//nhan vien
export const getAllNganhs = (cb, fcb) => {
    axios(BASE_URL + "/all-nganh", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertNganh = (nganh, cb, fcb) => {
    axios.post(BASE_URL + "/nganh", nganh, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editNganh = (nganh, cb, fcb) => {
    axios.post(BASE_URL + "/nganh/edit", nganh, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteNganh = (nganhId, cb, fcb) => {
    axios(BASE_URL + "/nganh/delete/" + nganhId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//khoa - khoa hoc - nganh
export const getAllKhoaKhoaHocNganhs = (cb, fcb) => {
    axios(BASE_URL + "/all-khoa-khoa-hoc-nganh", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertKhoaKhoaHocNganh = (khoaKhoaHocNganh, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-khoa-hoc-nganh", khoaKhoaHocNganh, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editKhoaKhoaHocNganh = (khoaKhoaHocNganh, cb, fcb) => {
    axios.post(BASE_URL + "/khoa-khoa-hoc-nganh/edit", khoaKhoaHocNganh, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteKhoaKhoaHocNganh = (khoaKhoaHocNganhId, cb, fcb) => {
    axios(BASE_URL + "/khoa-khoa-hoc-nganh/delete/" + khoaKhoaHocNganhId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//Sinh viên
export const getAllSinhViens = (cb, fcb) => {
    axios(BASE_URL + "/all-sinh-vien", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertSinhVien = (sinhVien, cb, fcb) => {
    axios.post(BASE_URL + "/sinh-vien", sinhVien, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editSinhVien = (sinhVien, cb, fcb) => {
    axios.post(BASE_URL + "/sinh-vien/edit", sinhVien, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteSinhVien = (sinhVienId, cb, fcb) => {
    axios(BASE_URL + "/sinh-vien/delete/" + sinhVienId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllLopHocByKhoaAndKhoaHoc = (khoaId, khoaHocId, cb, fcb) => {
    axios(BASE_URL + "/all-lop-hoc/" + khoaId + "/" + khoaHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
}

//Sinh viên
export const getAllMonHocs = (cb, fcb) => {
    axios(BASE_URL + "/all-mon-hoc", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertMonHoc = (monHoc, cb, fcb) => {
    axios.post(BASE_URL + "/mon-hoc", monHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editMonHoc = (monHoc, cb, fcb) => {
    axios.post(BASE_URL + "/mon-hoc/edit", monHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteMonHoc = (monHocId, cb, fcb) => {
    axios(BASE_URL + "/mon-hoc/delete/" + monHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//Sinh viên - nganh

export const editSinhVienNganh = (sinhVienId, nganhId, cb, fcb) => {
    axios(BASE_URL + "/sinh-vien-nganh/edit/" + sinhVienId + "/" + nganhId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteSinhVienNganh = (sinhVienId, cb, fcb) => {
    axios(BASE_URL + "/sinh-vien-nganh/delete-nganh/" + sinhVienId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getAllNganhOfSinhVien = (sinhVienId, cb, fcb) => {
    axios(BASE_URL + "/sinh-vien-nganh/get-all-nganh-of-sinh-vien/" + sinhVienId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//Mon hoc giang duong

export const getAllMonHocGiangDUong = (cb, fcb) => {
    axios(BASE_URL + "/all-mon-hoc-giang-duong", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertMHGD = (monHocId, giangDuongId, cb, fcb) => {
    axios(BASE_URL + "/mon-hoc-giang-duong/" + monHocId + "/" + giangDuongId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteMHGD = (monHocGiangDuongId, cb, fcb) => {
    axios(BASE_URL + "/mon-hoc-giang-duong/delete/" + monHocGiangDuongId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

//Lớp môn học

export const getAllLopMonHocs = (namHocId, kiHocId, khoaId, khoaHocId, nganhId, cb, fcb) => {
    axios(BASE_URL + "/all-lop-mon-hoc/" + namHocId + "/" + kiHocId + "/" + khoaId + "/" + khoaHocId + "/" + nganhId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const insertLopMonHoc = (lopMonHoc, cb, fcb) => {
    axios.post(BASE_URL + "/lop-mon-hoc/", lopMonHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const editLopMonHoc = (lopMonHoc, cb, fcb) => {
    axios.post(BASE_URL + "/lop-mon-hoc/edit", lopMonHoc, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteLopMonHoc = (lopMonHocID, cb, fcb) => {
    axios(BASE_URL + "/lop-mon-hoc/delete/" + lopMonHocID, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const khoaKhoaHocAddNhom = (khoaKhoaHocId, groupNumber, cb, fcb) => {
    axios(BASE_URL + "/khoa-khoa-hoc/add-group/" + khoaKhoaHocId + "/" + groupNumber, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const khoaKhoaHocNganhAddNhom = (khoaKhoaHocNganhId, groupNumber, cb, fcb) => {
    axios(BASE_URL + "/khoa-khoa-hoc-nganh/add-group/" + khoaKhoaHocNganhId + "/" + groupNumber, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const deleteNhom = (khoaKhoaHocId, khoaKhoaHocNganhId, groupId, cb, fcb) => {
    axios(BASE_URL + "/nhom/delete/" + khoaKhoaHocId + "/" + khoaKhoaHocNganhId + "/" + groupId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getNhomOfKhoaKhoaHoc = (khoaKhoaHocId, cb, fcb) => {
    axios(BASE_URL + "/nhom/get-nhom-cua-khoa-khoa-hoc/"+khoaKhoaHocId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};

export const getNhomOfKhoaKhoaHocNganh = (khoaKhoaHocNganhId, cb, fcb) => {
    axios(BASE_URL + "/nhom/get-nhom-cua-khoa-khoa-hoc-nganh/"+khoaKhoaHocNganhId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};