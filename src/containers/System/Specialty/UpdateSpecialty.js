import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UpdateSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  updateSpecialty,
  getDetailSpecialtyById,
  deleteSpecialty,
} from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class UpdateSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descHTML: "",
      descMarkdown: "",
      previewImgUrl: "",
      isOpen: false,
      imageBase64: "",
      allSpecialties: [],
      selectedSpecialty: [],
    };
  }

  componentDidMount() {
    this.props.getAllSpecialtiesStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allSpecialtiesRedux !== this.props.allSpecialtiesRedux) {
      let dataSelect = this.buildAllSpecialties(this.props.allSpecialtiesRedux);
      this.setState({ allSpecialties: dataSelect });
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

  handleSaveSpecialtyInfo = async () => {
    let res = await updateSpecialty({
      id: this.state.selectedSpecialty.value,
      name: this.state.name,
      image: this.state.imageBase64,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
    });
    if (res && res.errCode === 0) {
      toast.success("Updated a new specialty");
      this.setState({
        name: "",
        imageBase64: "",
        descHTML: "",
        descMarkdown: "",
        previewImgUrl: "",
        selectedSpecialty: {},
      });
      this.props.getAllSpecialtiesStart();
    } else {
      toast.error("Failed to update a new specialty");
    }
  };

  buildAllSpecialties = (data) => {
    let result = [];
    data.forEach((item, index) => {
      let obj = {};
      obj.label = item.name;
      obj.value = item.id;
      result.push(obj);
    });
    return result;
  };

  handleOnChangeSelectedSpecialty = async (selectedOption) => {
    this.setState({ selectedSpecialty: selectedOption });
    let res = await getDetailSpecialtyById({ id: selectedOption.value });
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

  deleteSpecialty = async () => {
    let res = await deleteSpecialty(this.state.selectedSpecialty.value);
    if (res && res.errCode === 0) {
      toast.success("Deleted a specialty");
      this.setState({
        name: "",
        imageBase64: "",
        descHTML: "",
        descMarkdown: "",
        previewImgUrl: "",
        selectedSpecialty: {},
      });
      this.props.getAllSpecialtiesStart();
    } else {
      toast.error("Failed to delete a specialty");
    }
  };

  render() {
    let {
      name,
      imageBase64,
      descHTML,
      descMarkdown,
      previewImgUrl,
      isOpen,
      allSpecialties,
      selectedSpecialty,
    } = this.state;
    return (
      <>
        <div className="update-specialty-container container">
          <div className="title mb-3">Chỉnh sửa chuyên khoa</div>
          <div className="specialty-info row">
            <div className="col-12 form-group">
              <label>Chọn cẩm nang</label>
              <Select
                value={selectedSpecialty}
                onChange={this.handleOnChangeSelectedSpecialty}
                options={allSpecialties}
              />
            </div>
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
                Lưu thông tin
              </button>
              {selectedSpecialty && !_.isEmpty(selectedSpecialty) && (
                <button
                  onClick={() => this.deleteSpecialty()}
                  className="ml-5 btn btn-danger"
                >
                  Xoá chuyên khoa
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
    allSpecialtiesRedux: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtiesStart: () => dispatch(actions.fetchAllSpecialtiesStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSpecialty);
