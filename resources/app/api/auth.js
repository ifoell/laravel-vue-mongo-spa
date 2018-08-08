import axios from '../utils/axios';

export function performLogin(params) {
  return axios.post('/api/login', params);
}

export function performLogout() {
  return axios.post('/api/logout');
}

export function fetchAuthUser() {
  return axios.get('/api/user');
}
