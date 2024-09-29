import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CreateClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { createNewClinic } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descHTML: "",
      descMarkdown: "",
      address: "",
      backgroundBase64: "",
    };
  }

  componentDidMount() {}

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descMarkdown: text,
      descHTML: html,
    });
  };

  openPreviewImg = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({ isOpen: true });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewImgUrl: objectUrl, imageBase64: base64 });
    }
  };

  handleOnChangeBg = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewBgUrl: objectUrl, backgroundBase64: base64 });
    }
  };

  handleCreateClinicInfo = async () => {
    let res = await createNewClinic({
      name: this.state.name,
      image: this.state.imageBase64,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
      address: this.state.address,
      background: this.state.backgroundBase64,
    });
    if (res && res.errCode === 0) {
      toast.success("Created a new clinic");
      this.setState({
        name: "",
        descHTML: "",
        descMarkdown: "",
        address: "",
        backgroundBase64: "",
        previewImgUrl: "",
        previewBgUrl: "",
        isOpen: false,
        imageBase64: "",
      });
    } else {
      toast.error("Failed to create a new clinic");
    }
  };

  render() {
    let {
      name,
      imageBase64,
      descHTML,
      descMarkdown,
      address,
      backgroundBase64,
      previewBgUrl,
      previewImgUrl,
    } = this.state;
    return (
      <>
        <div className="create-clinic-container container">
          <div className="title mb-3">Thêm mới phòng khám</div>
          <div className="clinic-info row">
            <div className="col-3 form-group">
              <label>Tên phòng khám</label>
              <input
                onChange={(e) => this.handleOnChangeInput(e, "name")}
                value={name}
                className="form-control"
              />
            </div>
            <div className="col-3 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                value={address}
                onChange={(e) => this.handleOnChangeInput(e, "address")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-3 form-group preview-img-container">
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(e) => this.handleOnChangeImage(e)}
              />
              <label className="btn btn-primary" htmlFor="previewImg">
                <FormattedMessage id="manage-clinic.image-clinic" />
              </label>
              <div
                onClick={() => this.openPreviewImg()}
                style={{ backgroundImage: `url(${previewImgUrl})` }}
                className="preview-img"
              ></div>
            </div>
            <div className="col-3 form-group preview-img-container">
              <input
                id="previewBg"
                type="file"
                hidden
                onChange={(e) => this.handleOnChangeBg(e)}
              />
              <label className="btn btn-primary" htmlFor="previewBg">
                <FormattedMessage id="manage-clinic.background-clinic" />
              </label>
              <div
                onClick={() => this.openPreviewImg()}
                style={{ backgroundImage: `url(${previewBgUrl})` }}
                className="preview-img"
              ></div>
            </div>
            <div className="mt-3 col-12 mb-3">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={descMarkdown}
              />
            </div>
            <div className="col-12 mb-5">
              <button
                onClick={() => this.handleCreateClinicInfo()}
                className="btn btn-primary"
              >
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateClinic);
