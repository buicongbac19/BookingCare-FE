import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoreQuestion.scss";
import { withRouter } from "react-router-dom";

class MoreQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="more-question-container">
        <div className="more-question">
          Cần tìm hiểu thêm?
          <span className="ml-1 see-popular-question">
            Xem câu hỏi thường gặp.
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MoreQuestion)
);
