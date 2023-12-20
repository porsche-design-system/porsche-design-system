import { createApp } from 'vue';
import { componentsReady } from '@porsche-design-system/components-vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#root');

(window as any).componentsReady = componentsReady; // for vrt
