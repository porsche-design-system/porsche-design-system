import { initBlurOnFocus } from './utils/blur-on-focus';
import { injectGlobalStyle } from './utils/inject-global-style';
import { trackLoader } from './utils';
import { designSystemReady } from './utils/design-system-ready';

export default (): void => {
  trackLoader();
  injectGlobalStyle().then(designSystemReady);
  initBlurOnFocus();
};
