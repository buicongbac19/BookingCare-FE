import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="about-container">
          <div className="about-title">Truyền thông nói về BookingCare</div>
          <div className="about-body">
            <div className="about-video">
              <iframe
                className="about-video-iframe"
                width="588"
                height="315"
                src="https://www.youtube.com/embed/FyDQljKtWnI?si=ND3AKIur9S1YwXXB"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="about-social">
              <div className="about-social-child col-6">
                <div className="about-social-logo vtv1"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo ict-news"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo vn-express"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo vtc-news"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo cuc-cntt"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo info-net"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo vtv1"></div>
              </div>
              <div className="about-social-child col-6">
                <div className="about-social-logo dan-tri"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
