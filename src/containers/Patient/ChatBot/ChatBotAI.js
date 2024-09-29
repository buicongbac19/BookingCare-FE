import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ChatBotAI.scss";
import { sendMessage } from "../../../services/userService";

class ChatBotAI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowContentLeft: true,
      question: "",
    };
  }

  showHideConTentLeft = (status) => {
    this.setState({
      isShowContentLeft: status,
    });
  };

  handleChangeQuestion = (e) => {
    let copyState = { ...this.state };
    copyState["question"] = e.target.value;
    this.setState({ ...copyState });
  };

  handleSendQuestion = async () => {
    let res = await sendMessage({
      question: this.state.question,
    });
    this.setState({
      question: "",
    });
  };

  render() {
    let { isShowContentLeft, question } = this.state;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="chat-bot-ai-container">
          {isShowContentLeft && (
            <div className="content-left">
              <div
                onClick={() => this.showHideConTentLeft(false)}
                className="btn-hide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 34 34"
                >
                  <mask
                    id="arrows_right_svg__a"
                    width="34"
                    height="34"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      fill="#D9D9D9"
                      d="m16.97 0 16.971 16.97-16.97 16.971L0 16.971z"
                    ></path>
                  </mask>
                  <g mask="url(#arrows_right_svg__a)">
                    <path
                      fill="#858A8B"
                      d="m9.364 23.678 6.364-6.364-6.364-6.364 1.414-1.414 7.779 7.778-7.779 7.778zm7.071 0 6.364-6.364-6.364-6.364 1.415-1.414 7.778 7.778-7.779 7.778z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="new-chat">
                <span className="mr-1 plus-icon">
                  <i className="fa-solid fa-circle-plus"></i>
                </span>
                Cuộc trò chuyện mới
              </div>
              <div className="desc">
                Thông tin về y tế và sức khỏe được cung cấp bởi Trợ lý AI chỉ
                mang tính chất tham khảo, vì vậy không nên tự ý áp dụng mà cần
                tham khảo ý kiến của bác sĩ.
              </div>
            </div>
          )}
          {!isShowContentLeft && (
            <div className="btn-actions">
              <div
                onClick={() => this.showHideConTentLeft(true)}
                className="btn btn-show"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 34 34"
                >
                  <mask
                    id="arrows_right_svg__a"
                    width="34"
                    height="34"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      fill="#D9D9D9"
                      d="m16.97 0 16.971 16.97-16.97 16.971L0 16.971z"
                    ></path>
                  </mask>
                  <g mask="url(#arrows_right_svg__a)">
                    <path
                      fill="#858A8B"
                      d="m9.364 23.678 6.364-6.364-6.364-6.364 1.414-1.414 7.779 7.778-7.779 7.778zm7.071 0 6.364-6.364-6.364-6.364 1.415-1.414 7.778 7.778-7.779 7.778z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="btn btn-create-new">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          )}

          <div
            style={{
              borderLeft: `${
                isShowContentLeft ? "0.8px solid rgb(156, 163, 175)" : "none"
              }`,
            }}
            className="content-right"
          >
            <div
              style={{ marginLeft: `${isShowContentLeft ? "130px" : "260px"}` }}
              className="input-question-container"
            >
              <input
                value={question}
                onChange={(e) => this.handleChangeQuestion(e)}
                placeholder="Nhập câu hỏi tiếp theo của bạn"
                className="input-question"
              />
              <div
                onClick={() => this.handleSendQuestion()}
                className="send-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  preserveAspectRatio="none"
                  width="20"
                  height="20"
                  fill="#ffc10e"
                >
                  <path d="M81.9 27.8C47.1 12.7 12.8 50.1 30.8 83.5l69.3 128.8c4.4 8.3 12.6 13.8 21.9 15l176 22c3.4.4 6 3.3 6 6.7s-2.6 6.3-6 6.7l-176 22c-9.3 1.2-17.5 6.8-21.9 15L30.8 428.5c-18 33.4 16.3 70.8 51.1 55.7l441.9-191.5c32.1-13.9 32.1-59.5 0-73.4z"></path>
                </svg>
              </div>
            </div>
            <div className="content-container">
              <div className="chatbot-image"></div>
              <div className="chatbot-content">
                <div className="chatbot-name">Trợ lý AI BookingCare</div>
                <div className="chatbot-hello">
                  <div>Xin chào!</div>
                  <div>Trợ lý AI BookingCare sẵn sàng hỗ trợ bạn.</div>
                  <div>Hôm nay tôi có thể giúp gì cho bạn?</div>
                </div>
                <div className="try-it">Bạn có thể thử</div>
                <div className="example-question">
                  Làm thế nào để giảm ngáy khi ngủ?
                </div>
                <div className="example-question">
                  Thường xuyên chảy máu mũi nên uống thuốc gì?
                </div>
                <div className="example-question">
                  Khắc phục tình trạng hạ đường huyết nhiều lần trong ngày như
                  thế nào?
                </div>
                <div className="chatbot-desc">
                  <div>
                    - Trợ lý AI BookingCare Xin chào! Trợ lý AI BookingCare sẵn
                    sàng hỗ trợ bạn. Hôm nay tôi có thể giúp gì cho bạn? Bạn có
                    thể thử - Trợ lý AI cung cấp thông tin y tế, sức khỏe nhằm
                    hỗ trợ người dùng tìm hiểu thêm về các vấn đề sức khỏe thể
                    chất và tinh thần. Tuy nhiên, thông tin này chỉ mang tính
                    tham khảo, không nên tự ý áp dụng mà cần có sự tư vấn của
                    bác sĩ chuyên khoa. BookingCare không chịu trách nhiệm cho
                    bất kỳ vấn đề nào phát sinh do việc sử dụng thông tin này.
                  </div>
                  <div>
                    - Cuộc trò chuyện của bạn được sử dụng để cải tiến Trợ lý
                    AI. Chúng tôi tôn trọng và bảo vệ quyền riêng tư của bạn, vì
                    vậy nếu có thông tin bạn không muốn chia sẻ, vui lòng không
                    đề cập trong cuộc trò chuyện.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotAI);
