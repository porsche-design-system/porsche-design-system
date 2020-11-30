import { injectGlobalStyle } from './utils/inject-global-style';
import { trackLoader } from './utils';

export default (): void => {
  trackLoader();
  injectGlobalStyle();
};
