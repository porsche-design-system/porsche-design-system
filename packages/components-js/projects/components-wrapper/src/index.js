import { setRegisterComponentsCallback } from '@porsche-design-system/components-manager-core';
import { defineCustomElements } from '@porsche-design-system/components/dist/esm/loader-cleaned';

setRegisterComponentsCallback(
  (prefix) =>
    defineCustomElements({
      transformTagName: (tagName) => (prefix ? `${prefix}-${tagName}` : tagName),
    }),
  // biome-ignore lint/correctness/noUndeclaredVariables: ok
  PORSCHE_DESIGN_SYSTEM_VERSION
);
