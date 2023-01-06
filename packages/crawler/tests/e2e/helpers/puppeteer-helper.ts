import type { Page, WaitForOptions } from 'puppeteer';
import { getLoaderScript } from '@porsche-design-system/components-js/partials';

export const getInternalLoaderScriptForPrefixes = (prefixes: string[]): string =>
  prefixes.reduce((result, prefix) => result + getLoaderScript({ prefix: prefix }), '');

export const getExternalLoaderScriptForPrefixes = (prefixes: string[]): string => {
  const prefixesLoaders = prefixes.reduce(
    (result, prefix) =>
      result +
      `
    porscheDesignSystem.load(\{ prefix: '${prefix}' \});
  `,
    ''
  );
  // the script below has been copied from https://designsystem.porsche.com/v2/
  return `
        <script data-pds-loader-script="">
          var porscheDesignSystem;
          (() => {
            'use strict';
            var e = {
                d: (t, s) => {
                  for (var o in s) e.o(s, o) && !e.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: s[o] });
                },
                o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
                r: (e) => {
                  'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
                },
              },
              t = {};
            function s(e) {
              if ('noModule' in HTMLScriptElement.prototype) {
                const t = ('script', document.createElement('script'));
                (t.src = e), t.setAttribute('crossorigin', ''), document.body.appendChild(t);
              }
            }
            e.r(t), e.d(t, { load: () => n });
            const o = 'porscheDesignSystem';
            const n = (e = { prefix: '' }) => {
              !(function ({ script: e, version: t, prefix: n }) {
                const r =
                    (function (e) {
                      const t = (document[o] || (document[o] = {}), document[o]),
                        { [e]: s = null } = t;
                      if (null === s) {
                        const s = { isLoaded: !1, prefixes: [], registerCustomElements: null };
                        t[e] = s;
                      }
                      return t[e];
                    })(t) || {},
                  { isLoaded: i, prefixes: c, registerCustomElements: d } = r;
                i || (s(e), (r.isLoaded = !0)), c.includes(n) || (c.push(n), d && d(n));
              })(
                Object.assign(
                  Object.assign(
                    {},
                    {
                      version: '2.19.0',
                      script:
                        (typeof window !== 'undefined' && window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn'
                          ? 'https://cdn.ui.porsche.cn'
                          : 'https://cdn.ui.porsche.com') +
                        '/porsche-design-system/components/porsche-design-system.v2.19.0.f258677faa650f3f1c6b.js',
                    }
                  ),
                  e
                )
              );
            };
            porscheDesignSystem = t;
          })();
          ${prefixesLoaders}
        </script>`;
};

export const setContentWithDesignSystem = async (
  page: Page,
  firstPdsVersionPrefixes?: string[],
  secondPdsVersionPrefixes?: string[]
): Promise<void> => {
  const options: WaitForOptions = {
    waitUntil: 'networkidle0',
  };

  const firstLoaderScript = firstPdsVersionPrefixes ? getInternalLoaderScriptForPrefixes(firstPdsVersionPrefixes) : '';
  const secondLoaderScript = secondPdsVersionPrefixes
    ? getExternalLoaderScriptForPrefixes(secondPdsVersionPrefixes)
    : '';

  await page.setContent(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Porsche Design System - Crawler E2E Test Demo</title>
        <base href="http://localhost" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        ${firstLoaderScript}
        ${secondLoaderScript}

        <p-accordion heading="Some compact Accordion heading" compact="true">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </p-accordion>
        <p-banner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </p-banner>
        <p-button variant="primary" loading="true">Some label</p-button>
        <p-button-group>
          <p-button variant="primary">Some label</p-button>
          <p-button variant="secondary">Some label</p-button>
          <p-button variant="tertiary">Some label</p-button>
        </p-button-group>
        <p-button-pure>Label default</p-button-pure>
        <p-carousel heading="Heading">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </p-carousel>
        <p-checkbox-wrapper label="Some label">
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <p-content-wrapper>
          <p>Some content</p>
        </p-content-wrapper>
        <p-text-field-wrapper label="Some Label" description="Some Description">
          <input type="text" />
        </p-text-field-wrapper>
        <p-divider></p-divider>
        <p-fieldset-wrapper label="Some label"></p-fieldset-wrapper>
        <p-flex>
          <p-flex-item>
            <p>1</p>
          </p-flex-item>
          <p-flex-item>
            <p>2</p>
          </p-flex-item>
        </p-flex>
        <p-grid>
          <p-grid-item size="12">
            <p>12</p>
          </p-grid-item>
        </p-grid>
        <p-headline variant="large-title">The quick brown fox jumps over the lazy dog</p-headline>
        <p-icon size="small" aria-label="Icon"></p-icon>
        <p-inline-notification
          heading="Some neutral heading"
          description="Some description"
          theme="dark"
        ></p-inline-notification>
        <p-link variant="primary" href="https://www.porsche.com">Some label</p-link>
        <p-link-pure href="https://www.porsche.com">Label default</p-link-pure>
        <p-link-social href="https://www.facebook.com" icon="logo-facebook">Some label</p-link-social>
        <p-link-tile href="#" label="Some Label" description="Default">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
            height="50"
            alt="Some alt text"
          />
        </p-link-tile>
        <p-marque trademark="false"></p-marque>
        <p-modal heading="Some Heading" open="true">Some Content</p-modal>

        <my-prefix-p-text>TEST123</my-prefix-p-text>
        <test-prefix-p-text>TEST123</test-prefix-p-text>
      </body>
    </html>

    `,
    options
  );
};
