import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
});

// Add a request interceptor to include the user information
instance.interceptors.request.use(
  config => {
    const user = localStorage.getItem('user');
    if (user) {
      config.headers['X-User-Info'] = user;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;