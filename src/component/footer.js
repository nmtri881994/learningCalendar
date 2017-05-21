/**
 * Created by Tri on 2/20/2017.
 */
import React, {Component} from 'react';
class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <section className="footer-body">
                    <span className="footer-item">Trường cao đẳng nghề Đà Nẵng</span>
                    *
                    <span className="footer-item"><i className="fa fa-map-marker icon" aria-hidden="true"></i><a
                        target="_blank"
                        href="https://www.google.com/maps/place/99+T%C3%B4+Hi%E1%BA%BFn+Th%C3%A0nh,+Ph%C6%B0%E1%BB%9Bc+M%E1%BB%B9,+S%C6%A1n+Tr%C3%A0,+%C4%90%C3%A0+N%E1%BA%B5ng,+Vietnam/@16.0619436,108.2401128,17z/data=!3m1!4b1!4m5!3m4!1s0x3142177f5d9b8943:0xa45f1dd4fe3394cf!8m2!3d16.0619436!4d108.2423015"
                        className="link">99 Tô Hiến Thành, TP. Đà Nẵng</a></span>
                    *
                    <span className="footer-item"><a href="http://danavtc.edu.vn/" target="_blank" className="link">Website</a></span>
                </section>
            </footer>
        );
    }
}

export default Footer;