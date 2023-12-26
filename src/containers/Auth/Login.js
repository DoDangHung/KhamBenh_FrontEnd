/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";
// import { FormattedMessage } from "react-intl";

class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 login-text">Login</div>
              <div className="col-12 form-group login-input">
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required
                  value={this.state.username}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password: </label>
                <div className="custom-input-password">
                  <input
                    className="form-control"
                    type={this.state.isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={(e) => this.handleOnChangePassword(e)}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i
                      class={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={(e) => this.handleLogin(e)}
                >
                  SignIn
                </button>
              </div>
              <div className="col-12 text-c">
                <span className="forgot-password">Forgot your Password?</span>
              </div>
              <div className="col-12 text-center mt-3">
                <span className="login-icon">Login with: </span>
              </div>
              <div class="col-12 social-login">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-google-plus-g"></i>
                <i class="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
