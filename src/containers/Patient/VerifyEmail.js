import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { LANGUAGES } from "../../utils";
import { verifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      this.setState({ isLoading: true });
      let res = await verifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
          isLoading: false,
        });
      } else {
        this.setState({
          status: true,
          errCode: res && res.errCode ? res.errCode : -1,
          isLoading: false,
        });
      }
    }
  }

  componentDidUpdate;
  render() {
    let { statusVerify, errCode, isLoading } = this.state;
    return (
      <>
        <LoadingOverlay
          active={false}
          spinner={<ClipLoader color={"#45c3d2"} />}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "rgba(0, 0, 0, 0.8)", // custom background
            }),
            content: (base) => ({
              ...base,
              color: "#fff", // custom text color
              fontSize: "20px",
            }),
            spinner: (base) => ({
              ...base,
              width: "100px", // custom spinner size
              "& svg circle": {
                stroke: "#ff5733", // custom spinner color
              },
            }),
          }}
        >
          <HomeHeader />
          {statusVerify && errCode === 0 ? (
            <div className="text-status">
              Lịch khám bệnh của bạn trên BookingCare.vn đã được xác nhận!
            </div>
          ) : (
            <div className="text-status">
              Lịch hẹn không tồn tại hoặc đã được xác nhận!
            </div>
          )}
        </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
