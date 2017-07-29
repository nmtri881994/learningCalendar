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
    axios(BASE_URL + "/giang-duong/delete/"+roomId, {headers: {Authorization: localStorage.getItem('token')}})
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
    axios(BASE_URL + "/khoa-hoc/delete/"+termId, {headers: {Authorization: localStorage.getItem('token')}})
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
    axios(BASE_URL + "/nam-hoc/delete/"+yearId, {headers: {Authorization: localStorage.getItem('token')}})
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
    axios(BASE_URL + "/ki-hoc-nam-hoc/delete/"+termYearId, {headers: {Authorization: localStorage.getItem('token')}})
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
    axios(BASE_URL + "/khoa-khoa-hoc/delete/"+khoaKhoaHocId, {headers: {Authorization: localStorage.getItem('token')}})
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
    axios(BASE_URL + "/lop-hoc/delete/"+lopHocId, {headers: {Authorization: localStorage.getItem('token')}})
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

export const insertNhanVien= (nhanVien, cb, fcb) => {
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
    axios(BASE_URL + "/nhan-vien/delete/"+nhanVienId, {headers: {Authorization: localStorage.getItem('token')}})
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

export const insertNhanVienVaiTro= (nhanVienVaiTro, cb, fcb) => {
    axios.post(BASE_URL + "/nhan-vien-vai-tro", nhanVienVaiTro, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};


export const deleteNhanVienVaiTro = (nhanVienVaiTroId, cb, fcb) => {
    axios(BASE_URL + "/nhan-vien-vai-tro/delete/"+nhanVienVaiTroId, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        })
};