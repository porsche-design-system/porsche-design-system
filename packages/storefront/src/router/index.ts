import Vue from 'vue';
import Router from 'vue-router';
import $store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/:page',
      name: 'custom',
      component: () => import('@/views/Custom.vue')
    },
    {
      path: '/:category/:page',
      name: 'page',
      component: () => import('@/views/Page.vue')
    },
    {
      path: '/patterns/:category/:pattern',
      name: 'pattern',
      component: () => import('@/views/Pattern.vue'),
      meta: {standalone: true}
    },
    {
      path: '*',
      redirect: {name: '404'}
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
  if (scrollElement !== null) {
    scrollElement.scrollTo(0, 0);
  }
});

export default router;
