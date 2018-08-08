import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Auth/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import requiresAuth from './middlewares/requiresAuth';
import checkAuth from './middlewares/checkAuth';
import notAuthenticated from './middlewares/notAuthenticated';

const routeMiddleware = {
  requiresAuth,
  checkAuth,
  notAuthenticated,
};

const globalMiddleware = {
  before: ['checkAuth'],
  after: [],
};

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        before: ['notAuthenticated'],
        after: [],
      },
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        before: ['requiresAuth'],
        after: [],
      },
    },
  ],
});

async function callMiddlewares(type, to, from, next) {
  const middlewaresToBeApplied = [];
  to.matched.forEach((matched) => {
    const { [type]: middlewares = [] } = matched.meta;
    globalMiddleware[type].concat(middlewares).forEach((middleware) => {
      if (typeof routeMiddleware[middleware] === 'function') {
        middlewaresToBeApplied.push(routeMiddleware[middleware]);
      }
    });
  });

  /* eslint-disable */
  for (const i in middlewaresToBeApplied) {
    if (middlewaresToBeApplied[i]) {
      await middlewaresToBeApplied[i](to, from, next);
    }
  }
  /* eslint-enable */

  if (typeof next === 'function') {
    next();
  }
}

router.beforeEach((to, from, next) => { callMiddlewares('before', to, from, next); });
router.afterEach((to, from, next) => { callMiddlewares('after', to, from, next); });


export default router;
