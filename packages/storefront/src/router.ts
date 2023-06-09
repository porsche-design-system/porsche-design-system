import Vue from 'vue';
import VueRouter from 'vue-router';
import $store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/:page',
      name: 'custom',
      component: () => import('@/views/Custom.vue'),
    },
    {
      path: '/:category/:page/:tab?',
      name: 'page',
      component: () => import('@/views/Page.vue'),
    },
    {
      path: '/patterns/:category/example/:pattern',
      name: 'pattern',
      component: () => import('@/views/Pattern.vue'),
      meta: { standalone: true },
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await $store.dispatch('toggleLoadingAsync', true);
  next();
});

router.afterEach(async () => {
  await $store.dispatch('toggleLoadingAsync', false);
  window.scrollTo(0, 0);
});

export default router;
