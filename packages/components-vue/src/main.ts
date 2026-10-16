import './style.css';
import { componentsReady } from '@porsche-design-system/components-vue';
import type { ColorScheme } from '@porsche-design-system/shared';
import { createApp, type InjectionKey, type Ref } from 'vue';
import App from './App.vue';
import router from './router';

export const themeInjectionKey = Symbol('pdsTheme') as InjectionKey<Ref<ColorScheme>>;

const app = createApp(App);

app.use(router);

app.mount('#root');

(window as any).componentsReady = componentsReady; // for vrt
