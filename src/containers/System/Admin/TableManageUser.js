import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUsersStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allUsers !== this.props.allUsers) {
      this.setState({ usersRedux: this.props.allUsers });
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUserStart(id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let { usersRedux } = this.state;
    let { allUsers } = this.props;
    return (
      <>
        <table className="my-5" id="table-manage-users">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {usersRedux.map((user, index) => {
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
                      onClick={() => this.handleDeleteUser(user.id)}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.admin.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
