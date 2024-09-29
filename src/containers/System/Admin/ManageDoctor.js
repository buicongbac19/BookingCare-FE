import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";

import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: {},
      desc: "",
      allDoctors: [],
      hasOldData: false,
      action: "",
      allPrices: [],
      allPayments: [],
      allProvinces: [],
      selectedPrice: {},
      selectedPayment: {},
      selectedProvince: {},
      nameClinic: "",
      addressClinic: "",
      note: "",
      allSpecialties: [],
      allClinics: [],
      selectedClinic: {},
      selectedSpecialty: {},
    };
  }

  async componentDidMount() {
    this.props.getAllDoctorsStart();
    this.props.getAllPricesStart();
    this.props.getAllPaymentsStart();
    this.props.getAllProvincesStart();
    this.props.getAllSpecialtiesStart();
    this.props.getAllClinicsStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorsRedux,
        "DOCTOR"
      );
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctorsRedux,
        "DOCTOR"
      );
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.allPricesRedux !== this.props.allPricesRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allPricesRedux,
        "PRICE"
      );
      this.setState({
        allPrices: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allPricesRedux,
        "PRICE"
      );
      this.setState({
        allPrices: dataSelect,
      });
    }
    if (prevProps.allPaymentsRedux !== this.props.allPaymentsRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allPaymentsRedux,
        "PAYMENT"
      );
      this.setState({
        allPayments: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allPaymentsRedux,
        "PAYMENT"
      );
      this.setState({
        allPayments: dataSelect,
      });
    }
    if (prevProps.allProvincesRedux !== this.props.allProvincesRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allProvincesRedux,
        "PROVINCE"
      );
      this.setState({
        allProvinces: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allProvincesRedux,
        "PROVINCE"
      );
      this.setState({
        allProvinces: dataSelect,
      });
    }
    if (prevProps.allClinicsRedux !== this.props.allClinicsRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allClinicsRedux,
        "CLINIC"
      );
      this.setState({
        allClinics: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allClinicsRedux,
        "CLINIC"
      );
      this.setState({
        allClinics: dataSelect,
      });
    }
    if (prevProps.allSpecialtiesRedux !== this.props.allSpecialtiesRedux) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allSpecialtiesRedux,
        "SPECIALTY"
      );
      this.setState({
        allSpecialties: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allSpecialtiesRedux,
        "SPECIALTY"
      );
      this.setState({
        allSpecialties: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeSelectedDoctor = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    let { allPrices, allPayments, allProvinces, allSpecialties, allClinics } =
      this.state;
    let res = await getDetailInfoDoctor(selectedDoctor.value);
    console.log(res);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let nameClinic = "",
        addressClinic = "",
        note = "",
        priceId = "",
        paymentId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPrice = {},
        selectedPayment = {},
        selectedProvince = {},
        selectedSpecialty = {},
        selectedClinic = {};

      if (res.data.Doctor_Info) {
        nameClinic = res.data.Doctor_Info.nameClinic;
        addressClinic = res.data.Doctor_Info.addressClinic;
        note = res.data.Doctor_Info.note;
        priceId = res.data.Doctor_Info.priceId;
        paymentId = res.data.Doctor_Info.paymentId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;
        selectedPrice = allPrices.find((item) => {
          return item.value === priceId;
        });
        selectedPayment = allPayments.find((item) => {
          return item.value === paymentId;
        });
        selectedProvince = allProvinces.find((item) => {
          return item.value === provinceId;
        });
        selectedSpecialty = allSpecialties.find((item) => {
          return item.value === specialtyId;
        });
        selectedClinic = allClinics.find((item) => {
          return item.value === clinicId;
        });
      }
      this.setState({
        contentMarkdown: res.data.Markdown.contentMarkdown,
        contentHTML: res.data.Markdown.contentHTML,
        desc: res.data.Markdown.description,
        hasOldData: true,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        desc: "",
        hasOldData: false,
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPrice: {},
        selectedPayment: {},
        selectedProvince: {},
      });
    }
  };

  handleOnChangeDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({ ...copyState });
  };

  handleOnChangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctorStart({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.desc,
      doctorId: this.state.selectedDoctor.value,
      action: this.state.hasOldData ? "edit" : "create",
      priceId: this.state.selectedPrice.value,
      paymentId: this.state.selectedPayment.value,
      provinceId: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value,
    });
    this.setState({
      selectedDoctor: {},
      desc: "",
      selectedPrice: {},
      selectedPayment: {},
      selectedProvince: {},
      nameClinic: "",
      addressClinic: "",
      note: "",
      selectedSpecialty: {},
      selectedClinic: {},
      contentMarkdown: "",
      contentHTML: "",
      hasOldData: false,
      action: "",
    });
  };

  buildDataInputSelect = (data, type) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        let labelVi =
          type === "DOCTOR"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "DOCTOR"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
        if (type === "SPECIALTY") {
          obj.label = item.name;
          obj.value = item.id;
        } else if (type === "CLINIC") {
          obj.label = item.name;
          obj.value = item.id;
        } else {
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = type === "DOCTOR" ? item.id : item.keyMap;
        }
        result.push(obj);
      });
    }
    return result;
  };
  render() {
    let {
      selectedDoctor,
      desc,
      allDoctors,
      contentMarkdown,
      hasOldData,
      allPrices,
      allPayments,
      allProvinces,
      allSpecialties,
      allClinics,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      selectedSpecialty,
      selectedClinic,
      nameClinic,
      addressClinic,
      note,
    } = this.state;
    return (
      <div className="manage-doctor-container container mb-5">
        <div className="manage-doctor-title my-3 text-center">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info row mb-3">
          <div className="content-left form-group col-6">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelectedDoctor}
              options={allDoctors}
            />
          </div>
          <div className="content-right col-6">
            <label>
              <FormattedMessage id="admin.manage-doctor.introduction" />
            </label>
            <textarea
              value={desc}
              onChange={(e) => this.handleOnChangeText(e, "desc")}
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row mb-3">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleOnChangeDoctorInfo}
              options={allPrices}
              name={"selectedPrice"}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleOnChangeDoctorInfo}
              options={allPayments}
              name={"selectedPayment"}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleOnChangeDoctorInfo}
              options={allProvinces}
              name={"selectedProvince"}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input
              value={nameClinic}
              onChange={(e) => this.handleOnChangeText(e, "nameClinic")}
              className="form-control"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              value={addressClinic}
              onChange={(e) => this.handleOnChangeText(e, "addressClinic")}
              className="form-control"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              value={note}
              onChange={(e) => this.handleOnChangeText(e, "note")}
              className="form-control"
            />
          </div>
          <div className="col-6 form-group">
            <label>Chọn chuyên khoa</label>
            <Select
              value={selectedSpecialty}
              onChange={this.handleOnChangeDoctorInfo}
              options={allSpecialties}
              name={"selectedSpecialty"}
            />
          </div>
          <div className="col-6 form-group">
            <label>Chọn phòng khám</label>
            <Select
              value={selectedClinic}
              onChange={this.handleOnChangeDoctorInfo}
              options={allClinics}
              name={"selectedClinic"}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="mt-3 btn btn-primary"
        >
          {hasOldData ? (
            <FormattedMessage id="admin.manage-doctor.save-info" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.create-info" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctorsRedux: state.admin.allDoctors,
    allPricesRedux: state.admin.allPrices,
    allPaymentsRedux: state.admin.allPayments,
    allProvincesRedux: state.admin.allProvinces,
    allSpecialtiesRedux: state.admin.allSpecialties,
    allClinicsRedux: state.admin.allClinics,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
    getAllPricesStart: () => dispatch(actions.fetchAllPricesStart()),
    getAllPaymentsStart: () => dispatch(actions.fetchAllPaymentsStart()),
    getAllProvincesStart: () => dispatch(actions.fetchAllProvincesStart()),
    getAllSpecialtiesStart: () => dispatch(actions.fetchAllSpecialtiesStart()),
    getAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
    saveDetailDoctorStart: (data) =>
      dispatch(actions.saveDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
