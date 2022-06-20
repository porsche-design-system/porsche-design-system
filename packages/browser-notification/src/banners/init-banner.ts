import { version } from '../../package.json';
import { isIEorEdgeHTML } from './banner-helpers';
import { CDN_PATH } from '../utils';

if (isIEorEdgeHTML()) {
  const script = document.createElement('script');
  script.src = `${CDN_PATH}/banner.min.${version}.js`;
  document.body.appendChild(script);
}
