import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ProfileDoctor from "./ProfileDoctor";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import OpenContext from "./OpenContext";
import Footer from "../../HomePage/Footer";
import MoreQuestion from "../MoreQuestion";
import ChatBotIcon from "../../HomePage/ChatBotIcon";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let res = await getDetailInfoDoctor(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
    this.setState({ isLoading: false });
  }

  handleShowHideLoading = (statusFromChild) => {
    this.setState({ isLoading: statusFromChild });
  };

  componentDidUpdate;
  render() {
    let doctorId = this.props.match.params.id;
    let { detailDoctor, isLoading } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi =
        detailDoctor.positionData.valueVi +
        ", " +
        detailDoctor.lastName +
        " " +
        detailDoctor.firstName;
      nameEn =
        detailDoctor.positionData.valueEn +
        ", " +
        detailDoctor.firstName +
        " " +
        detailDoctor.lastName;
    }
    let { language } = this.props;

    return (
      <>
        <OpenContext.Provider
          value={{ handleShowHideLoading: this.handleShowHideLoading }}
        >
          <LoadingOverlay
            active={isLoading}
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
            <HomeHeader isShowBanner={false} />
            <div className="detail-doctor-container">
              <ProfileDoctor doctorId={doctorId} />
              <div className="schedule container">
                <div className="content-left">
                  <DoctorSchedule
                    priceData={
                      detailDoctor && detailDoctor.Doctor_Info
                        ? detailDoctor.Doctor_Info.priceData
                        : {}
                    }
                    doctorId={doctorId}
                  />
                </div>
                <div className="content-right">
                  <DoctorExtraInfo doctorId={doctorId} />
                </div>
              </div>
              <div className="detail-info-container">
                <div className="detail-info container">
                  {detailDoctor &&
                    detailDoctor.Markdown &&
                    detailDoctor.Markdown.contentHTML && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detailDoctor.Markdown.contentHTML,
                        }}
                      ></div>
                    )}
                </div>
              </div>
              <div className=""></div>
            </div>
            <MoreQuestion />
            <Footer />
            <ChatBotIcon />
          </LoadingOverlay>
        </OpenContext.Provider>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
