import { add, last } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (e, id) => {
    this.setState({
      [id]: e.target.value,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let key of arrInput) {
      if (!this.state[key]) {
        isValid = false;
        alert("Missing required parameter: " + key);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUSer = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    let { isOpen } = this.props;
    let { email, password, firstName, lastName, address } = this.state;
    return (
      <Modal
        className={"modal-create-new-user"}
        centered
        size="lg"
        isOpen={isOpen}
        toggle={this.toggle}
      >
        <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => this.handleOnchangeInput(e, "email")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => this.handleOnchangeInput(e, "password")}
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label>First Name</label>
                <input
                  onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                  value={firstName}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 form-group">
                <label>Address</label>
                <input
                  value={address}
                  onChange={(e) => this.handleOnchangeInput(e, "address")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => this.handleAddNewUSer()}
            className="px-3"
            color="primary"
          >
            Create
          </Button>{" "}
          <Button className="px-3" color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
