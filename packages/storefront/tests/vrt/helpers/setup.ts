import { setCustomOptions } from '@porsche-design-system/shared/testing';

setCustomOptions({
  baseUrl: 'http://localhost:8080',
  mode: 'square-auto',
});

export const routerViewSelector = '#app > .main > .router-view';
