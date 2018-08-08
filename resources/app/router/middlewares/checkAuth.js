import store from '@/store';

export default async (to, from, next) => {
  if (!store.getters['auth/isAuthenticated'] && store.getters['auth/getAccessToken']) {
    try {
      await store.dispatch('auth/fetchUser');
    } catch (e) { /**/ }
  }
  next();
};
