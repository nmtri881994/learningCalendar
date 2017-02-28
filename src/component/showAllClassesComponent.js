import React, {Component} from 'react'

class ShowAllClassesComponent extends Component{
    constructor(props){
        super(props)
        this.showClasses = this.showClasses.bind(this);
        this.state = {
            classes: null
        }
    }

    showClasses(){
        this.props.getAllClasses();
    }
    render(){
        var tableData;
        console.log(this.props.classes);
        if(this.props.classes){
            tableData = this.props.classes.map(
                cl =><tr key={cl.id}>
                    <td>{cl.id}</td>
                    <td>{cl.className}</td>
                </tr>
            );
        }
        return(
            <div>
                <button type="button" onClick={this.showClasses}>Nhan vao day</button>
                <div style={{width: "80%", textAlign: "center"}}>
                    <table id="myTable" className="display" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Class name</th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>Class name</th>
                        </tr>
                        </tfoot>
                        <tbody>
                        {tableData}
                        </tbody>


                    </table>
                </div>

            </div>
        );
    }
}

export default ShowAllClassesComponent;