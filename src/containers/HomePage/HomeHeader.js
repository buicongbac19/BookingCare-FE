import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import AllSection from "../Patient/AllSection/AllSection";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopularQuestion: false,
    };
  }

  componentDidMount() {}

  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  viewAllSection = (sectionName) => {
    this.props.history.push(`/all-${sectionName}`);
    return <AllSection name={sectionName} />;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match !== this.props.match) {
      let name = this.props.match.path.split("-")[1];
      return <AllSection name={name} />;
    }
  }

  handleShowHidePopularQuestion = (status) => {
    this.setState({ isShowPopularQuestion: status });
  };

  render() {
    let language = this.props.language;
    let { isShowPopularQuestion } = this.state;
    let arr = [1, 2, 3];
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b onClick={() => this.viewAllSection("specialty")}>
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.find-doctor-by-specialty" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.viewAllSection("clinic")}>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.choose-hospital-or-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.viewAllSection("doctor")}>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.choose-good-doctor" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <div className="support-logo">
                  <svg
                    width="27"
                    height="24"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 24V21.3333H22.6667V11.8667C22.6667 9.26667 21.7611 7.06111 19.95 5.25C18.1389 3.43889 15.9333 2.53333 13.3333 2.53333C10.7333 2.53333 8.52778 3.43889 6.71667 5.25C4.90556 7.06111 4 9.26667 4 11.8667V20H2.66667C1.93333 20 1.30556 19.7389 0.783333 19.2167C0.261111 18.6944 0 18.0667 0 17.3333V14.6667C0 14.2 0.116667 13.7611 0.35 13.35C0.583333 12.9389 0.911111 12.6111 1.33333 12.3667L1.43333 10.6C1.61111 9.08889 2.05 7.68889 2.75 6.4C3.45 5.11111 4.32778 3.98889 5.38333 3.03333C6.43889 2.07778 7.65 1.33333 9.01667 0.8C10.3833 0.266667 11.8222 0 13.3333 0C14.8444 0 16.2778 0.266667 17.6333 0.8C18.9889 1.33333 20.2 2.07222 21.2667 3.01667C22.3333 3.96111 23.2111 5.07778 23.9 6.36667C24.5889 7.65556 25.0333 9.05556 25.2333 10.5667L25.3333 12.3C25.7556 12.5 26.0833 12.8 26.3167 13.2C26.55 13.6 26.6667 14.0222 26.6667 14.4667V17.5333C26.6667 17.9778 26.55 18.4 26.3167 18.8C26.0833 19.2 25.7556 19.5 25.3333 19.7V21.3333C25.3333 22.0667 25.0722 22.6944 24.55 23.2167C24.0278 23.7389 23.4 24 22.6667 24H12ZM9.33333 14.6667C8.95555 14.6667 8.63889 14.5389 8.38333 14.2833C8.12778 14.0278 8 13.7111 8 13.3333C8 12.9556 8.12778 12.6389 8.38333 12.3833C8.63889 12.1278 8.95555 12 9.33333 12C9.71111 12 10.0278 12.1278 10.2833 12.3833C10.5389 12.6389 10.6667 12.9556 10.6667 13.3333C10.6667 13.7111 10.5389 14.0278 10.2833 14.2833C10.0278 14.5389 9.71111 14.6667 9.33333 14.6667ZM17.3333 14.6667C16.9556 14.6667 16.6389 14.5389 16.3833 14.2833C16.1278 14.0278 16 13.7111 16 13.3333C16 12.9556 16.1278 12.6389 16.3833 12.3833C16.6389 12.1278 16.9556 12 17.3333 12C17.7111 12 18.0278 12.1278 18.2833 12.3833C18.5389 12.6389 18.6667 12.9556 18.6667 13.3333C18.6667 13.7111 18.5389 14.0278 18.2833 14.2833C18.0278 14.5389 17.7111 14.6667 17.3333 14.6667ZM5.36667 12.6C5.21111 10.2444 5.92222 8.22222 7.5 6.53333C9.07778 4.84444 11.0444 4 13.4 4C15.3778 4 17.1167 4.62778 18.6167 5.88333C20.1167 7.13889 21.0222 8.74445 21.3333 10.7C19.3111 10.6778 17.45 10.1333 15.75 9.06667C14.05 8 12.7444 6.55556 11.8333 4.73333C11.4778 6.51111 10.7278 8.09445 9.58333 9.48333C8.43889 10.8722 7.03333 11.9111 5.36667 12.6Z"
                      fill="#45C3D2"
                    />
                  </svg>
                </div>
                <FormattedMessage id="home-header.support" />
              </div>
              {/* <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changLanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changLanguage(LANGUAGES.EN)}>EN</span>
              </div> */}
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner-container">
            <div className="home-header-banner">
              <div className="banner-title">Nơi khởi nguồn sức khỏe</div>
              <div className="input-question-wrapper">
                <div className="input-question-container">
                  <input
                    onFocus={() => this.handleShowHidePopularQuestion(true)}
                    onBlur={() => this.handleShowHidePopularQuestion(false)}
                    placeholder="Nhập câu hỏi của bạn...."
                    className="input-question"
                  />
                  <div className="send-question">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      preserveAspectRatio="none"
                      width="39"
                      height="39"
                      fill="rgb(202 195 173)"
                    >
                      <path d="M81.9 27.8C47.1 12.7 12.8 50.1 30.8 83.5l69.3 128.8c4.4 8.3 12.6 13.8 21.9 15l176 22c3.4.4 6 3.3 6 6.7s-2.6 6.3-6 6.7l-176 22c-9.3 1.2-17.5 6.8-21.9 15L30.8 428.5c-18 33.4 16.3 70.8 51.1 55.7l441.9-191.5c32.1-13.9 32.1-59.5 0-73.4z"></path>
                    </svg>
                  </div>
                </div>
                <div style={{ height: "50px" }}></div>
              </div>
              {isShowPopularQuestion && (
                <div className="popular-question">
                  {arr &&
                    arr.length &&
                    arr.map((item, index) => {
                      return (
                        <div key={index} className="each-question">
                          Cân nặng dinh dưỡng của trẻ 2 tuổi là bao nhiêu?
                        </div>
                      );
                    })}
                </div>
              )}
              <div className="specific-questions">
                <div className="specific-question">
                  <div className="question-icon-container">
                    <div className="question-icon">
                      <i className="fa-solid fa-laptop-medical"></i>
                    </div>
                  </div>
                  <div className="question-content">
                    Sưng vùng lỗ tai bên ngoài phải làm sao?
                  </div>
                </div>
                <div className="specific-question">
                  <div className="question-icon-container">
                    <div className="question-icon">
                      <i className="fa-solid fa-laptop-medical"></i>
                    </div>
                  </div>
                  <div className="question-content">
                    Sưng vùng lỗ tai bên ngoài phải làm sao?
                  </div>
                </div>
                <div className="specific-question">
                  <div className="question-icon-container">
                    <div className="question-icon">
                      <i className="fa-solid fa-laptop-medical"></i>
                    </div>
                  </div>
                  <div className="question-content">
                    Sưng vùng lỗ tai bên ngoài phải làm sao?
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
