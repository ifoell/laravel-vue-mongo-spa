import isEmpty from 'lodash/isEmpty';
import { performLogin, fetchAuthUser, performLogout } from '../../api/auth';
import { setAccessToken, getAccessToken } from '../../utils/auth';
import * as types from '../mutation-types';

// initial state
const defaultState = {
  user: null,
};

// getters
const getters = {
  isAuthenticated: state => !isEmpty(state.user),
  getAccessToken,
};

// actions
const actions = {
  async login({ dispatch }, params) {
    const { data } = await performLogin(params);
    const { token } = data;

    if (token) {
      setAccessToken(token);
      await dispatch('fetchUser');
    }

    return data;
  },
  async fetchUser({ commit }, params) {
    let user = null;
    try {
      const { data } = await fetchAuthUser(params);
      user = data;
    } catch (_) {
      setAccessToken(null);
    }
    await commit(types.UPDATE_USER, user);
  },
  async logout({ commit }) {
    try {
      performLogout();
    } catch (_) { /**/ }
    commit(types.UPDATE_USER, null);
    setAccessToken(null);
  },
};

// mutations
const mutations = {
  [types.UPDATE_USER](state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
