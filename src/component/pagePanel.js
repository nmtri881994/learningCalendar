/**
 * Created by XuanVinh on 3/4/2017.
 */
import React, {Component} from 'react'
import Calendar from './calendar/calendar'

class PagePanel extends Component{
    render(){
        return(
            <div className="page-panel">
                <div className="page-panel-inner">
                    <div className="page-panel-content">
                        Calendar format
                        <Calendar/>
                    </div>
                </div>
            </div>
        );
    }
}
export default PagePanel