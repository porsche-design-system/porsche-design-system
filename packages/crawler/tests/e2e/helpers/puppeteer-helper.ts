import type { Page } from 'puppeteer';
import { getInitialStyles, getLoaderScript } from '@porsche-design-system/components-js/partials';

export type PdsTestingContext = {
  bodyHtml: string;
  firstPdsVersionPrefixes?: string[];
  secondPdsVersionPrefixes?: string[];
};

export const getInternalLoaderScriptForPrefixes = (prefixes: string[]): string =>
  prefixes.reduce((result, prefix) => result + getLoaderScript({ prefix: prefix }), '');

export const getExternalLoaderScriptForPrefixes = (prefixes: string[]): string => {
  const prefixLoaders = prefixes
    .map((prefix) => `porscheDesignSystem.load(\{ prefix: '${prefix}' \});`)
    .join('\n      ');

  // the script below has been copied from https://designsystem.porsche.com/v2/
  return `
    <script data-pds-loader-script="">
      var porscheDesignSystem;(()=>{"use strict";var e={d:(t,s)=>{for(var o in s)e.o(s,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:s[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function s(e){if("noModule"in HTMLScriptElement.prototype){const t=("script",document.createElement("script"));t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}}e.r(t),e.d(t,{load:()=>n});const o="porscheDesignSystem";const n=(e={prefix:""})=>{!function({script:e,version:t,prefix:n}){const r=function(e){const t=(document[o]||(document[o]={}),document[o]),{[e]:s=null}=t;if(null===s){const s={isLoaded:!1,prefixes:[],registerCustomElements:null};t[e]=s}return t[e]}(t)||{},{isLoaded:i,prefixes:c,registerCustomElements:d}=r;i||(s(e),r.isLoaded=!0),c.includes(n)||(c.push(n),d&&d(n))}(Object.assign(Object.assign({},{version:"2.18.0",script:(typeof window!=='undefined'&&window.PORSCHE_DESIGN_SYSTEM_CDN==='cn'?'https://cdn.ui.porsche.cn':'https://cdn.ui.porsche.com')+"/porsche-design-system/components/porsche-design-system.v2.18.0.ec5f4e3768659fe2c13b.js"}),e))};porscheDesignSystem=t})();
      ${prefixLoaders}
    </script>`;
};

export const setContentWithDesignSystem = async (page: Page, pdsTestingContext: PdsTestingContext): Promise<void> => {
  const { firstPdsVersionPrefixes, secondPdsVersionPrefixes, bodyHtml } = pdsTestingContext;

  let firstLoaderScript = firstPdsVersionPrefixes ? getInternalLoaderScriptForPrefixes(firstPdsVersionPrefixes) : '';
  const secondLoaderScript = secondPdsVersionPrefixes
    ? getExternalLoaderScriptForPrefixes(secondPdsVersionPrefixes)
    : '';

  // by default load internal version script with an empty prefix
  if (!firstLoaderScript && !secondLoaderScript) {
    firstLoaderScript = getInternalLoaderScriptForPrefixes(['']);
  }

  await page.setContent(
    `
<!DOCTYPE html>
<html>
  <head>
    <title>Porsche Design System - Crawler E2E Test Demo</title>
    <base href="http://localhost" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${getInitialStyles()}
  </head>
  <body>
    ${firstLoaderScript}
    ${secondLoaderScript}
    ${bodyHtml}
  </body>
</html>`,
    { waitUntil: 'networkidle0' }
  );
};
