import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { load } from '@porsche-design-system/components-js';

import './assets/main.css';

load({ prefix: 'my-prefix' });

const app = createApp(App);

app.use(router);

app.mount('#app');

app.provide('prefix', 'my-prefix');
