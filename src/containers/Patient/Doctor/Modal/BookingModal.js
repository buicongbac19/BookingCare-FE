import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _, { add, flatMap, intersection } from "lodash";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {
  postPatientBookAppointment,
  getExtraInfoDoctorById,
} from "../../../../services/userService";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import OpenContext from "../OpenContext";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      birthDay: "",
      address: "",
      reason: "",
      allGenders: [],
      selectedGender: {},
      allPayments: [],
      selectedPayment: {},
      doctorId: "",
      timeType: "",
      date: "",
      isError: false,
      extraInfo: {},
    };
  }

  static contextType = OpenContext;

  async componentDidMount() {
    this.props.getAllGendersStart();
    this.props.getAllPaymentsStart();
  }

  buildDataInputSelect = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allGendersRedux !== this.props.allGendersRedux) {
      this.setState({
        allGenders: this.buildDataInputSelect(this.props.allGendersRedux),
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        allGenders: this.buildDataInputSelect(this.props.allGendersRedux),
      });
    }
    if (prevProps.allPaymentsRedux !== this.props.allPaymentsRedux) {
      this.setState({
        allPayments: this.buildDataInputSelect(this.props.allPaymentsRedux),
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        allPayments: this.buildDataInputSelect(this.props.allPaymentsRedux),
      });
    }
    if (prevProps.scheduleFromParent !== this.props.scheduleFromParent) {
      let doctorId =
        this.props.scheduleFromParent &&
        !_.isEmpty(this.props.scheduleFromParent) &&
        this.props.scheduleFromParent.doctorId
          ? this.props.scheduleFromParent.doctorId
          : "";
      this.setState({
        doctorId: doctorId,
        timeType: this.props.scheduleFromParent.timeType,
        date: this.props.scheduleFromParent.date,
      });
      let res = await getExtraInfoDoctorById(doctorId);
      if (res && res.errCode === 0) {
        this.setState({ extraInfo: res.data });
      }
    }
  }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };

  handleOnChangeSelectedInput = async (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({ ...copyState });
  };

  checkValidInput = () => {
    let isValid = true;
    let arr = [
      "fullName",
      "phoneNumber",
      "email",
      "birthDay",
      "address",
      "reason",
      "selectedGender",
      "selectedPayment",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]] || _.isEmpty(this.state[arr[i]])) {
        isValid = false;
        let showError = document.querySelector(`span.${arr[i]}`);
        showError.textContent = "Vui lòng nhập thông tin";
      } else if (arr[i] === "email") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            this.state.email
          ) !== true
        ) {
          isValid = false;
          document.querySelector("span.email").textContent =
            "Email không hợp lệ";
        } else {
          isValid = true;
          document.querySelector("span.email").textContent = "";
        }
      } else if (arr[i] === "birthDay") {
        let age = this.state["birthDay"].split("/");
        if (
          age.length < 3 ||
          isNaN(Date.parse(age[2] + "-" + age[1] + "-" + age[0]))
        ) {
          isValid = false;
          document.querySelector("span.birthDay").textContent =
            "Ngày sinh không hợp lệ";
        } else {
          isValid = true;
          document.querySelector("span.birthDay").textContent = "";
        }
      } else {
        let showError = document.querySelector(`span.${arr[i]}`);
        showError.textContent = "";
      }
    }
    return isValid;
  };

  handleConfirmBooking = async () => {
    let isValid = this.checkValidInput();
    if (!isValid) {
      alert("Vui lòng kiểm tra lại thông tin!");
    } else {
      this.context.handleShowHideLoading(true);
      let language = this.props.language;
      let time = this.buildBookingTime(this.props.scheduleFromParent);
      let doctorName = this.buildDoctorName(this.props.scheduleFromParent);
      let { extraInfo } = this.state;
      let clinicAddress =
        extraInfo && !_.isEmpty(extraInfo) ? extraInfo.nameClinic : "";
      let price =
        extraInfo && !_.isEmpty(extraInfo) && !_.isEmpty(extraInfo.priceData)
          ? extraInfo.priceData.valueVi + "VND"
          : "";
      let response = await postPatientBookAppointment({
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        birthDay: this.state.birthDay,
        address: this.state.address,
        reason: this.state.reason,
        selectedGender: this.state.selectedGender.value,
        selectedPayment: this.state.selectedPayment.value,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        date: this.state.date,
        time: language === LANGUAGES.VI ? time.dateVi : time.dateEn,
        doctorName:
          language === LANGUAGES.VI ? doctorName.nameVi : doctorName.nameEn,
        language: this.props.language,
        clinicAddress: clinicAddress,
        price: price,
      });
      if (response && response.errCode === 0) {
        this.context.handleShowHideLoading(false);
        toast.success(
          language === LANGUAGES.VI
            ? "Đặt lịch khám bệnh thành công!"
            : "Book appointment successfully!"
        );
        this.props.closeModal();
        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          birthDay: "",
          address: "",
          reason: "",
          selectedGender: {},
          selectedPayment: {},
          timeType: "",
        });
      } else {
        this.context.handleShowHideLoading(false);
        toast.error(
          language === LANGUAGES.VI
            ? "Đã có lỗi xảy ra, vui lòng thử lại!"
            : "An error occurred, please try again!"
        );
      }
    }
  };

  buildBookingTime = (data) => {
    let dateVi = "",
      dateEn = "";
    if (data && !_.isEmpty(data) && data.timeTypeData) {
      dateVi = data.timeTypeData.valueVi + " - " + data.date;
      dateEn = data.timeTypeData.valueEn + " - " + data.date;
      return { dateVi, dateEn };
    }
  };

  buildDoctorName = (data) => {
    let nameVi = "",
      nameEn = "";
    if (data && !_.isEmpty(data) && data.doctorData) {
      nameVi = data.doctorData.lastName + " " + data.doctorData.firstName;
      nameEn = data.doctorData.firstName + " " + data.doctorData.lastName;
    }
    return { nameVi, nameEn };
  };

  render() {
    let { isOpenModal, scheduleFromParent, language } = this.props;
    let {
      fullName,
      phoneNumber,
      email,
      birthDay,
      address,
      reason,
      allGenders,
      selectedGender,
      allPayments,
      selectedPayment,
      extraInfo,
    } = this.state;
    let { priceData } = this.props;
    let doctorId =
      scheduleFromParent &&
      !_.isEmpty(scheduleFromParent) &&
      scheduleFromParent.doctorId
        ? scheduleFromParent.doctorId
        : "";
    return (
      <>
        <Modal size="lg" isOpen={isOpenModal} centered>
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="header-title">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span
                onClick={this.props.closeModal}
                className="header-close-btn"
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info-container">
                <div className="doctor-info">
                  <ProfileDoctor
                    date={this.buildBookingTime(scheduleFromParent)}
                    doctorId={doctorId}
                    isUseModal={false}
                    scheduleFromParent={scheduleFromParent}
                  />
                </div>
              </div>
              <div className=" booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-user"></i>
                <input
                  value={fullName}
                  onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Họ và tên bệnh nhân (bắt buộc)"
                      : "Patient's full name (required)"
                  }
                  className="fullName booking-input"
                />
              </div>
              <p className="input-name-note">
                <FormattedMessage id="patient.booking-modal.name-note" />
              </p>
              <span className="error-notify fullName"></span>
              <div className="booking-input-gender">
                <div className="text-gender">
                  <FormattedMessage id="patient.booking-modal.gender" />
                </div>
                <Select
                  className="selectedGender"
                  value={selectedGender}
                  onChange={this.handleOnChangeSelectedInput}
                  options={allGenders}
                  name="selectedGender"
                />
                <span className="error-notify selectedGender"></span>
              </div>
              <div className="booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-phone"></i>
                <input
                  value={phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Số điện thoại liên hệ"
                      : "Contact phone number"
                  }
                  className="phoneNumber booking-input"
                />
              </div>
              <span className="error-notify phoneNumber"></span>
              <div className="booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-envelope"></i>
                <input
                  value={email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Địa chỉ email (bắt buộc)"
                      : "Email address (required)"
                  }
                  className="email booking-input"
                />
              </div>
              <span className="error-notify email"></span>
              <div className="booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-calendar-days"></i>
                <input
                  value={birthDay}
                  onChange={(e) => this.handleOnChangeInput(e, "birthDay")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Ngày/tháng/năm sinh (bắt buộc)"
                      : "Date of birth (required)"
                  }
                  className="birthDay booking-input"
                />
              </div>
              <span className="error-notify birthDay"></span>
              <div className="booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-location-dot"></i>
                <input
                  value={address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Địa chỉ (bắt buộc)"
                      : "Address (required)"
                  }
                  className="address booking-input"
                />
              </div>
              <span className="error-notify address"></span>
              <div className="booking-input-wrapper">
                <i className="booking-input-icon fa-solid fa-notes-medical"></i>
                <input
                  value={reason}
                  onChange={(e) => this.handleOnChangeInput(e, "reason")}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Lý do khám"
                      : "Reason for examination"
                  }
                  className="reason booking-input"
                />
              </div>
              <span className="error-notify reason"></span>
              <div className="booking-payment-method">
                <div className="text-method">
                  <FormattedMessage id="patient.booking-modal.payment-method" />
                </div>
                <Select
                  className="selectedPayment"
                  value={selectedPayment}
                  onChange={this.handleOnChangeSelectedInput}
                  options={allPayments}
                  name="selectedPayment"
                />
              </div>
              <span className="error-notify selectedPayment"></span>
              <div className="booking-overview">
                <div className="content-up">
                  <div className="fee">
                    <div>
                      <FormattedMessage id="patient.booking-modal.examination-fee" />
                    </div>
                    <div>
                      <NumberFormat
                        value={
                          priceData &&
                          !_.isEmpty(priceData) &&
                          (language === LANGUAGES.VI
                            ? priceData.valueVi
                            : priceData.valueEn)
                        }
                        displayType="text"
                        thousandSeparator={true}
                        suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                      />
                    </div>
                  </div>
                  <div className="fee">
                    <div>
                      <FormattedMessage id="patient.booking-modal.booking-fee" />
                    </div>
                    <div>
                      <FormattedMessage id="patient.booking-modal.free" />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="content-down">
                  <div className="fee">
                    <div>
                      <FormattedMessage id="patient.booking-modal.total" />
                    </div>
                    <div className="total">
                      <NumberFormat
                        value={
                          priceData &&
                          !_.isEmpty(priceData) &&
                          (language === LANGUAGES.VI
                            ? priceData.valueVi
                            : priceData.valueEn)
                        }
                        displayType="text"
                        thousandSeparator={true}
                        suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-note">
                <FormattedMessage id="patient.booking-modal.text-note" />
              </div>
            </div>
            <div className="booking-modal-footer">
              <div className="footer-note">
                <div className="footer-note-title">
                  <FormattedMessage id="patient.booking-modal.footer.note-title" />
                </div>
                <div className="footer-note-desc">
                  <FormattedMessage id="patient.booking-modal.footer.note-desc" />
                </div>
                <ul>
                  <li>
                    <FormattedMessage id="patient.booking-modal.footer.note-name" />
                    <span className="footer-note-name">
                      {language === LANGUAGES.VI
                        ? " Trần Văn Phú"
                        : " Tran Van Phu"}
                    </span>
                  </li>
                  <li>
                    <FormattedMessage id="patient.booking-modal.footer.fill-in" />
                  </li>
                </ul>
              </div>
              <div
                onClick={() => this.handleConfirmBooking()}
                className="footer-confirm"
              >
                <FormattedMessage id="patient.booking-modal.footer.confirm-booking" />
              </div>
              <div className="term-confirm">
                <FormattedMessage id="patient.booking-modal.footer.term-confirm" />{" "}
                <span className="term">
                  <FormattedMessage id="patient.booking-modal.footer.term" />
                </span>{" "}
                <FormattedMessage id="patient.booking-modal.footer.our-services" />
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allGendersRedux: state.admin.genders,
    allPaymentsRedux: state.admin.allPayments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGendersStart: () => dispatch(actions.fetchGenderStart()),
    getAllPaymentsStart: () => dispatch(actions.fetchAllPaymentsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
