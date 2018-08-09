import {
  retrievePosts,
  retrievePost,
  performUpdate,
  performCreate,
  performDelete,
} from '../../api/post';
import * as types from '../mutation-types';

// initial state
const defaultState = {
  list: [],
  total: 0,
  current: {},
};

// getters
const getters = {};

// actions
const actions = {
  getPosts({ commit }, params) {
    retrievePosts(params).then((response) => {
      if (response.status === 200) {
        commit(types.SET_POST_LIST, response.data);
      }
    });
  },
  async fetchPost({ commit }, postId) {
    const response = await retrievePost(postId);
    if (response.status === 200) {
      await commit(types.SET_POST, response.data);
    }
  },

  async savePost({ commit }, params) {
    const action = params._id ? performUpdate : performCreate;
    const response = await action(params);
    if (response.status === 200) {
      await commit(types.SET_POST, response.data);
    }
    return response;
  },
  async deletePost({ commit }, postId) {
    const response = await performDelete(postId);
    if (response.status === 200) {
      await commit(types.REMOVE_POST, postId);
    }
    return response;
  },
};

// mutations
const mutations = {
  [types.SET_POST_LIST](state, { posts, total }) {
    state.list = posts;
    state.total = total;
  },
  [types.SET_POST](state, post) {
    state.current = post;
  },
  [types.REMOVE_POST](state, postId) {
    state.list = state.list.filter(p => p._id !== postId);
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
