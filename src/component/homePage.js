/**
 * Created by XuanVinh on 3/17/2017.
 */
import React, {Component} from 'react';
class HomePage extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default HomePage;