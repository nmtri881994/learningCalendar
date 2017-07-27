/**
 * Created by Tri on 7/26/2017.
 */
import React, {Component} from 'react'

//import APIs
import * as API from '../../../../apiUtility/inputDataApi'

class TSMD_AllKhoaHocs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            terms: []
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.terms.length != 0 || nextProps.terms != this.state.terms) {
            const terms = nextProps.terms;
            this.setState({
                terms: terms
            })

            var myTable = $('#myTable').dataTable();
            myTable.fnClearTable();

            var index = 1;
            terms.map(term => {
                myTable.fnAddData([
                    index,
                    term.nam,
                    '<i class="fa fa-pencil-square edit-icon cursor" data-id="' + term.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" data-id="' + term.id + '"/>'
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
                    <th>Năm</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>STT</th>
                    <th>Năm</th>
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
    }

    componentDidUpdate() {
        const _triggerModal = (id) => this.props._triggerModal(id);
        const _deleteTerm = (id) => this.props._deleteTerm(id);
        $(document).ready(function () {
            $('.delete-icon').unbind('click').on('click', function (evt) {
                _deleteTerm($(this).attr("data-id"))
            });
            $('.edit-icon').unbind('click').on('click', function (evt) {
                _triggerModal($(this).attr("data-id"));
            });
        })
    }
}

export default TSMD_AllKhoaHocs