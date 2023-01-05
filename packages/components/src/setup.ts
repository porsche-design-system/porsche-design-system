import { validatePartialUsage } from './utils/validation/partials/validatePartialUsage';
import { injectGlobalStyle } from './utils';

export default (): void => {
  document.porscheDesignSystem[ROLLUP_REPLACE_VERSION].readyResolve();
  injectGlobalStyle();
  validatePartialUsage();
};
