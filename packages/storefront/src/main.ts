import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Playground from '@/components/Playground.vue';
import ColorBadge from '@/components/ColorBadge.vue';
import TableOfContents from '@/components/TableOfContents.vue';
import { componentsReady } from '@porsche-design-system/components-js';
import A11yIcon from '@/components/A11yIcon.vue';
import PartialDocs from '@/components/PartialDocs.vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

declare global {
  interface Window {
    componentsReady: typeof componentsReady;
  }
}

window.componentsReady = componentsReady; // for vrt

/**
 * TODO: Bugfix for macOS + Slack automatic hash escaping (e.g. Slack on macOS manipulates following url
 * from https://designsystem.porsche.com/latest/#/components/marque#code
 * to https://designsystem.porsche.com/latest/#/components/marque%23code
 * which causes 404)
 */
window.location.hash = window.location.hash.replace('%23', '#');

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/(p-|phn-)\w*/];

Vue.use({
  install(vue: VueConstructor) {
    vue.component('A11yIcon', A11yIcon);
    vue.component('ColorBadge', ColorBadge);
    // eslint-disable-next-line vue/multi-word-component-names
    vue.component('Playground', Playground);
    vue.component('TableOfContents', TableOfContents);
    vue.component('PartialDocs', PartialDocs);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
