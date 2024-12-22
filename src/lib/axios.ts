import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://144.126.214.90/api" // Fallback to default URL if VITE_API_URL is not set
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
