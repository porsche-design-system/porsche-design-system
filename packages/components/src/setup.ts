import { injectGlobalStyle } from './utils/inject-global-style';
import { isObject } from './utils';

export default (): void => {
  injectGlobalStyle();
  isObject({}); // to trick bundling and avoid separate jss chunk 🤷
};
