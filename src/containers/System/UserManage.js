import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserFromService,
  deleteUserFromService,
  editUserFromService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenEditUserModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleModalEditUser = () => {
    this.setState({
      isOpenEditUserModal: !this.state.isOpenEditUserModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserFromService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserFromService(user.id);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenEditUserModal: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let response = await editUserFromService(user);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenEditUserModal: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { arrUser, isOpenModalUser, isOpenEditUserModal, userEdit } =
      this.state;
    return (
      <div className="users-container">
        <ModalUser
          createNewUser={this.createNewUser}
          isOpen={isOpenModalUser}
          toggleFromParent={this.toggleModalUser}
        />
        {isOpenEditUserModal && (
          <ModalEditUser
            toggleFromParent={this.toggleModalEditUser}
            isOpen={isOpenEditUserModal}
            currentUser={userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage user</div>
        <div className="mx-3">
          <button
            onClick={() => this.handleAddNewUser()}
            className="btn btn-primary px-3"
          >
            Add new user
          </button>
        </div>
        <div className="users-table">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUser &&
                arrUser.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>
                        <span
                          onClick={() => this.handleEditUser(user)}
                          className="btn edit-btn"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </span>

                        <span
                          onClick={() => this.handleDeleteUser(user)}
                          className="btn delete-btn"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
