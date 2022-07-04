import { hasCookiesEnabled } from './cookies-utils';

if (!hasCookiesEnabled()) {
  const script = document.createElement('script');
  script.src = 'cookie-support.min.js';
  document.body.appendChild(script);
}
