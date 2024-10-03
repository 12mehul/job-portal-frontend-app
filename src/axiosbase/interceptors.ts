import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiUrl = "http://localhost:4444/api";

const authFetch = axios.create({
  baseURL: apiUrl,
});

authFetch.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    const user = localStorage.getItem("uinfo")
      ? JSON.parse(localStorage.getItem("uinfo") as string)
      : null;

    if (user.token) {
      request.headers.Authorization = `Bearer ${user.token}`;
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
