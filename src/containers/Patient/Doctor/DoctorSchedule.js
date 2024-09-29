import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import localization from "moment/locale/vi";
import { LANGUAGES, dateFormat } from "../../../utils";
import moment from "moment";
import { getScheduleByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      scheduleFromParent: {},
    };
  }

  buildDay = () => {
    let { language } = this.props;
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0)
          obj.label = `Hôm nay - ${moment(new Date()).format("DD/MM")}`;
        else
          obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        if (i === 0)
          obj.label = `Today - ${moment(new Date())
            .locale("en")
            .format("DD/MM")}`;
        else
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
      }
      obj.label = obj.label[0].toUpperCase() + obj.label.slice(1);
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    return arrDate;
  };

  async componentDidMount() {
    let arrDate = this.buildDay();
    this.setState({ allDays: arrDate });
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId;
      let date = moment(new Date(+arrDate[0].value))
        .format(dateFormat.SEND_TO_SERVER)
        .toString();
      let response = await getScheduleByDate(doctorId, date);
      if (response && response.errCode === 0) {
        this.setState({
          allAvailableTime: response.data ? response.data : [],
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let arrDate = this.buildDay();
      this.setState({ allDays: arrDate });
    }
  }

  handleOnChangeSelect = async (e) => {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId;
      let date = moment(new Date(+e.target.value))
        .format(dateFormat.SEND_TO_SERVER)
        .toString();
      let response = await getScheduleByDate(doctorId, date);
      if (response && response.errCode === 0) {
        this.setState({
          allAvailableTime: response.data ? response.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({ isOpenModalBooking: true, scheduleFromParent: time });
  };

  closeBookingModal = () => {
    this.setState({ isOpenModalBooking: false });
  };

  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, scheduleFromParent } =
      this.state;
    let { language, priceData } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedules">
            <select
              className="select-day"
              onChange={(e) => this.handleOnChangeSelect(e)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((day, index) => {
                  return (
                    <option key={index} value={day.value}>
                      {day.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fa-regular fa-calendar-days mr-2"></i>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((time, index) => {
                      return (
                        <button
                          onClick={() => this.handleClickScheduleTime(time)}
                          key={index}
                          className={`btn-select-time ${
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }`}
                        >
                          {language === LANGUAGES.VI
                            ? time.timeTypeData.valueVi
                            : time.timeTypeData.valueEn}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                    </span>
                    <i className="fa-regular fa-hand-point-up"></i>
                    <span>
                      <FormattedMessage id="patient.detail-doctor.booking-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          priceData={priceData}
          isOpenModal={isOpenModalBooking}
          closeModal={this.closeBookingModal}
          scheduleFromParent={scheduleFromParent}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
