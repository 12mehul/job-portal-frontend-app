import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiUrl = "http://localhost:4444/api";

const authFetch = axios.create({
  baseURL: apiUrl,
});

authFetch.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.status == 401) {
      window.location.href = "/";
      localStorage.clear();
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authFetch;
