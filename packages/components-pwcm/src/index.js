import { defineCustomElements } from '@porsche-design-system/components-js/dist/esm/loader.mjs';
import { setRegisterComponentsCallback } from '@myporsche/myservices-web-components-manager';

setRegisterComponentsCallback('porscheDesignSystem', function(prefix) {
  defineCustomElements(window, {
    transformTagName: function(tagName) {
      if(prefix === '') {
        return tagName;
      }

      return prefix + '-' + tagName;
    }
  });
}, PORSCHE_DESIGN_SYSTEM_VERSION);
