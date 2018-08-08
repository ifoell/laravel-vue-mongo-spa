import { retrievePosts } from '../../api/post';
import * as types from '../mutation-types';

// initial state
const defaultState = {
  list: [],
  total: 0,
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
};

// mutations
const mutations = {
  [types.SET_POST_LIST](state, { posts, total }) {
    state.list = posts;
    state.total = total;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
