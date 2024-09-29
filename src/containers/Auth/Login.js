import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassWord: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (e) => {
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
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassWord = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  render() {
    let { username, password, isShowPassWord, errMessage } = this.state;
    return (
      <div className="login-bg">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => this.handleOnChangeUserName(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={!isShowPassWord ? "password" : "text"}
                  className="form-control input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                />
                {password && (
                  <span
                    onClick={() => this.handleShowHidePassWord()}
                    className="eye"
                  >
                    {!isShowPassWord ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div style={{ color: "red" }} className="col-12">
              {errMessage}
            </div>
            <div className="col-12">
              <button onClick={() => this.handleLogin()} className="login-btn">
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
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
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
