import { validatePartialUsage } from './utils/validation/partials/validatePartialUsage';
import { injectGlobalStyle } from './utils';

export default (): void => {
  injectGlobalStyle();
  validatePartialUsage();
};
