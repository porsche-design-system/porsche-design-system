import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { getDSRPonyfill } from '@porsche-design-system/components-js/partials';
import { setProperty, supportsDeclarativeShadowDOM, waitForComponentsReady, waitForStencilLifecycle } from '../utils';

export const setPageWithContent = async (page: Page): Promise<void> => {
  await page.setContent(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
    <title></title>
    <script type="text/javascript" src="http://localhost:8575/index.js"></script>
    <style>
      :root {
        --p-transition-duration: 0s;
      }
    </style>
  </head>
  <body>
    <p-button id="with-dsr-template">
      <template shadowroot="open">
        <style>
          button {
            color: rgb(9, 1, 1);
          }
        </style>
        <button>
          <slot></slot>
        </button>
      </template>
      Some label
    </p-button>
    <p-button id="without-dsr-template">Some label</p-button>
  </body>
</html>`,
    { waitUntil: 'networkidle' }
  );
};

const getButtonSelector = (hasDsrTemplate: boolean) =>
  `p-button#${hasDsrTemplate ? 'with-dsr-template' : 'without-dsr-template'}`;

const hasButtonTemplateTag = async (page: Page, hasDsrTemplate: boolean): Promise<boolean> => {
  return await page.evaluate((selector) => {
    return !!document.querySelector(`${selector} template`);
  }, getButtonSelector(hasDsrTemplate));
};

const hasButtonShadowRoot = async (page: Page, hasDsrTemplate: boolean): Promise<boolean> => {
  return await page.evaluate((selector) => {
    return !!document.querySelector(selector).shadowRoot;
  }, getButtonSelector(hasDsrTemplate));
};

const getButtonComputedColor = async (page: Page, hasDsrTemplate: boolean): Promise<string> => {
  return await page.evaluate((selector) => {
    const el = document.querySelector(selector)?.shadowRoot?.querySelector('button');
    return el ? getComputedStyle(el).color : '';
  }, getButtonSelector(hasDsrTemplate));
};

const changeButtonPropAffectingComputedColor = async (page: Page): Promise<void> => {
  await setProperty(await page.$(getButtonSelector(true)), 'variant', 'primary');
  await setProperty(await page.$(getButtonSelector(false)), 'variant', 'primary');
  await waitForStencilLifecycle(page);
};

test.describe('DSR (Declarative Shadow DOM) Ponyfill', () => {
  test('should handle initial, dsr ponyfill and hydration phase', async ({ page }) => {
    await setPageWithContent(page);

    // evaluate what the native behavior of the browser looks like
    expect(await hasButtonTemplateTag(page, false)).toBe(false);
    expect(await hasButtonShadowRoot(page, false)).toBe(false);
    expect(await getButtonComputedColor(page, false)).toBe('');

    expect(await hasButtonTemplateTag(page, true)).toBe(!(await supportsDeclarativeShadowDOM(page)));
    expect(await hasButtonShadowRoot(page, true)).toBe(await supportsDeclarativeShadowDOM(page));
    expect(await getButtonComputedColor(page, true)).toBe(
      (await supportsDeclarativeShadowDOM(page)) ? 'rgb(9, 1, 1)' : ''
    );

    // apply ponyfill for browsers that don't support DSR
    await page.addScriptTag({ content: getDSRPonyfill().replace(/<script>([\s\S]*)<\/script>/, '$1') });

    expect(await hasButtonTemplateTag(page, false)).toBe(false);
    expect(await hasButtonShadowRoot(page, false)).toBe(false);
    expect(await getButtonComputedColor(page, false)).toBe('');

    expect(await hasButtonTemplateTag(page, true)).toBe(false);
    expect(await hasButtonShadowRoot(page, true)).toBe(true);
    expect(await getButtonComputedColor(page, true)).toBe('rgb(9, 1, 1)');

    // initialize hydration phase for Porsche Design System
    await page.addScriptTag({ content: 'porscheDesignSystem.load();' });
    await waitForComponentsReady(page);
    await waitForStencilLifecycle(page);

    expect(await hasButtonTemplateTag(page, false)).toBe(false);
    expect(await hasButtonShadowRoot(page, false)).toBe(true);
    expect(await getButtonComputedColor(page, false)).toBe('rgb(50, 54, 57)');

    expect(await hasButtonTemplateTag(page, true)).toBe(false);
    expect(await hasButtonShadowRoot(page, true)).toBe(true);
    expect(await getButtonComputedColor(page, true)).toBe('rgb(50, 54, 57)');

    // apply a prop change to the button component that results in a color change to confirm hydration
    await changeButtonPropAffectingComputedColor(page);

    expect(await hasButtonTemplateTag(page, false)).toBe(false);
    expect(await hasButtonShadowRoot(page, false)).toBe(true);
    expect(await getButtonComputedColor(page, false)).toBe('rgb(213, 0, 28)');

    expect(await hasButtonTemplateTag(page, true)).toBe(false);
    expect(await hasButtonShadowRoot(page, true)).toBe(true);
    expect(await getButtonComputedColor(page, true)).toBe('rgb(213, 0, 28)');
  });
});
