import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { componentsReady } from '../projects/vue-wrapper/src/public-api';

const app = createApp(App);

app.use(router);

app.mount('#root');

(window as any).componentsReady = componentsReady; // for vrt
