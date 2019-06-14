import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineCustomElements } from '@porscheui/ui-kit-js/loader';
import Playground from '@/components/Playground.vue';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

defineCustomElements(window);

const PlaygroundPlugin = {
  install(vue: any) {
    vue.component('Playground', Playground);
  },
};

Vue.use(PlaygroundPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
