import { validatePartialUsage } from './utils/validation/partials/validatePartialUsage';
import { injectGlobalStyle } from './utils';
import { version } from '../package.json';

export default (): void => {
  document.porscheDesignSystem[version].readyResolve();
  injectGlobalStyle();
  validatePartialUsage();
};
