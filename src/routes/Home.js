import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    let linkToRedirect = "";
    if (isLoggedIn) {
      if (userInfo.roleId === USER_ROLE.ADMIN)
        linkToRedirect = "/system/user-manage";
      else if (userInfo.roleId === USER_ROLE.DOCTOR)
        linkToRedirect = "/doctor/manage-schedule";
    } else linkToRedirect = "/home";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
