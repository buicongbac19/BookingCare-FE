import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { Bounce, ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import Header from "./Header/Header";
import System from "../routes/System";
import Doctor from "../routes/Doctor";

import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage";

import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import DetailHandBook from "./Patient/HandBook/DetailHandBook";
import ChatBotAI from "./Patient/ChatBot/ChatBotAI";
import AllSection from "./Patient/AllSection/AllSection";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              {/* <CustomScrollbars style={{ height: "100vh", width: "100%" }}> */}
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route
                  path={path.DOCTOR}
                  component={userIsAuthenticated(Doctor)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route path={path.AI_ASSISTANT} component={ChatBotAI} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route
                  path={path.ALL_SPECIALTY}
                  render={() => (
                    <AllSection name="specialty" title={"Chuyên khoa khám"} />
                  )}
                />
                <Route
                  path={path.ALL_CLINIC}
                  render={() => (
                    <AllSection name="clinic" title={"Cơ sở y tế"} />
                  )}
                />
                <Route
                  path={path.ALL_DOCTOR}
                  render={() => (
                    <AllSection name="doctor" title={"Bác sĩ nổi bật"} />
                  )}
                />
                <Route
                  path={path.ALL_HANDBOOK}
                  render={() => (
                    <AllSection name="handbook" title={"Bài viết nổi bật"} />
                  )}
                />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                <Route path={path.DETAIL_HANDBOOK} component={DetailHandBook} />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
              </Switch>
              {/* </CustomScrollbars> */}
            </div>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              theme="light"
              transition={Bounce}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
