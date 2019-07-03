import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineCustomElements, applyPolyfills } from '@porscheui/ui-kit-js/loader';
import Playground from '@/components/Playground.vue';
import ColorBadge from '@/components/ColorBadge.vue';
import ExampleText from '@/components/ExampleText.vue';
import '@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.use({
  install(vue: any) {
    vue.component('Playground', Playground);
    vue.component('ColorBadge', ColorBadge);
    vue.component('ExampleText', ExampleText);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
