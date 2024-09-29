import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./AllSection.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Footer";
import { withRouter } from "react-router-dom";
import {
  getAllSpecialty,
  getAllClinic,
  getAllHandBook,
} from "../../../services/userService";
import ChatBotIcon from "../../HomePage/ChatBotIcon";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

class AllSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSection: [],
      topDoctors: [],
      isLoading: false,
    };
  }

  buildAllSection = async () => {
    this.setState({ isLoading: true });
    this.props.getTopDoctorsStart();
    let resSpecialty = await getAllSpecialty();
    let resClinic = await getAllClinic();
    let resHandBook = await getAllHandBook();
    if (this.props.name === "specialty") {
      if (resSpecialty && resSpecialty.errCode === 0) {
        this.setState({ allSection: resSpecialty.data });
      }
    }
    if (this.props.name === "clinic") {
      if (resClinic && resClinic.errCode === 0) {
        this.setState({ allSection: resClinic.data });
      }
    }
    if (this.props.name === "handbook") {
      if (resHandBook && resHandBook.errCode === 0) {
        this.setState({ allSection: resHandBook.data });
      }
    }
    if (this.props.name === "doctor") {
      this.setState({ allSection: this.state.topDoctors });
    }
    this.setState({ isLoading: false });
  };

  async componentDidMount() {
    this.buildAllSection();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  buildAllDoctor = () => {
    let { topDoctorsRedux, language } = this.props;
    topDoctorsRedux &&
      topDoctorsRedux.length > 0 &&
      topDoctorsRedux.forEach((item, index) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
        item.name =
          language === LANGUAGES.VI
            ? item.lastName + " " + item.firstName
            : item.firstName + " " + item.lastName;
      });
    return topDoctorsRedux;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({ topDoctors: this.buildAllDoctor() });
    }
    if (prevProps.name !== this.props.name) {
      this.buildAllSection();
    }
  }

  goHome = () => {
    this.props.history.push("/home");
  };

  handleViewDetail = (item) => {
    this.props.history.push(`/detail-${this.props.name}/${item.id}`);
  };

  render() {
    let { title } = this.props;
    let { allSection, topDoctors, isLoading } = this.state;
    return (
      <>
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
          <div className="all-section-container">
            <div onClick={() => this.goHome()} className="home-icon">
              <i className="mr-2 fa-solid fa-house"></i>/
            </div>
            <div className="text-section">{title}</div>
            <div className="all-sections">
              {allSection &&
                allSection.length > 0 &&
                allSection.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleViewDetail(item)}
                      key={index}
                      className="each-section"
                    >
                      <div
                        style={{ backgroundImage: `url(${item.image})` }}
                        className="content-left"
                      ></div>
                      <div className="content-right">
                        {item ? item.name : " "}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <ChatBotIcon />
          <Footer />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorsStart: () => dispatch(actions.fetchTopDoctorsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllSection)
);
