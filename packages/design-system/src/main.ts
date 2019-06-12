import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineCustomElements } from '@porscheui/ui-kit-js/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

defineCustomElements(window);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
