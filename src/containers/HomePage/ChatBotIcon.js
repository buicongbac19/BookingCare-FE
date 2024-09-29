import React, { Component } from "react";
import { connect } from "react-redux";
import "./ChatBotIcon.scss";
import { withRouter } from "react-router";

class ChatBotIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowGoToTop: false,
    };
  }

  openChatBot = () => {
    this.props.history.push("/ai-assistant");
  };

  componentDidMount() {
    document.body.addEventListener("scroll", () => {
      if (document.body.scrollTop > 700) {
        this.setState({ isShowGoToTop: true });
      } else {
        this.setState({ isShowGoToTop: false });
      }
    });
  }

  scrollToTop = () => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", () => {});
  }

  render() {
    let { isShowGoToTop } = this.state;
    return (
      <div className="chatbot-icon-container">
        {isShowGoToTop && (
          <div onClick={() => this.scrollToTop()} className="go-to-top">
            <i className="fa-solid fa-arrow-up"></i>
          </div>
        )}
        <div onClick={() => this.openChatBot()} className="chatbot-icon"></div>
        <div className="chatbot-text">Trợ lý AI</div>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(ChatBotIcon)
);
