import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { getExtraInfoDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    let data = await getExtraInfoDoctorById(this.props.doctorId);
    if (data && data.data) {
      this.setState({ extraInfo: data.data });
    }
  }

  showHideDetail = (status) => {
    this.setState({ isShowDetailInfo: status });
  };

  componentDidUpdate;
  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-info.examination-address" />
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div className="address">
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {!isShowDetailInfo ? (
              <div className="no-detail">
                <div className="text-price">
                  <FormattedMessage id="patient.extra-info.examination-fee" />
                  {":"}
                </div>
                <div className="price">
                  {extraInfo && extraInfo.priceData && (
                    <NumberFormat
                      value={
                        language === LANGUAGES.VI
                          ? extraInfo.priceData.valueVi
                          : extraInfo.priceData.valueEn
                      }
                      displayType="text"
                      thousandSeparator={true}
                      suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                    />
                  )}
                </div>
                <div
                  className="see-detail"
                  onClick={() => this.showHideDetail(true)}
                >
                  <FormattedMessage id="patient.extra-info.see-detail" />
                </div>
              </div>
            ) : (
              <div className="detail">
                <div className="text-price">
                  <FormattedMessage id="patient.extra-info.examination-fee" />
                </div>
                <div className="detail-note-container">
                  <div className="detail-note">
                    <div className="detail-price">
                      <div className="detail-price-text">
                        <FormattedMessage id="patient.extra-info.examination-fee" />
                      </div>
                      <div className="detail-price-number">
                        {extraInfo && extraInfo.priceData && (
                          <NumberFormat
                            value={
                              language === LANGUAGES.VI
                                ? extraInfo.priceData.valueVi
                                : extraInfo.priceData.valueEn
                            }
                            displayType="text"
                            thousandSeparator={true}
                            suffix={language === LANGUAGES.VI ? "VND" : "$"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="note">
                      {extraInfo && extraInfo.note ? extraInfo.note : ""}
                    </div>
                  </div>
                  <div className="payment-method">
                    <FormattedMessage id="patient.extra-info.payment-method" />
                    {extraInfo &&
                    extraInfo.paymentData &&
                    language === LANGUAGES.VI
                      ? extraInfo.paymentData.valueVi
                      : extraInfo.paymentData.valueEn}
                  </div>
                </div>
                <div
                  onClick={() => this.showHideDetail(false)}
                  className="hide-detail"
                >
                  <FormattedMessage id="patient.extra-info.hide-detail" />
                </div>
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
