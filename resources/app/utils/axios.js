import axios from 'axios';
import { getAccessToken } from './auth';
import { setAccessToken } from '@/utils/auth';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}


axios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    /* eslint-disable-next-line */
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, err => Promise.reject(err));

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    setAccessToken(null);
    window.location = '/'
  } else {
    throw err;
  }
}, err => Promise.reject(err));

export default axios;
