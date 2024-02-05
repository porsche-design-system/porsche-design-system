import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Playground from '@/components/Playground.vue';
import OpenBugTemplateInStackBlitz from '@/components/OpenBugTemplateInStackBlitz.vue';
import TableOfContents from '@/components/TableOfContents.vue';
import { componentsReady } from '@porsche-design-system/components-js';
import A11yIcon from '@/components/A11yIcon.vue';
import PartialDocs from '@/components/PartialDocs.vue';
import PlaygroundButton from '@/components/PlaygroundButton.vue';
import PlaygroundInput from '@/components/PlaygroundInput.vue';
import PlaygroundCheckbox from '@/components/PlaygroundCheckbox.vue';
import PlaygroundSelect from '@/components/PlaygroundSelect.vue';
import ComponentHeading from '@/components/ComponentHeading.vue';
import ComponentMetaOverview from '@/components/ComponentMetaOverview.vue';
import MetaTable from '@/components/MetaTable.vue';
import Notification from '@/components/Notification.vue';

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
window.location.hash = window.location.hash.replace(/%23/g, '#');

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/p-\w*/];

Vue.use({
  install(vue: VueConstructor) {
    vue.component('A11yIcon', A11yIcon);
    vue.component('OpenBugTemplateInStackBlitz', OpenBugTemplateInStackBlitz);
    vue.component('PartialDocs', PartialDocs);
    // eslint-disable-next-line vue/multi-word-component-names
    vue.component('Notification', Notification);
    // eslint-disable-next-line vue/multi-word-component-names
    vue.component('Playground', Playground);
    vue.component('PlaygroundButton', PlaygroundButton);
    vue.component('PlaygroundInput', PlaygroundInput);
    vue.component('PlaygroundCheckbox', PlaygroundCheckbox);
    vue.component('PlaygroundSelect', PlaygroundSelect);
    vue.component('TableOfContents', TableOfContents);
    vue.component('ComponentHeading', ComponentHeading);
    vue.component('ComponentMetaOverview', ComponentMetaOverview);
    vue.component('MetaTable', MetaTable);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
