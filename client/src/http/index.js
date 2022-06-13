import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

$api.interceptors.response.use(
  config => config, 
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      originalRequest._isReady = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
        localStorage.setItem('accessToken', response.data.accessToken);
        return $api.request(originalRequest);
      }
      catch(error) {
        console.log(error);
        window.location.href = 'auth';
      }
  }
});

export default $api;
