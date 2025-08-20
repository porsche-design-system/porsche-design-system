import type { PorscheDesignSystem } from './types';
import { injectGlobalStyle, validateVersions } from './utils';
import { validatePartialUsage } from './utils/validation/partials/validatePartialUsage';

export default (): void => {
  if (process.env.NODE_ENV !== 'development') {
    // not available during `npm run start` of components package
    (document.porscheDesignSystem[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any).readyResolve(); // provided via load() of components-js package
  }

  injectGlobalStyle();
  validatePartialUsage();
  validateVersions();
};
