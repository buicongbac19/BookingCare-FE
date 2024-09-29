import { getAllDoctors } from "../../services/userService";
import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  allUsers: [],
  topDoctors: [],
  allDoctors: [],
  allSchedules: [],
  allPrices: [],
  allPayments: [],
  allProvinces: [],
  allSpecialties: [],
  allHandBooks: [],
  allClinics: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        genders: [],
        isLoadingGender: false,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.data,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
        positions: [],
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        roles: [],
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.users,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        allUsers: [],
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        topDoctors: action.doctorsData,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
        topDoctors: [],
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.allDoctors,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
        allDoctors: [],
      };
    case actionTypes.FETCH_ALL_SCHEDULES_SUCCESS:
      return {
        ...state,
        allSchedules: action.allSchedules,
      };
    case actionTypes.FETCH_ALL_SCHEDULES_FAILED:
      return {
        ...state,
        allSchedule: [],
      };
    case actionTypes.FETCH_ALL_PRICES_SUCCESS:
      return {
        ...state,
        allPrices: action.allPrices,
      };
    case actionTypes.FETCH_ALL_PRICES_FAILED:
      return {
        ...state,
        allPrices: [],
      };
    case actionTypes.FETCH_ALL_PAYMENTS_SUCCESS:
      return {
        ...state,
        allPayments: action.allPayments,
      };
    case actionTypes.FETCH_ALL_PAYMENTS_FAILED:
      return {
        ...state,
        allPayments: [],
      };
    case actionTypes.FETCH_ALL_PROVINCES_SUCCESS:
      return {
        ...state,
        allProvinces: action.allProvinces,
      };
    case actionTypes.FETCH_ALL_PROVINCES_FAILED:
      return {
        ...state,
        allProvinces: [],
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS:
      return {
        ...state,
        allSpecialties: action.allSpecialties,
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_FAILED:
      return {
        ...state,
        allSpecialties: [],
      };
    case actionTypes.FETCH_ALL_HANDBOOKS_SUCCESS:
      return {
        ...state,
        allHandBooks: action.allHandBooks,
      };
    case actionTypes.FETCH_ALL_HANDBOOKS_FAILED:
      return {
        ...state,
        allHandBooks: [],
      };
    case actionTypes.FETCH_ALL_CLINICS_SUCCESS:
      return {
        ...state,
        allClinics: action.allClinics,
      };
    case actionTypes.FETCH_ALL_CLINICS_FAILED:
      return {
        ...state,
        allClinics: [],
      };
    default:
      return state;
  }
};

export default appReducer;
