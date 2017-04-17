/**
 * Created by Tri on 4/13/2017.
 */
import React, {Component} from 'react'

class CalendarNewStyle extends Component {
    render() {
        return (<div>
            <div className="weekday">
                <div className="weekday-title">
                    Thu 2
                </div>
                <div className="weekday-lessons">
                    <div className="lesson-morning lesson-2"></div>
                    <div className="lesson-morning lesson-3 lesson-container">
                        <div className="lesson-tiny lesson-3 lesson-container">
                            <div className="lesson-1 morning">
                            </div>
                            <div className="lesson-2 morning sub-lesson-final">
                                <div className="class-content">
                                    <div className="subject-name thuc-hanh">
                                        THDC.CNTT.2013.3
                                    </div>
                                    <div className="subject-detail">
                                        F102<br/>
                                        Tuần: 5-6
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lesson-tiny lesson-3 lesson-container">
                            <div className="lesson-2 morning">
                                <div className="class-content">
                                    <div className="subject-name thuc-hanh">
                                        THDC.CNTT.2013.3
                                    </div>
                                    <div className="subject-detail">
                                        F102<br/>
                                        Tuần: 3-4
                                    </div>
                                </div>
                            </div>
                            <div className="lesson-1 morning sub-lesson-final"></div>
                        </div>
                        <div className="lesson-tiny lesson-3 lesson-container lesson-column-final">
                            <div className="lesson-2 morning">
                                <div className="class-content">
                                    <div className="subject-name thuc-hanh">
                                        THDC.CNTT.2013.3
                                    </div>
                                    <div className="subject-detail">
                                        F102<br/>
                                        Tuần: 3-4
                                    </div>
                                </div>
                            </div>
                            <div className="lesson-1 morning sub-lesson-final"></div>
                        </div>
                    </div>
                    <div className="lesson-afternoon lesson-2"></div>
                </div>
            </div>
            <div className="weekday">
                <div className="weekday-title">
                    Thu 3
                </div>
                <div className="weekday-lessons">
                    <div className="lesson-morning lesson-5">
                        <div className="class-content">
                            <div className="subject-name thuc-hanh">
                                THDC.CNTT.2013.3
                            </div>
                            <div className="subject-detail">
                                F102<br/>
                                Tuần: 4-5
                            </div>
                        </div>
                    </div>
                    <div className="lesson-afternoon lesson-2"></div>
                </div>
            </div>
        </div>);
    }
}

export default CalendarNewStyle;