import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UpdateHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import Select from "react-select";
import * as actions from "../../../store/actions";
import {
  getDetailHandBookById,
  updateHandBookInfo,
  deleteHandBook,
} from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class UpdateHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descHTML: "",
      descMarkdown: "",
      allHandBooks: [],
      selectedHandBook: {},
      previewImgUrl: "",
      isOpen: false,
      imageBase64: "",
    };
  }

  async componentDidMount() {
    this.props.getAllHandBooksStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allHandBooksRedux !== prevProps.allHandBooksRedux) {
      let dataSelect = this.buildAllHandbook(this.props.allHandBooksRedux);
      this.setState({ allHandBooks: dataSelect });
    }
  }

  openPreviewImg = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({ isOpen: true });
  };

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

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewImgUrl: objectUrl, imageBase64: base64 });
    }
  };

  handleSaveHandBookInfo = async () => {
    let res = await updateHandBookInfo({
      id: this.state.selectedHandBook.value,
      name: this.state.name,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
      image: this.state.imageBase64,
    });
    if (res && res.errCode === 0) {
      toast.success("Update handbook thành công!");
      this.setState({
        name: "",
        descHTML: "",
        descMarkdown: "",
        selectedHandBook: {},
        previewImgUrl: "",
        imageBase64: "",
      });
      this.props.getAllHandBooksStart();
    } else {
      toast.error("Update handbook thất bại!");
    }
  };

  buildAllHandbook = (data) => {
    let result = [];
    data.forEach((item, index) => {
      let obj = {};
      obj.label = item.name;
      obj.value = item.id;
      result.push(obj);
    });
    return result;
  };

  handleOnChangeSelectedHandBook = async (selectedOption) => {
    this.setState({ selectedHandBook: selectedOption });
    let res = await getDetailHandBookById({ id: selectedOption.value });
    if (res && res.errCode === 0) {
      if (res.data) {
        this.setState({
          name: res.data.name,
          descHTML: res.data.descHTML,
          descMarkdown: res.data.descMarkdown,
          previewImgUrl: res.data.image,
        });
      }
    }
  };

  deleteHandBook = async () => {
    let res = await deleteHandBook(this.state.selectedHandBook.value);
    if (res && res.errCode === 0) {
      toast.success("Xoá cẩm nang thành công!");
      this.setState({
        name: "",
        descHTML: "",
        descMarkdown: "",
        selectedHandBook: {},
        previewImgUrl: "",
        imageBase64: "",
      });
      this.props.getAllHandBooksStart();
    } else {
      toast.error("Xoá cẩm nang thất bại!");
    }
  };

  render() {
    let {
      name,
      imageBase64,
      descHTML,
      descMarkdown,
      selectedHandBook,
      allHandBooks,
      isOpen,
      previewImgUrl,
    } = this.state;
    return (
      <>
        <div className="manage-handbook-container container">
          <div className="title mb-3">Chỉnh sửa cẩm nang</div>
          <div className="handbook-info row">
            <div className="col-12 form-group">
              <label>Chọn cẩm nang</label>
              <Select
                value={selectedHandBook}
                onChange={this.handleOnChangeSelectedHandBook}
                options={allHandBooks}
              />
            </div>
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
                onClick={() => this.handleSaveHandBookInfo()}
                className="btn btn-primary"
              >
                Lưu thông tin
              </button>
              {selectedHandBook && !_.isEmpty(selectedHandBook) && (
                <button
                  onClick={() => this.deleteHandBook()}
                  className="ml-3 btn btn-danger"
                >
                  Xoá cẩm nang
                </button>
              )}
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
  return {
    allHandBooksRedux: state.admin.allHandBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHandBooksStart: () => dispatch(actions.fetchAllHandBooksStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHandBook);
