import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Auto attach token
api.interceptors.request.use((config) => {
  if (
    config.url?.includes("/auth/register") ||
    config.url?.includes("/auth/login")
  ) {
    return config;
  }

  const financeToken = localStorage.getItem("finance_token");
  const sagToken = localStorage.getItem("sag_token");
  const userToken = localStorage.getItem("token");

  const token = financeToken || sagToken || userToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// 🔹 Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;