import { injectGlobalStyle } from './utils';
import { validatePartialUsage } from './utils/validation/validatePartialUsage';

export default (): void => {
  injectGlobalStyle();
  validatePartialUsage();
};
