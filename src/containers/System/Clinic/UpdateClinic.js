import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UpdateClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  getDetailClinicById,
  updateClinic,
  deleteClinic,
} from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class UpdateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descHTML: "",
      descMarkdown: "",
      address: "",
      backgroundBase64: "",
      allClinics: [],
      selectedClinic: {},
      previewImgUrl: "",
      previewBgUrl: "",
      isOpen: false,
      imageBase64: "",
    };
  }

  componentDidMount() {
    this.props.getAllClinicsStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allClinicsRedux !== this.props.allClinicsRedux) {
      let dataSelect = this.buildAllClinic(this.props.allClinicsRedux);
      this.setState({ allClinics: dataSelect });
    }
  }

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

  buildAllClinic = (data) => {
    let result = [];
    data.forEach((item, index) => {
      let obj = {};
      obj.label = item.name;
      obj.value = item.id;
      result.push(obj);
    });
    return result;
  };

  handleSaveClinicInfo = async () => {
    let res = await updateClinic({
      id: this.state.selectedClinic.value,
      name: this.state.name,
      descHTML: this.state.descHTML,
      descMarkdown: this.state.descMarkdown,
      image: this.state.imageBase64,
      background: this.state.backgroundBase64,
      address: this.state.address,
    });
    if (res && res.errCode === 0) {
      toast.success("Cập nhật thông tin phòng khám thành công");
      this.setState({
        name: "",
        descHTML: "",
        descMarkdown: "",
        imageBase64: "",
        backgroundBase64: "",
        address: "",
        previewBgUrl: "",
        previewImgUrl: "",
        selectedClinic: {},
      });
      this.props.getAllClinicsStart();
    } else {
      toast.error("Cập nhật thông tin phòng khám thất bại");
    }
  };

  handleOnChangeSelectedHandBook = async (selectedOption) => {
    this.setState({ selectedClinic: selectedOption });
    let res = await getDetailClinicById({ id: selectedOption.value });
    if (res && res.errCode === 0) {
      if (res.data) {
        this.setState({
          name: res.data.name,
          descHTML: res.data.descHTML,
          descMarkdown: res.data.descMarkdown,
          previewImgUrl: res.data.image,
          address: res.data.address,
          previewBgUrl: res.data.background,
          imageBase64: res.data.image,
          backgroundBase64: res.data.background,
        });
      }
    }
  };

  deleteClinic = async () => {
    let res = await deleteClinic(this.state.selectedClinic.value);
    if (res && res.errCode === 0) {
      toast.success("Xóa phòng khám thành công");
      this.setState({
        name: "",
        descHTML: "",
        descMarkdown: "",
        imageBase64: "",
        backgroundBase64: "",
        address: "",
        previewBgUrl: "",
        previewImgUrl: "",
        selectedClinic: {},
      });
      this.props.getAllClinicsStart();
    } else {
      toast.error("Xóa phòng khám thất bại");
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
      previewImgUrl,
      isOpen,
      selectedClinic,
      allClinics,
      previewBgUrl,
    } = this.state;
    return (
      <>
        <div className="update-clinic-container container">
          <div className="title mb-3">Chỉnh sửa thông tin phòng khám</div>
          <div className="clinic-info row">
            <div className="col-12 form-group">
              <label>Chọn phòng khám</label>
              <Select
                value={selectedClinic}
                onChange={this.handleOnChangeSelectedHandBook}
                options={allClinics}
              />
            </div>
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
                onClick={() => this.handleSaveClinicInfo()}
                className="btn btn-primary"
              >
                Lưu thông tin
              </button>
              {selectedClinic && !_.isEmpty(selectedClinic) && (
                <button
                  onClick={() => this.deleteClinic()}
                  className="ml-5 btn btn-danger"
                >
                  Xoá phòng khám
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
    allClinicsRedux: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClinic);
