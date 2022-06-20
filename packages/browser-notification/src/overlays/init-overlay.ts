import { version } from '../../package.json';
import { supportsUsedPDSTechnologies } from './overlay-helpers';
import { CDN_PATH } from '../utils';

if (!supportsUsedPDSTechnologies()) {
  const script = document.createElement('script');
  script.src = `${CDN_PATH}/overlay.min.${version}.js`;
  document.body.appendChild(script);
}
