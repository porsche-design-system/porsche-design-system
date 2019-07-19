import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'redirect',
      redirect: '/web'
    },
    {
      path: '/web',
      name: 'home-web',
      component: Home
    },
    {
      path: '/app',
      name: 'home-app',
      component: () => import('./views/HomeApp.vue')
    },
    {
      path: '/:area/:category/:page',
      name: 'page',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/:area/components/:category/:story',
      name: 'story',
      component: () => import('./views/Story.vue')
    },
    {
      path: '/:area/:page',
      name: 'custom',
      component: () => import('./views/Custom.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
