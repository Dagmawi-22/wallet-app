import axios from "axios";

interface CreateApiInstanceProps {
  token?: string;
}

const createApiInstance = ({ token }: CreateApiInstanceProps = {}) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      if (!token) {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        // window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  console.log("tokkkkkkkk", token)

  return api;
};

export default createApiInstance;
