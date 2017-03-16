/**
 * Created by XuanVinh on 3/17/2017.
 */
import React, {Component} from 'react'

import {login} from '../action/loginAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenDangNhap: "",
            matKhau: ""
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({
            tenDangNhap: e.target.value
        });

    }

    handlePasswordChange(e) {
        this.setState({
            matKhau: e.target.value
        });
    }

    handleSubmit(){
        var account = {
            tenDangNhap: this.state.tenDangNhap,
            matKhau: this.state.matKhau,
            urlPath: ""
        }
        login(account);
    }

    render() {

        return (
            <div className="login">
                <div className="login-screen">
                    <div className="app-title">
                        <h1>Đăng nhập</h1>
                    </div>

                    <div className="login-form">
                        <div className="control-group">
                            <input type="text" className="login-field" value={this.state.tenDangNhap}
                                   placeholder="Mã đăng nhập"
                                   id="login-name" onChange={this.handleUsernameChange}/>
                        </div>

                        <div className="control-group">
                            <input type="password" className="login-field" value={this.state.matKhau}
                                   placeholder="Mật khẩu"
                                   id="login-pass" onChange={this.handlePasswordChange}/>
                        </div>

                        <a className="btn btn-primary btn-large btn-block" href="#" onClick={this.handleSubmit}>Đăng nhập</a>
                    </div>
                </div>
            </div>);
    }
}

export default Login;