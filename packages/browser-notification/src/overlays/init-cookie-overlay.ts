import { hasCookiesEnabled } from './overlay-helpers';
import { version } from '../../package.json';
import { CDN_PATH } from '../utils';

if (!hasCookiesEnabled()) {
  const script = document.createElement('script');
  script.src = `${CDN_PATH}/cookie-overlay.min.${version}.js`;
  document.body.appendChild(script);
}
