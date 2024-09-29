import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CreateSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { createNewSpecialty } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descHTML: "",
      descMarkdown: "",
      previewImgUrl: "",
      isOpen: false,
      imageBase64: "",
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

  handleSaveSpecialtyInfo = async () => {
    let res = await createNewSpecialty({
      name: this.state.name,
      image: this.state.imageBase64,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
    });
    if (res && res.errCode === 0) {
      toast.success("Created a new specialty");
      this.setState({
        name: "",
        imageBase64: "",
        descHTML: "",
        descMarkdown: "",
        previewImgUrl: "",
      });
    } else {
      toast.error("Failed to create a new specialty");
    }
  };

  render() {
    let { name, imageBase64, descHTML, descMarkdown, isOpen, previewImgUrl } =
      this.state;
    return (
      <>
        <div className="manage-specialty-container container">
          <div className="title mb-3">Tạo mới chuyên khoa</div>
          <div className="specialty-info row">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                onChange={(e) => this.handleOnChangeInput(e, "name")}
                value={name}
                className="form-control"
              />
            </div>
            <div className="col-6 form-group preview-img-container">
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(e) => this.handleOnChangeImage(e)}
              />
              <label className="btn btn-primary" htmlFor="previewImg">
                <FormattedMessage id="manage-specialty.image-specialty" />
              </label>
              <div
                onClick={() => this.openPreviewImg()}
                style={{ backgroundImage: `url(${previewImgUrl})` }}
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
                onClick={() => this.handleSaveSpecialtyInfo()}
                className="btn btn-primary"
              >
                Tạo mới chuyên khoa
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpecialty);
