import axios from '../utils/axios';

export function retrievePosts(params) {
  return axios.get('/api/posts/', {
    params,
  });
}

export function createPost() {
  return axios.get('/api/posts');
}
