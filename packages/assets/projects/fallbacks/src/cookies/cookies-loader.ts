import { hasCookiesEnabled } from './cookies-utils';

if (!hasCookiesEnabled()) {
  const script = document.createElement('script');
  script.src = 'cookies.js';
  document.body.appendChild(script);
}
