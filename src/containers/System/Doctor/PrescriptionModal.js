import React, { Component } from "react";
import { connect } from "react-redux";
import "./PrescriptionModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CommonUtils } from "../../../utils";

class PrescriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnChangeEmail = (e) => {
    let copyState = { ...this.state };
    copyState["email"] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imageBase64: base64 });
    }
  };

  handleSendPrescription = () => {
    this.props.sendPrescription(this.state);
  };

  render() {
    let { isOpen, dataModal, closeModal, sendPrescription } = this.props;
    let { email } = this.state;
    return (
      <>
        <Modal size="lg" isOpen={isOpen} centered>
          <ModalHeader toggle={closeModal}>Gửi hoá đơn khám bệnh</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <label>Email</label>
                <input
                  onChange={(e) => this.handleOnChangeEmail(e)}
                  type="email"
                  value={email}
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <label>Hoá đơn</label>
                <input
                  onChange={(e) => this.handleOnChangeImage(e)}
                  type="file"
                  className="form-control-file"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleSendPrescription()}
            >
              Gửi
            </Button>
            <Button color="secondary" onClick={closeModal}>
              Huỷ
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
