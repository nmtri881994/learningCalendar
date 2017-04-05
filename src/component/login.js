/**
 * Created by XuanVinh on 3/17/2017.
 */
import React, {Component} from 'react'

import {login, authenLogin1} from '../action/loginAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenDangNhap: "",
            matKhau: "",
            role: "giao_vu"
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    componentWillMount(){
        authenLogin1(localStorage.getItem('role'));
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

    handleRoleChange(e){
        this.setState({
            role: e.target.value
        });
    }


    handleSubmit(){
        var account = {
            tenDangNhap: this.state.tenDangNhap,
            matKhau: this.state.matKhau,
            role: this.state.role
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

                    <form className="login-form">
                        <div className="control-group">
                            <input type="text" className="login-field login-input" required value={this.state.tenDangNhap}
                                   placeholder="Mã đăng nhập"
                                   id="login-name" onChange={this.handleUsernameChange}/>
                        </div>

                        <div className="control-group">
                            <input type="password" className="login-field login-input" required value={this.state.matKhau}
                                   placeholder="Mật khẩu"
                                   id="login-pass" onChange={this.handlePasswordChange}/>
                        </div>

                        <div className="control-group">
                            <div id="role-choose-div">
                                <select id="role-choose-select-box" value={this.state.role} onChange={this.handleRoleChange}>
                                    <option className="role-option" value="giao_vu">Giáo vụ</option>
                                    <option className="role-option" value="giang_vien">Giảng viên</option>
                                    <option className="role-option" value="sinh_vien">Sinh viên</option>
                                </select>
                            </div>
                        </div>

                        <a className="btn btn-primary btn-large btn-block cursor" onClick={this.handleSubmit}>Đăng nhập</a>
                        <div id="login-message" ref="loginMessage" className="error-message">
                            {this.props.loginMessage}
                        </div>
                    </form>
                </div>
            </div>);
    }
}

export default Login;