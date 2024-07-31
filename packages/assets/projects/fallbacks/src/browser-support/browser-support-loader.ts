import { hasPorscheDesignSystemBrowserSupport } from './browser-support-utils';

if (!hasPorscheDesignSystemBrowserSupport()) {
  const script = document.createElement('script');
  script.src = 'browser-support.js';
  document.body.appendChild(script);
}
