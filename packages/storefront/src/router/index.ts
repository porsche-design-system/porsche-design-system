import Vue from 'vue';
import Router from 'vue-router';
import $store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    // Home
    {
      path: '/',
      name: 'home',
      redirect: '/web'
    },
    // App
    {
      path: '/app',
      name: 'home-app',
      meta: { area: 'app' },
      component: () => import('@/views/HomeApp.vue')
    },
    {
      path: '/app/404',
      name: '404-app',
      meta: { area: 'app' },
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/app/:page',
      name: 'custom-app',
      meta: { area: 'app' },
      component: () => import('@/views/Custom.vue')
    },
    {
      path: '/app/:category/:page',
      name: 'page-app',
      meta: { area: 'app' },
      component: () => import('@/views/Page.vue')
    },
    {
      path: '/app/components/:category/:story',
      name: 'story-app',
      meta: { area: 'app' },
      component: () => import('@/views/Story.vue')
    },
    {
      path: '/app/*',
      redirect: { name: '404-app' }
    },
    // Web
    {
      path: '/web',
      name: 'home-web',
      meta: { area: 'web' },
      component: () => import('@/views/HomeWeb.vue')
    },
    {
      path: '/web/404',
      name: '404-web',
      meta: { area: 'web' },
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/web/:page',
      name: 'custom-web',
      meta: { area: 'web' },
      component: () => import('@/views/Custom.vue')
    },
    {
      path: '/web/:category/:page',
      name: 'page-web',
      meta: { area: 'web' },
      component: () => import('@/views/Page.vue')
    },
    {
      path: '/web/components/:category/:story',
      name: 'story-web',
      meta: { area: 'web' },
      component: () => import('@/views/Story.vue')
    },
    {
      path: '/web/*',
      redirect: { name: '404-web' }
    },
    // Default
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  await $store.dispatch('toggleLoadingAsync', true);
  next();
});

router.afterEach(async () => {
  await $store.dispatch('toggleLoadingAsync', false);
  // workaround for open issue(s) to set vue router scroll behaviour to other than standard body element
  // see: https://github.com/vuejs/vue-router/pull/2780
  const scrollElement = document.querySelector('.main');
  if(scrollElement !== null) {
    scrollElement.scrollTo(0,0);
  }
});

export default router;
