import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CreateHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { createNewHandBook } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateHandBook extends Component {
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

  handleCreateHandBookInfo = async () => {
    let res = await createNewHandBook({
      name: this.state.name,
      image: this.state.imageBase64,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
    });
    if (res && res.errCode === 0) {
      toast.success("Created a new handbook");
      this.setState({
        name: "",
        imageBase64: "",
        descHTML: "",
        descMarkdown: "",
        previewImgUrl: "",
      });
    } else {
      toast.error("Failed to create a new handbook");
    }
  };

  render() {
    let { name, imageBase64, descHTML, descMarkdown, isOpen, previewImgUrl } =
      this.state;
    return (
      <>
        <div className="manage-handbook-container container">
          <div className="title mb-3">Tạo mới cẩm nang</div>
          <div className="handbook-info row">
            <div className="col-6 form-group">
              <label>Tiêu đề cẩm nang</label>
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
                <FormattedMessage id="manage-handbook.image-handbook" />
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
                onClick={() => this.handleCreateHandBookInfo()}
                className="btn btn-primary"
              >
                Tạo mới
              </button>
            </div>
          </div>
          <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateHandBook);
