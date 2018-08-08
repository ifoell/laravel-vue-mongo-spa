import store from '@/store';

export default async (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};
