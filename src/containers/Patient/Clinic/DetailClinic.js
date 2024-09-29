import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Footer";
import { withRouter } from "react-router-dom";
import { getDetailClinicById } from "../../../services/userService";
import ChatBotIcon from "../../HomePage/ChatBotIcon";
import _ from "lodash";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descHTML: "",
      detailClinic: {},
      h1Contents: [],
      isLoading: false,
    };
  }

  scrollToSection = (sectionId) => {
    let section = document.querySelector(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

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
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({ id });
      if (res && res.errCode === 0) {
        this.setState({ descHTML: res.data.descHTML, detailClinic: res.data });
      }
      let h1Arrays = document
        .querySelector(".desc-clinic")
        .querySelectorAll("h1");
      let h1Contents = [];
      h1Arrays.forEach((item, index) => {
        h1Contents.push(item.textContent);
      });
      this.setState({ h1Contents: h1Contents });
    }
    this.setState({ isLoading: false });
  }

  customHTML = () => {
    let copyHTML = this.state.descHTML;
    if (copyHTML) {
      for (let i = 1; i <= this.state.h1Contents.length; i++) {
        copyHTML = copyHTML.replace("<h1>", `<h1 id="section${i}">`);
      }
    }
    return copyHTML;
  };

  render() {
    let { detailClinic, h1Contents, isLoading } = this.state;
    let HTML = this.customHTML();
    let image =
      detailClinic && !_.isEmpty(detailClinic) ? detailClinic.image : "";
    let background =
      detailClinic && !_.isEmpty(detailClinic) ? detailClinic.background : "";
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
          <HomeHeader />
          <div className="detail-clinic-container">
            <div className="header">
              <div
                style={{ backgroundImage: `url(${background})` }}
                className="header-bg"
              ></div>
              <div className="header-nav">
                <div className="clinic-info">
                  <div className="content-left">
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className="clinic-logo"
                    ></div>
                  </div>
                  <div className="content-right">
                    <div className="clinic-name">
                      {detailClinic && !_.isEmpty(detailClinic)
                        ? detailClinic.name
                        : ""}
                    </div>
                    <div className="clinic-address">
                      {detailClinic && !_.isEmpty(detailClinic)
                        ? detailClinic.address
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="nav">
                  {h1Contents &&
                    h1Contents.length > 0 &&
                    h1Contents.map((item, index) => {
                      return (
                        <li
                          onClick={() =>
                            this.scrollToSection(`#section${index + 1}`)
                          }
                          className="list-item"
                        >
                          {item}
                        </li>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="body">
              <div className="bookingcare-note">
                BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng
                đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng
                khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn
                dịch vụ, sản phẩm y tế chất lượng cao.
              </div>
              <div className="clinic-pros">
                <div className="pros-desc">
                  Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu
                  cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám
                  BookingCare.
                </div>
                <div className="list-pros">
                  <li>
                    Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                    kinh nghiệm
                  </li>
                  <li>
                    Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                    lịch){" "}
                  </li>
                  <li>
                    Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                    trước
                  </li>
                  <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
                </div>
              </div>
              <div className="desc-clinic">
                <div
                  dangerouslySetInnerHTML={{
                    __html: HTML,
                  }}
                ></div>
              </div>
            </div>
            <ChatBotIcon />
          </div>
          <Footer />
        </LoadingOverlay>
      </>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
