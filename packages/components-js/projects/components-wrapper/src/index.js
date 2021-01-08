import { defineCustomElements } from '@porsche-design-system/components/dist/esm/loader-cleaned';
import { setRegisterComponentsCallback } from '@porsche-design-system/web-components-manager';

setRegisterComponentsCallback(
  (prefix) =>
    defineCustomElements({
      transformTagName: (tagName) => (prefix ? `${prefix}-${tagName}` : tagName),
    }),
  PORSCHE_DESIGN_SYSTEM_VERSION
);
