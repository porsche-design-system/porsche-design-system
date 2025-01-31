import Vue from 'vue';
import VueRouter from 'vue-router';

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
      component: () => import('@/views/Custom.vue'), // used for license.md, markdown.md, etc.
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

router.afterEach(() => {
  window.scrollTo(0, 0);
  const targetFocusElement = document.querySelector('h1');
  targetFocusElement?.focus();
});

export default router;
