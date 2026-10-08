import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "/timenex-new/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if(response.data?.status === "Token is Expired"){
      // window.location.href = "/timenex-new/login";
    
      localStorage.removeItem("token");
      localStorage.removeItem("menu");
        window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/timenex-new/login";

      localStorage.removeItem("token");
      localStorage.removeItem("menu");
    }

    return Promise.reject(error);
  }
);

export default api;