import type { PorscheDesignSystem } from './types';
import { validateVersions } from './utils';

export default (): void => {
  if (process.env.NODE_ENV !== 'development') {
    // not available during `yarn start` of components package
    (document.porscheDesignSystem[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any).readyResolve(); // provided via load() of components-js package
  }

  validateVersions();
};
