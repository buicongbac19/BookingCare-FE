import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailHandBook.scss";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Footer";
import { withRouter } from "react-router-dom";
import ChatBotIcon from "../../HomePage/ChatBotIcon";
import { getDetailHandBookById } from "../../../services/userService";
import * as actions from "../../../store/actions";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import LikeAndShare from "../SocialPlugin/LikeAndShare";

class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: {},
      relatedPosts: [],
      allHandBooks: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getAllHandBooksStart();
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.buildDataHandBook(id);
    }
  }

  buildDataHandBook = async (id) => {
    this.setState({ isLoading: true });
    let res = await getDetailHandBookById({ id });
    if (res && res.errCode === 0) {
      this.setState({ dataHandbook: res.data });
    }
    let { allHandBooks } = this.state;
    let relatedPosts = allHandBooks.filter((post) => {
      return post.id !== +id;
    });
    if (relatedPosts.length > 5) relatedPosts = relatedPosts.slice(0, 5);
    this.setState({ relatedPosts: relatedPosts });
    this.setState({ isLoading: false });
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allHandBooksRedux !== prevProps.allHandBooksRedux) {
      this.setState({ allHandBooks: this.props.allHandBooksRedux });
      this.buildDataHandBook(this.props.match.params.id);
    }
    if (this.props.language !== prevProps.language) {
      this.setState({ allHandBooks: this.props.allHandBooksRedux });
      this.buildDataHandBook(this.props.match.params.id);
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.buildDataHandBook(this.props.match.params.id);
    }
  }

  handleViewRelatedPost = (id) => {
    this.props.history.push(`/detail-handbook/${id}`);
    this.buildDataHandBook(id);
  };

  render() {
    let { dataHandbook, allHandBooks, relatedPosts, isLoading } = this.state;
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
          <div className="detail-handbook-container">
            <div className="handbook-title">
              {dataHandbook ? dataHandbook.name : ""}
            </div>
            <div className="note">
              Trong bài viết dưới đây BookingCare xin chia sẻ về một số{" "}
              {dataHandbook && dataHandbook.name
                ? dataHandbook.name.toLowerCase()
                : " "}
            </div>
            <div className="booking-care-intro">
              <span className="bulb-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </span>
              <div className="text">
                BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng
                đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng
                khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn
                dịch vụ, sản phẩm y tế chất lượng cao.
              </div>
            </div>
            <div
              style={{
                backgroundImage:
                  dataHandbook && dataHandbook.image
                    ? `url(${dataHandbook.image})`
                    : "",
              }}
              className="handbook-image"
            ></div>
            <div className="image-caption">
              {dataHandbook ? dataHandbook.name + "? - Ảnh: BookingCare" : ""}
            </div>
            <div className="handbook-detail">
              <div className="handbook-desc">
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataHandbook ? dataHandbook.descHTML : "",
                  }}
                ></div>
              </div>
            </div>
            <div className="btn-actions">
              <LikeAndShare />
            </div>
            <div className="related-posts-container">
              <div className="related-posts">
                <div className="text-related">Bài viết liên quan</div>
                {relatedPosts &&
                  relatedPosts.length > 0 &&
                  relatedPosts.map((post, index) => {
                    return (
                      <div
                        onClick={() => this.handleViewRelatedPost(post.id)}
                        key={index}
                        className="related-post"
                      >
                        <div
                          style={{
                            backgroundImage:
                              post && post.image ? `url(${post.image})` : "",
                          }}
                          className="content-left"
                        ></div>
                        <div className="content-right">
                          {post && post.name ? post.name : ""}
                        </div>
                      </div>
                    );
                  })}
              </div>
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
    allHandBooksRedux: state.admin.allHandBooks,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHandBooksStart: () => dispatch(actions.fetchAllHandBooksStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailHandBook)
);
