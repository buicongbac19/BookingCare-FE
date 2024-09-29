import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import CreateSpecialty from "../containers/System/Specialty/CreateSpecialty";
import CreateClinic from "../containers/System/Clinic/CreateClinic";
import CreateHandBook from "../containers/System/Handbook/CreateHandBook";
import UpdateHandBook from "../containers/System/Handbook/UpdateHandBook";
import UpdateSpecialty from "../containers/System/Specialty/UpdateSpecialty";
import UpdateClinic from "../containers/System/Clinic/UpdateClinic";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                path="/system/create-specialty"
                component={CreateSpecialty}
              />
              <Route
                path="/system/update-specialty"
                component={UpdateSpecialty}
              />
              <Route path="/system/create-clinic" component={CreateClinic} />
              <Route path="/system/update-clinic" component={UpdateClinic} />
              <Route
                path="/system/create-handbook"
                component={CreateHandBook}
              />
              <Route
                path="/system/update-handbook"
                component={UpdateHandBook}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
