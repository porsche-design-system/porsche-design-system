import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { componentsReady } from '@porsche-design-system/components-vue';

const app = createApp(App);

app.use(router);

app.mount('#root');

(window as any).componentsReady = componentsReady; // for vrt
