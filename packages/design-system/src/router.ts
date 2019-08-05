import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/web'
    },
    {
      path: '/web',
      name: 'home-web',
      meta: { area: 'web' },
      component: () => import('./views/HomeWeb.vue')
    },
    {
      path: '/app',
      name: 'home-app',
      meta: { area: 'app' },
      component: () => import('./views/HomeApp.vue')
    },
    {
      path: '/:area/404',
      alias: '*',
      name: '404',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '/:area/:page',
      name: 'custom',
      component: () => import('./views/Custom.vue')
    },
    {
      path: '/:area/:category/:page',
      name: 'page',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/web/components/:category/:story',
      name: 'story',
      meta: { area: 'web' },
      component: () => import('./views/Story.vue')
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
