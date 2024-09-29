import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserFromService,
  getAllUsers,
  deleteUserFromService,
  editUserFromService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getAllSpecialty,
  getAllHandBook,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) dispatch(fetchGenderSuccess(res.data));
      else dispatch(fetchGenderFailed());
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) dispatch(fetchPositionSuccess(res.data));
      else dispatch(fetchPositionFailed());
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) dispatch(fetchRoleSuccess(res.data));
      else dispatch(fetchRoleFailed());
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserFromService(data);
      if (res && res.errCode === 0) {
        toast.success("Created a new user!");
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else dispatch(createUserFailed());
    } catch (error) {
      dispatch(createUserFailed());
      console.log(error);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeService(3);
      if (res && res.errCode === 0)
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      else dispatch(fetchAllUsersFailed());
    } catch (error) {
      dispatch(fetchAllUsersFailed());
      console.log(error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserFromService(id);
      if (res && res.errCode === 0) {
        toast.success("Deleted a user successfully!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else dispatch(deleteUserFailed());
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserFromService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit a user successfully!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else dispatch(editUserFailed());
    } catch (error) {
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) dispatch(fetchTopDoctorsSuccess(res.data));
      else dispatch(fetchTopDoctorsFailed());
    } catch (error) {
      dispatch(fetchTopDoctorsFailed());
      console.log(error);
    }
  };
};

export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  doctorsData: data,
});

export const fetchTopDoctorsFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) dispatch(fetchAllDoctorsSuccess(res.data));
      else dispatch(fetchAllDoctorsFailed());
    } catch (error) {
      dispatch(fetchAllDoctorsFailed());
      console.log(error);
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  allDoctors: data,
});

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch(saveDetailDoctorSuccess());
        toast.success("Save doctor info successfully!");
      } else {
        dispatch(saveDetailDoctorFailed());
        toast.error("Failed to save doctor info!");
      }
    } catch (error) {
      dispatch(saveDetailDoctorFailed());
      console.log(error);
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const fetchAllSchedulesStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllSchedulesSuccess(res.data));
      } else dispatch(fetchAllSchedulesFailed());
    } catch (error) {
      dispatch(fetchAllSchedulesFailed());
      console.log(error);
    }
  };
};

export const fetchAllSchedulesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SCHEDULES_SUCCESS,
  allSchedules: data,
});

export const fetchAllSchedulesFailed = () => ({
  type: actionTypes.FETCH_ALL_SCHEDULES_FAILED,
});

export const fetchAllPricesStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PRICE");
      if (res && res.errCode === 0) {
        dispatch(fetchAllPricesSuccess(res.data));
      } else dispatch(fetchAllPricesFailed());
    } catch (error) {
      dispatch(fetchAllPricesFailed());
      console.log(error);
    }
  };
};

export const fetchAllPricesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PRICES_SUCCESS,
  allPrices: data,
});

export const fetchAllPricesFailed = () => ({
  type: actionTypes.FETCH_ALL_PRICES_FAILED,
});

export const fetchAllPaymentsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch(fetchAllPaymentsSuccess(res.data));
      } else dispatch(fetchAllPaymentsFailed());
    } catch (error) {
      dispatch(fetchAllPaymentsFailed());
      console.log(error);
    }
  };
};

export const fetchAllPaymentsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PAYMENTS_SUCCESS,
  allPayments: data,
});

export const fetchAllPaymentsFailed = () => ({
  type: actionTypes.FETCH_ALL_PAYMENTS_FAILED,
});

export const fetchAllProvincesStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0) {
        dispatch(fetchAllProvincesSuccess(res.data));
      } else dispatch(fetchAllProvincesFailed());
    } catch (error) {
      dispatch(fetchAllProvincesFailed());
      console.log(error);
    }
  };
};

export const fetchAllProvincesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PROVINCES_SUCCESS,
  allProvinces: data,
});

export const fetchAllProvincesFailed = () => ({
  type: actionTypes.FETCH_ALL_PROVINCES_FAILED,
});

export const fetchAllSpecialtiesStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtiesSuccess(res.data));
      } else dispatch(fetchAllSpecialtiesFailed());
    } catch (error) {
      dispatch(fetchAllSpecialtiesFailed());
      console.log(error);
    }
  };
};

export const fetchAllSpecialtiesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
  allSpecialties: data,
});

export const fetchAllSpecialtiesFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
});

export const fetchAllHandBooksStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllHandBook();
      if (res && res.errCode === 0) {
        dispatch(fetchAllHandBooksSuccess(res.data));
      } else dispatch(fetchAllHandBooksFailed());
    } catch (error) {
      dispatch(fetchAllHandBooksFailed());
      console.log(error);
    }
  };
};

export const fetchAllHandBooksSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_SUCCESS,
  allHandBooks: data,
});

export const fetchAllHandBooksFailed = () => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_FAILED,
});

export const fetchAllClinicsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        dispatch(fetchAllClinicsSuccess(res.data));
      } else dispatch(fetchAllClinicsFailed());
    } catch (error) {
      dispatch(fetchAllClinicsFailed());
      console.log(error);
    }
  };
};

export const fetchAllClinicsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CLINICS_SUCCESS,
  allClinics: data,
});

export const fetchAllClinicsFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINICS_FAILED,
});
