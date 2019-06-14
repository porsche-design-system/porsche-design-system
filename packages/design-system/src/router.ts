import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:category/:page',
      name: 'page',
      component: () => import('./views/Page.vue'),
    },
    {
      path: '/components/:category/:component',
      name: 'component',
      component: () => import('./views/Component.vue'),
    },
  ],
});
