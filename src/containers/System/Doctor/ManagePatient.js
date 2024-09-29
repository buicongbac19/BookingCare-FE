import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendPrescription,
} from "../../../services/userService";
import moment from "moment";
import { dateFormat } from "../../../utils";
import PrescriptionModal from "./PrescriptionModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { set } from "lodash";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      allPatient: [],
      isOpenModal: false,
      dataModal: {},
      isLoading: false,
    };
  }

  buildAllPatient = async () => {
    let user = this.props.user;
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: moment(this.state.currentDate).format(dateFormat.SEND_TO_SERVER),
    });
    if (res && res.errCode === 0) {
      this.setState({
        allPatient: res.data,
      });
    }
  };

  async componentDidMount() {
    this.buildAllPatient();
  }

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
    this.buildAllPatient();
  };

  handleConfirmBooking = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };

  sendPrescription = async (dataFromChild) => {
    let { dataModal } = this.state;
    this.setState({
      isLoading: true,
    });
    let response = await postSendPrescription({
      email: dataFromChild.email,
      image: dataFromChild.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
    });
    if (response && response.errCode === 0) {
      this.setState({
        isLoading: false,
      });
      toast.success("Send Prescription successfully!");
      this.closeModal();
      this.buildAllPatient();
    } else {
      this.setState({
        isLoading: false,
      });
      toast.error("Something went wrong!");
    }
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    let { currentDate, allPatient, isOpenModal, dataModal, isLoading } =
      this.state;
    return (
      <>
        <LoadingOverlay active={isLoading} spinner>
          <div className="manage-patient-container">
            <div className="title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Chọn ngày</label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleOnchangeDatePicker}
                    value={currentDate}
                  />
                </div>
                <div className="col-12">
                  {allPatient && allPatient.length > 0 ? (
                    <table className="table-manage-patient">
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Actions</th>
                      </tr>
                      {allPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {item.timeTypeDataPatient
                                ? item.timeTypeDataPatient.valueVi
                                : ""}
                            </td>
                            <td>
                              {item.patientData
                                ? item.patientData.firstName
                                : ""}
                            </td>
                            <td>
                              {item.patientData && item.patientData.genderData
                                ? item.patientData.genderData.valueVi
                                : ""}
                            </td>
                            <td>
                              {item.patientData ? item.patientData.address : ""}
                            </td>
                            <td>
                              <button
                                onClick={() => this.handleConfirmBooking(item)}
                                className="btn btn-success mr-2"
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  ) : (
                    <div className="title">
                      Không có lịch khám của bệnh nhân nào trong thời gian này!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <PrescriptionModal
            closeModal={this.closeModal}
            isOpen={isOpenModal}
            dataModal={dataModal}
            sendPrescription={this.sendPrescription}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
