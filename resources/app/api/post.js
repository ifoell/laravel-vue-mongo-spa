import axios from '../utils/axios';

export function retrievePosts(params) {
  return axios.get('/api/post/', {
    params,
  });
}

export function retrievePost(postId) {
  return axios.get(`/api/post/${postId}`);
}

export function performUpdate({ _id, ...params}) {
  return axios.put(`/api/post/${_id}`, params);
}

export function performCreate(params) {
  return axios.post('/api/post/', params);
}

export function performDelete(postId){
  return axios.delete(`/api/post/${postId}`);
}
