import { defineCustomElements } from '@porsche-design-system/components/dist/esm/loader-cleaned';
import { setRegisterComponentsCallback } from '@porsche-design-system/components-manager-core';

const CM_KEY = 'porscheDesignSystem';

setRegisterComponentsCallback(
  (prefix) => {
    const versionData = document[CM_KEY]?.[PORSCHE_DESIGN_SYSTEM_VERSION];
    const exclude = versionData?.exclude || [];
    defineCustomElements({
      transformTagName: (tagName) => (prefix ? `${prefix}-${tagName}` : tagName),
      exclude,
    });
  },
  PORSCHE_DESIGN_SYSTEM_VERSION
);
