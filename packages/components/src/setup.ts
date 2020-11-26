import { initBlurOnFocus } from './utils/blur-on-focus';
import { injectGlobalStyle } from './utils/inject-global-style';
import { trackLoader } from './utils';
import { componentsReady } from './components-ready';

export default (): void => {
  trackLoader();
  injectGlobalStyle();
  initBlurOnFocus();
  (window as any).componentsReady = componentsReady;
};
