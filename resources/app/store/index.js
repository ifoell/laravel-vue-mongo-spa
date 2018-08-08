import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    post,
    auth,
  },
  strict: debug,
});
