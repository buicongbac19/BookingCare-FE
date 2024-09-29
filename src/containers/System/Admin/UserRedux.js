import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { isBuffer } from "lodash";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      isEditUser: false,
      userEditId: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (prevProps.allUsers !== this.props.allUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        previewImgUrl: "",
      });
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
      this.setState({ previewImgUrl: objectUrl, avatar: base64 });
    }
  };

  handleCreateUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;
    else
      this.props.createUserStart({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.avatar,
      });
  };

  handleEditUser = () => {
    this.props.editUserStart({
      id: this.state.userEditId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      gender: this.state.gender,
      positionId: this.state.position,
      roleId: this.state.role,
      image: this.state.avatar,
    });
    this.setState({ isEditUser: false });
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let field of arrCheck) {
      if (!this.state[field]) {
        isValid = false;
        alert("Missing required parameter: " + field);
        break;
      }
    }
    return isValid;
  };

  handleEditUserFromParent = (user) => {
    let imageBase64;
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      isEditUser: true,
      userEditId: user.id,
      previewImgUrl: imageBase64,
    });
  };

  render() {
    let {
      genderArr,
      positionArr,
      roleArr,
      previewImgUrl,
      isOpen,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
      isEditUser,
    } = this.state;
    let { language, genderRedux, isLoadingGender, positionRedux, roleRedux } =
      this.props;
    return (
      <div className="user-redux-container">
        <div className="title">Manage user using redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-user.add-new-user" />
              </div>
              <div className="col-12 my-3">
                {isLoadingGender ? "Loading genders....." : ""}
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  disabled={isEditUser}
                  value={email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  disabled={isEditUser}
                  value={password}
                  onChange={(e) => this.handleOnChangeInput(e, "password")}
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  value={firstName}
                  onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  value={lastName}
                  onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  value={address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  value={gender}
                  className="form-control"
                  onChange={(e) => this.handleOnChangeInput(e, "gender")}
                >
                  <option value={""}>...</option>
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((gender, index) => {
                      return (
                        <option key={index} value={gender.keyMap}>
                          {language === LANGUAGES.VI
                            ? gender.valueVi
                            : gender.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  value={position}
                  className="form-control"
                  onChange={(e) => this.handleOnChangeInput(e, "position")}
                >
                  <option value={""}>...</option>
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((position, index) => {
                      return (
                        <option key={index} value={position.keyMap}>
                          {language === LANGUAGES.VI
                            ? position.valueVi
                            : position.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.role-id" />
                </label>
                <select
                  value={role}
                  className="form-control"
                  onChange={(e) => this.handleOnChangeInput(e, "role")}
                >
                  <option value={""}> ...</option>
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((role, index) => {
                      return (
                        <option key={index} value={role.keyMap}>
                          {language === LANGUAGES.VI
                            ? role.valueVi
                            : role.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(e) => this.handleOnChangeImage(e)}
                  />
                  <label className="btn btn-primary" htmlFor="previewImg">
                    <FormattedMessage id="manage-user.upload-image" />
                  </label>
                  <div
                    onClick={() => this.openPreviewImg()}
                    style={{ backgroundImage: `url(${previewImgUrl})` }}
                    className="preview-img"
                  ></div>
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className={`btn btn-${!isEditUser ? "primary" : "warning"}`}
                  onClick={
                    isEditUser
                      ? () => this.handleEditUser()
                      : () => this.handleCreateUser()
                  }
                >
                  <FormattedMessage
                    id={`manage-user.${isEditUser ? "save-changes" : "create"}`}
                  />
                </button>
              </div>
              <div className="col-12">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                />
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    allUsers: state.admin.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUserStart: (data) => dispatch(actions.createUserStart(data)),
    getAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    editUserStart: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
