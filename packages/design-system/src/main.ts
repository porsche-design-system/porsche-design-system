import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {defineCustomElements, applyPolyfills} from '@porsche-ui/ui-kit-js/loader';
import Playground from '@/components/Playground.vue';
import ColorBadge from '@/components/ColorBadge.vue';
import '@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';

/**
 * TODO: Bugfix for macOS + Slack automatic hash escaping (e.g. Slack on macOS manipulates following url
 * from https://ui.porsche.com/latest/#/web/components/basic/marque#code
 * to https://ui.porsche.com/latest/#/web/components/basic/marque%23code
 * which causes 404)
 */
window.location.hash = window.location.hash.replace('%23', '#');

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

(async () => {
  await applyPolyfills();
  await defineCustomElements(window);
})();

Vue.use({
  install(vue: any) {
    vue.component('Playground', Playground);
    vue.component('ColorBadge', ColorBadge);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
