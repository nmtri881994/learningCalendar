/**
 * Created by Tri on 3/25/2017.
 */
import React, {Component} from 'react'

class EditClass extends Component{

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        alert(nextProps.lessonId);
    }

    render(){
        return(<div>
            <h2>Animated Modal with Header and Footer</h2>

            {/*<!-- Trigger/Open The Modal -->*/}
            <button id="myBtn">Open Modal</button>

            {/*<!-- The Modal -->*/}
            <div id="myModal" className="modal">

                {/*<!-- Modal content -->*/}
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Modal Header</h2>
                    </div>
                    <div className="modal-body">
                        <p>Some text in the Modal Body</p>
                        <p>Some other text...</p>
                    </div>
                    <div className="modal-footer">
                        <h3>Modal Footer</h3>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default EditClass;