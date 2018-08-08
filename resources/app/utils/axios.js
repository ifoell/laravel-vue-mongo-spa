import axios from 'axios';
import { getAccessToken } from './auth';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}


axios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, err => Promise.reject(err));

export default axios;
