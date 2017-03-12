/**
 * Created by Tri on 3/12/2017.
 */
import React, {Component} from 'react'

class Lesson extends Component{
    render(){


        var css = "lesson";

        if(this.props.morning){
            css += "-morning"
        }else{
            css += "-afternoon"
        }

        if(this.props.haveClass){
            css = "lesson-"+this.props.numberOfClass+" " + css + "-"+ this.props.numberOfClass;
        }

        return (
            <div className={css}>
            </div>
        );
    }
}

export default Lesson;