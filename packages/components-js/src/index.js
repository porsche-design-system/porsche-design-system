import { defineCustomElements } from '@porsche-design-system/components-js/dist/esm/loader.mjs';
import { setRegisterComponentsCallback } from '@porsche-design-system/web-components-manager';

setRegisterComponentsCallback(
  'porscheDesignSystem',
  (prefix) =>
    defineCustomElements(window, {
      transformTagName: (tagName) => (prefix ? prefix + '-' + tagName : tagName)
    }),
  PORSCHE_DESIGN_SYSTEM_VERSION
);
