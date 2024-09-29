import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import {
  getAllSpecialty,
  getAllClinic,
  getAllHandBook,
} from "../../../services/userService";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctors: [],
      allSpecialty: [],
      allClinic: [],
      allHandBook: [],
    };
  }
  async componentDidMount() {
    this.props.handleToggleLoading(true);
    this.props.getTopDoctorsStart();
    let resSpecialty = await getAllSpecialty();
    if (resSpecialty && resSpecialty.errCode === 0) {
      this.setState({ allSpecialty: resSpecialty.data });
    }
    let resClinic = await getAllClinic();
    if (resClinic && resClinic.errCode === 0) {
      this.setState({ allClinic: resClinic.data });
    }
    let resHandBook = await getAllHandBook();
    if (resHandBook && resHandBook.errCode === 0) {
      this.setState({ allHandBook: resHandBook.data });
    }
    this.props.handleToggleLoading(false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        topDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetail = (item) => {
    this.props.history.push(`${this.props.redirectLink}${item.id}`);
  };

  handleSeeMore = () => {
    this.props.history.push(`${this.props.redirectMore}`);
  };

  render() {
    let { title, className, btnDesc, sectionName, isCircle, language } =
      this.props;
    let { topDoctors, allSpecialty, allClinic, allHandBook } = this.state;
    let settings = {
      infinite: false,
      speed: 800,
      slidesToShow: isCircle ? 4 : 3,
      slidesToScroll: isCircle ? 4 : 3,
      cssEase: "ease-in-out",
    };
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    if (this.state[sectionName] && this.state[sectionName].length > 0) {
      sectionName = this.state[sectionName];
    } else sectionName = arr;
    return (
      <div className={`section ${className}`}>
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id={`homepage.${className}`} />
            </span>
            <button
              onClick={() => this.handleSeeMore()}
              className="btn-section"
            >
              <FormattedMessage id={`homepage.${btnDesc}`} />
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings} className="slider">
              {!isCircle
                ? sectionName.map((item, index) => {
                    return (
                      <div
                        onClick={() => this.handleViewDetail(item)}
                        key={index}
                        className="section-customize"
                      >
                        <div
                          style={{ backgroundImage: `url(${item.image})` }}
                          className={`section-image ${className}-img`}
                        ></div>
                        <div className="section-name">{item.name}</div>
                      </div>
                    );
                  })
                : topDoctors &&
                  topDoctors.length > 0 &&
                  topDoctors.map((doctor, index) => {
                    let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                    let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                    let imageBase64 = "";
                    if (doctor.image) {
                      imageBase64 = new Buffer(doctor.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        className="outer-container"
                        key={index}
                        onClick={() => this.handleViewDetail(doctor)}
                      >
                        <div className="section-border">
                          <div className="section-customize">
                            <div
                              className={`section-image ${className}-img`}
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                            <div className="section-name">
                              <div className="section-position">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                              </div>
                              <div className="section-specialty">
                                {doctor.Doctor_Info &&
                                doctor.Doctor_Info.specialtyData
                                  ? doctor.Doctor_Info.specialtyData.name
                                  : " "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorsStart: () => dispatch(actions.fetchTopDoctorsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Section)
);
