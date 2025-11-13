import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Account APIs
export const accountAPI = {
  getList: () => api.get("/accounts/list"),
  create: (data) => api.post("/accounts/create", data),
  getById: (id) => api.get(`/accounts/${id}`),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`),
};

// Group APIs
export const groupAPI = {
  getList: () => api.get("/group"),
  create: (data) => api.post("/group", data),
  getById: (id) => api.get(`/group/${id}`),
  update: (id, data) => api.put(`/group/${id}`, data),
  delete: (id) => api.delete(`/group/${id}`),
};

// Permission APIs
export const permissionAPI = {
  getList: () => api.get("/permission/list"),
  create: (data) => api.post("/permission/create", data),
  getById: (id) => api.get(`/permission/${id}`),
  update: (id, data) => api.put(`/permission/${id}`, data),
  delete: (id) => api.delete(`/permission/${id}`),
};

export default api;
