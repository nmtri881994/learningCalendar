import {connect} from 'react-redux'
import ShowAllClassesComponent from '../component/tsmd/showAllClassesComponent'
import {getAllClasses} from '../action/classAction'

const mapStateToProp = (state, ownProps) => {
    return {
        classes: state.allClasses
    }
}

const mapActionToProp = (dispatch, ownProps) => {
    return {
        getAllClasses: getAllClasses
    }
}

const ShowAllClassesContainer = connect(
    mapStateToProp,
    mapActionToProp
)(ShowAllClassesComponent)

export default ShowAllClassesContainer;