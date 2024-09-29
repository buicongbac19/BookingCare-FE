import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
require("dotenv").config();

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
    };
  }

  async componentDidMount() {
    let id = this.props.doctorId;
    if (id) {
      let response = await getDetailInfoDoctor(id);
      if (response && response.errCode === 0) {
        this.setState({ profileDoctor: response.data });
      }
    }
  }

  componentDidUpdate;
  render() {
    let { profileDoctor } = this.state;
    let { language, isUseModal, scheduleFromParent, date } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (profileDoctor && profileDoctor.positionData) {
      nameVi =
        profileDoctor.positionData.valueVi +
        ", " +
        profileDoctor.lastName +
        " " +
        profileDoctor.firstName;
      nameEn =
        profileDoctor.positionData.valueEn +
        ", " +
        profileDoctor.firstName +
        " " +
        profileDoctor.lastName;
    }
    let dateVi = "",
      dateEn = "";
    if (date && !_.isEmpty(date)) {
      dateVi = date.dateVi;
      dateEn = date.dateEn;
    }
    let currentURL =
      +process.env.REACT_APP_IS_LOCAL_HOST === 1
        ? "https://chatbot-facebook-with-bcb.onrender.com"
        : window.location.href;
    return (
      <>
        {!isUseModal ? (
          <div className="intro-doctor container">
            <div className="content-left-container">
              <div
                style={{ backgroundImage: `url(${profileDoctor.image})` }}
                className="content-left"
              ></div>
              <div className="see-more">
                <FormattedMessage id="patient.profile-doctor.see-more" />
              </div>
            </div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {profileDoctor &&
                  profileDoctor.Markdown &&
                  profileDoctor.Markdown.description && (
                    <span className="doctor-desc">
                      {profileDoctor.Markdown.description}
                    </span>
                  )}
                <div className="down-address">
                  <span className="down-address-icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </span>
                  <div className="down-address-city">
                    {profileDoctor &&
                      profileDoctor.Doctor_Info &&
                      profileDoctor.Doctor_Info.provinceData &&
                      (language === LANGUAGES.VI
                        ? profileDoctor.Doctor_Info.provinceData.valueVi
                        : profileDoctor.Doctor_Info.provinceData.valueEn)}
                  </div>
                </div>
                <div className="down-action">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-doctor-container">
            <div className="profile-doctor">
              <div
                style={{ backgroundImage: `url(${profileDoctor.image})` }}
                className="content-left"
              ></div>
              <div className="content-right">
                <div className="text-booking">
                  <FormattedMessage id="patient.profile-doctor.booking" />
                </div>
                <div className="doctor-name">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className="booking-time">
                  {language === LANGUAGES.VI ? dateVi : dateEn}
                </div>
              </div>
            </div>
            <div className="price-wrapper">
              <input type="radio" checked />
              <div className="price-text">
                <FormattedMessage id="patient.profile-doctor.examination-fee" />
              </div>
              <div className="price-value">
                {profileDoctor &&
                  profileDoctor.Doctor_Info &&
                  profileDoctor.Doctor_Info.priceData && (
                    <NumberFormat
                      value={
                        language === LANGUAGES.VI
                          ? profileDoctor.Doctor_Info.priceData.valueVi
                          : profileDoctor.Doctor_Info.priceData.valueEn
                      }
                      displayType="text"
                      thousandSeparator={true}
                      suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                    />
                  )}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
