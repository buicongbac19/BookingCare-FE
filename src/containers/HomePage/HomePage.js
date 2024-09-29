import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Section from "./Section/Section";
import "./HomePage.scss";
import About from "./About";
import Footer from "./Footer";
import { withRouter } from "react-router";
import ChatBotIcon from "./ChatBotIcon";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  openChatBot = () => {
    this.props.history.push("/ai-assistant");
  };

  handleToggleLoading = (status) => {
    this.setState({ isLoading: status });
  };

  render() {
    let { isLoading } = this.state;
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
        <div className="home-page">
          <HomeHeader isShowBanner={true} />
          <Section
            handleToggleLoading={this.handleToggleLoading}
            className="popular-specialty"
            title="Chuyên khoa phổ biến"
            btnDesc="see-more"
            sectionName="allSpecialty"
            isCircle={false}
            redirectLink="/detail-specialty/"
            redirectMore="/all-specialty"
          />
          <Section
            handleToggleLoading={this.handleToggleLoading}
            className="facility"
            title="Cơ sở y tế nổi bật"
            btnDesc="see-more"
            sectionName="allClinic"
            isCircle={false}
            redirectLink="/detail-clinic/"
            redirectMore="/all-clinic"
          />
          <Section
            handleToggleLoading={this.handleToggleLoading}
            className="outstanding-doctor"
            title="Bác sĩ nổi bật"
            btnDesc="see-more"
            sectionName="arr"
            isCircle={true}
            redirectLink="/detail-doctor/"
            redirectMore="/all-doctor"
          />
          <Section
            handleToggleLoading={this.handleToggleLoading}
            className="handbook"
            title="Cẩm nang"
            btnDesc="see-more"
            sectionName="allHandBook"
            isCircle={false}
            redirectLink="/detail-handbook/"
            redirectMore="/all-handbook"
          />
          <ChatBotIcon />
          <About />
          <Footer />
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
