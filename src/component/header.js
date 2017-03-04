/**
 * Created by Tri on 2/20/2017.
 */
import React, {Component} from 'react';
class Header extends Component {
    render() {
        return (
            <header>
                <nav className="header">
                    <div className="header-inner">
                        <div className="header-primary-items">
                            <div className="header-logo">LOGO</div>
                            <ul className="header-nav">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </div>
                        <div className="header-secondary-items">
                            <div className="header-user-avatar">AVATAR</div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;