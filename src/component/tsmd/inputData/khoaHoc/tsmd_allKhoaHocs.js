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
                    '<i class="fa fa-pencil-square edit-icon cursor" name="edit" data-id="' + term.id + '"/>',
                    '<i class="fa fa-trash delete-icon cursor" name="delete" data-id="' + term.id + '"/>'
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

        const _triggerModal = (id) => this.props._triggerModal(id);
        const _deleteTerm = (id) => this.props._deleteTerm(id);
        $('#myTable tbody').on('click', 'i[name="delete"]', function () {
            _deleteTerm($(this).attr("data-id"));
        })

        $('#myTable tbody').on('click', 'i[name="edit"]', function () {
            _triggerModal($(this).attr("data-id"));
        })
    }

    componentDidUpdate() {

    }
}

export default TSMD_AllKhoaHocs