import axios from "../axios";

let handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

let getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};

let createNewUserFromService = (data) => {
  return axios.post("/api/create-new-user", data);
};

let deleteUserFromService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

let editUserFromService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

let getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

let getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

let getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

let saveDetailDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

let getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

let saveBulkSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

let getScheduleByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedules-by-date?doctorId=${doctorId}&date=${date}`
  );
};

let getExtraInfoDoctorById = (id) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?id=${id}`);
};

let getProfileDoctorById = (id) => {
  return axios.get(`/api/get-profile-info-doctor-by-id?id=${id}`);
};

let postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

let verifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

let createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

let getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};

let getDetailSpecialtyById = ({ id, location }) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${id}&location=${location}`
  );
};

let deleteSpecialty = (id) => {
  return axios.delete("/api/delete-specialty", {
    data: {
      id: id,
    },
  });
};

let updateSpecialty = (data) => {
  return axios.put("/api/update-specialty", data);
};

let createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

let getAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};

let getDetailClinicById = ({ id }) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};

let updateClinic = (data) => {
  return axios.put("/api/update-clinic", data);
};

let deleteClinic = (id) => {
  return axios.delete("/api/delete-clinic", {
    data: {
      id: id,
    },
  });
};

let getAllPatientForDoctor = ({ doctorId, date }) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
  );
};

let postSendPrescription = (data) => {
  return axios.post("/api/send-prescription", data);
};

let createNewHandBook = (data) => {
  return axios.post("/api/create-new-handbook", data);
};

let getAllHandBook = () => {
  return axios.get("/api/get-all-handbook");
};

let getDetailHandBookById = ({ id }) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${id}`);
};

let updateHandBookInfo = (data) => {
  return axios.put("/api/update-handbook-info", data);
};

let deleteHandBook = (id) => {
  return axios.delete("/api/delete-handbook", {
    data: {
      id: id,
    },
  });
};

let sendMessage = (data) => {
  return axios.post("/api/send-message", data);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserFromService,
  deleteUserFromService,
  editUserFromService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInfoDoctor,
  saveBulkSchedule,
  getScheduleByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  verifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendPrescription,
  createNewHandBook,
  getAllHandBook,
  getDetailHandBookById,
  sendMessage,
  updateHandBookInfo,
  deleteHandBook,
  updateSpecialty,
  deleteSpecialty,
  updateClinic,
  deleteClinic,
};
