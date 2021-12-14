import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Playground from '@/components/Playground.vue';
import ColorBadge from '@/components/ColorBadge.vue';
import { componentsReady } from '@porsche-design-system/components-js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

(window as any).componentsReady = componentsReady; // for vrt

/**
 * TODO: Bugfix for macOS + Slack automatic hash escaping (e.g. Slack on macOS manipulates following url
 * from https://designsystem.porsche.com/latest/#/components/marque#code
 * to https://designsystem.porsche.com/latest/#/components/marque%23code
 * which causes 404)
 */
window.location.hash = window.location.hash.replace('%23', '#');

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

Vue.use({
  install(vue: VueConstructor) {
    vue.component('Playground', Playground);
    vue.component('ColorBadge', ColorBadge);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
