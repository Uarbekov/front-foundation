import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LoginService from "../services/LoginService";

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
        }
    }

    changeLogin = (e) => {
        this.setState({login: e.target.value})
    }

    changePassword = (e) => {
        this.setState({password: e.target.value})
    }

    authorize = (e) => {
        let adminLogin = {
            login: this.state.login,
            password: this.state.password
        }

        LoginService.login(adminLogin).then(res => {
            const { history } = this.props;
            history.push("/")
            // console.log(res);
            // this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="center_container">
                <div className="login_box">
                    <img src="admin3.png" width="50" height="50" alt="пользователь" className="login_image"/>

                    <form className="login_enter_box">
                        <div className="textfield">
                            <input type="text" id="lname" name="lname" placeholder="логин"
                                   className="login_element text-center" onChange={this.changeLogin}/>
                        </div>
                        <div className="textfield">
                            <input type="password" id="lname" name="lname" placeholder="пароль"
                                   className="login_element text-center" onChange={this.changePassword}/>

                        </div>
                    </form>
                    <button type="submit" className="btn-style font-style" onClick={this.authorize}>Войти</button>
                </div>
            </div>
        );
    }

}

export default withRouter(LoginPage);