import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import { saveBulkSchedule } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      allDoctors: [],
      currentDate: new Date(),
      allSchedules: [],
    };
  }
  buildDataInputSelect = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((doctor, index) => {
        let obj = {};
        let labelVi = `${doctor.lastName} ${doctor.firstName}`;
        let labelEn = `${doctor.firstName} ${doctor.lastName}`;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = doctor.id;
        result.push(obj);
      });
    }
    return result;
  };

  componentDidMount() {
    this.props.getAllDoctorsStart();
    this.props.getAllSchedulesStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.allSchedulesRedux !== this.props.allSchedulesRedux) {
      let data = this.props.allSchedulesRedux;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({ allSchedules: data });
    }
  }
  handleChangeSelectedDoctor = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickButtonTime = (schedule) => {
    let copyAllSchedules = this.state.allSchedules;
    if (copyAllSchedules && copyAllSchedules.length > 0) {
      copyAllSchedules.forEach((item) => {
        if (item.id === schedule.id) {
          item.isSelected = !item.isSelected;
        }
      });
    }
    this.setState({ allSchedules: copyAllSchedules });
  };

  handleSaveSchedule = async () => {
    let { allSchedules, selectedDoctor, currentDate } = this.state;
    if (!currentDate) {
      toast.error("Please choose date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Please choose doctor!");
      return;
    }
    currentDate = moment(currentDate)
      .format(dateFormat.SEND_TO_SERVER)
      .toString();
    if (allSchedules && allSchedules.length > 0) {
      let selectedSchedules = allSchedules.filter(
        (item) => item.isSelected === true
      );
      if (!(selectedSchedules && selectedSchedules.length > 0)) {
        toast.error("Please choose schedule!");
        return;
      } else {
        let result = [];
        selectedSchedules.map((time) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = currentDate;
          obj.timeType = time.keyMap;
          result.push(obj);
        });
        let response = await saveBulkSchedule({
          arrSchedules: result,
          doctorId: selectedDoctor.value,
          date: currentDate,
        });
        if (response && response.errCode === 0) {
          let copyAllSchedules = this.state.allSchedules;
          copyAllSchedules.forEach((schedule) => {
            schedule.isSelected = false;
          });
          this.setState({
            selectedDoctor: {},
            currentDate: new Date(),
            allSchedules: copyAllSchedules,
          });
          toast.success("Save schedule success!");
        }
      }
    }
  };
  render() {
    let { selectedDoctor, allDoctors, currentDate, allSchedules } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={selectedDoctor}
                  onChange={this.handleChangeSelectedDoctor}
                  options={allDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={currentDate}
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {allSchedules &&
                  allSchedules.length > 0 &&
                  allSchedules.map((schedule, index) => {
                    return (
                      <button
                        onClick={() => this.handleClickButtonTime(schedule)}
                        key={index}
                        className={`col-2 btn btn-${
                          schedule.isSelected ? "warning" : "secondary"
                        }`}
                      >
                        {language === LANGUAGES.VI
                          ? schedule.valueVi
                          : schedule.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button
                  onClick={() => this.handleSaveSchedule()}
                  className="btn btn-primary"
                >
                  <FormattedMessage id="manage-schedule.save-info" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    allSchedulesRedux: state.admin.allSchedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
    getAllSchedulesStart: () => dispatch(actions.fetchAllSchedulesStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
