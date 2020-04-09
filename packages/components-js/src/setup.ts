import { initBlurOnFocus } from './utils/blur-on-focus';
import { injectGlobalStyle } from './utils/inject-global-style';

export default (): void => {
  injectGlobalStyle();
  initBlurOnFocus();
};
