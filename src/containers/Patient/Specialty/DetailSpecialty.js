import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import Footer from "../../HomePage/Footer";
import { withRouter } from "react-router-dom";
import { getDetailSpecialtyById } from "../../../services/userService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import Select from "react-select";
import MoreQuestion from "../MoreQuestion";
import ChatBotIcon from "../../HomePage/ChatBotIcon";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      descHTML: "",
      allProvinces: [],
      selectedProvince: {},
      isShowDetail: false,
      specialtyImage: "",
      isLoading: false,
    };
  }

  buildArrDoctorId = async (location) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        if (data && !_.isEmpty(data)) {
          let arrDoctorId = [];
          if (data.doctorSpecialty && data.doctorSpecialty.length > 0) {
            data.doctorSpecialty.forEach((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            descHTML: data.descHTML ? data.descHTML : "",
            arrDoctorId: arrDoctorId,
            specialtyImage: data.image,
          });
        }
      }
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.props.getAllProvincesStart();
    this.buildArrDoctorId("ALL");
    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allProvincesRedux !== this.props.allProvincesRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allProvincesRedux);
      this.setState({
        allProvinces: dataSelect,
        selectedProvince: dataSelect[0],
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allProvincesRedux);
      this.setState({
        allProvinces: dataSelect,
        selectedProvince: dataSelect[0],
      });
    }
  }

  handleViewDetailDoctor = (id) => {
    this.props.history.push(`/detail-doctor/${id}`);
  };

  handleOnChangeProvince = async (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({ ...copyState });
    this.buildArrDoctorId(selectedOption.value);
  };

  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    result.push({
      label: language === LANGUAGES.VI ? "Toàn quốc" : "Nationwide",
      value: "ALL",
    });
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

  handleShowHideDetail = () => {
    this.setState({
      isShowDetail: !this.state.isShowDetail,
    });
  };

  redirectToHomePage = () => {
    this.props.history.push("/home");
  };

  render() {
    let {
      arrDoctorId,
      descHTML,
      allProvinces,
      selectedProvince,
      isShowDetail,
      specialtyImage,
      isLoading,
    } = this.state;
    let height = !isShowDetail ? "240px" : "auto";
    return (
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
        <div className="detail-specialty-container">
          <HomeHeader isShowBanner={false} />
          <div
            style={{ height: height, overflow: "hidden" }}
            className="desc-specialty-container"
          >
            <div
              onClick={() => this.redirectToHomePage()}
              className="home-icon"
            >
              <i className="fa-solid fa-house mr-2"></i>/
            </div>
            <div
              style={{
                backgroundImage: `url(${specialtyImage})`
                  ? `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.898), rgb(255, 255, 255)), url(${specialtyImage})`
                  : "",
              }}
              className="desc-specialty"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: descHTML,
                }}
              ></div>
            </div>
          </div>
          <div className="see-more-container">
            <div
              onClick={() => this.handleShowHideDetail()}
              className="see-more"
            >
              {!isShowDetail ? "Xem thêm" : "Ẩn bớt"}
            </div>
          </div>
          <div className="all-doctor">
            <div className="sort-container">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "150px",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                  }),
                }}
                value={selectedProvince}
                onChange={this.handleOnChangeProvince}
                options={allProvinces}
                name={"selectedProvince"}
              />
            </div>
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div key={index} className="each-doctor">
                    <div
                      onClick={() => this.handleViewDetailDoctor(item)}
                      className="content-left"
                    >
                      <ProfileDoctor isUseModal={false} doctorId={item} />
                    </div>
                    <div className="content-right">
                      <DoctorSchedule key={index} doctorId={item} />
                      <hr className="mt-2 mb-2" />
                      <DoctorExtraInfo key={index} doctorId={item} />
                    </div>
                  </div>
                );
              })}
          </div>
          <MoreQuestion />
          <ChatBotIcon />
          <Footer />
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProvincesRedux: state.admin.allProvinces,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProvincesStart: () => dispatch(actions.fetchAllProvincesStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
);
