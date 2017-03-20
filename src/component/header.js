/**
 * Created by Tri on 2/20/2017.
 */
import React, {Component} from 'react';

//Import actions
import {logout} from '../action/loginAction'
import {getCurrentUserName} from '../action/userAction'

//Import images

class Header extends Component {

    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        logout();
    }

    render() {
        getCurrentUserName();
        return (
            <header>
                <nav className="header">
                    <div className="header-inner">
                        <div className="header-primary-items">
                            <div className="header-logo">
                                <img className="logo" src={"/"+require('../image/logo.png')} />
                            </div>
                            <ul className="header-nav">
                                <li className="header-nav-item">Menu 1</li>
                                <li className="header-nav-item">Menu 2</li>
                                <li className="header-nav-item">Menu 3</li>
                                <li className="header-nav-item">Menu 4</li>
                            </ul>
                        </div>
                        <div className="header-secondary-items">
                            <div className="header-user quit-button cursor" onClick={this.logOut}>Thoát</div>
                            <div className="header-user">{this.props.currentUserName}</div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;