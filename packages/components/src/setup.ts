import { injectGlobalStyle } from './utils';
import { validatePartialUsage } from './utils/validation/partials/validatePartialUsage';

export default (): void => {
  injectGlobalStyle();
  validatePartialUsage();
};
