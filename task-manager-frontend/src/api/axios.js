import axios from "axios";

// API instance
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Add JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
