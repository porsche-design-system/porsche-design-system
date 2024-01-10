import type { Page, ElementHandle } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { getDSRPonyfill, getInitialStyles } from '@porsche-design-system/components-js/partials';
import { setProperty, supportsDeclarativeShadowDOM, waitForComponentsReady, waitForStencilLifecycle } from '../utils';

export const setPageWithContent = async (page: Page): Promise<void> => {
  const headPartials = getInitialStyles();

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
    ${headPartials}
  </head>
  <body>
    <p-button>
      <template shadowroot="open" shadowrootmode="open">
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

    <p-button>Some label</p-button>
  </body>
</html>`,
    { waitUntil: 'networkidle' }
  );
};

const getButtons = (page: Page): Promise<[ElementHandle<HTMLElement>, ElementHandle<HTMLElement>]> => {
  return page.$$('p-button') as Promise<[ElementHandle<HTMLElement>, ElementHandle<HTMLElement>]>;
};

const hasTemplateTag = (handle: ElementHandle<HTMLElement>): Promise<boolean> => {
  return handle.evaluate((el) => !!el.querySelector('template'));
};

const hasShadowRoot = (handle: ElementHandle<HTMLElement>): Promise<boolean> => {
  return handle.evaluate((el) => !!el.shadowRoot);
};

const getComputedColor = (handle: ElementHandle<HTMLElement>): Promise<string> => {
  return handle.evaluate((el) => {
    const buttonEl = el.shadowRoot?.querySelector('button');
    return buttonEl ? getComputedStyle(buttonEl).color : '';
  });
};

const applyPonyfill = async (page: Page): Promise<void> => {
  await page.addScriptTag({ content: getDSRPonyfill().replace(/<script>([\s\S]*)<\/script>/, '$1') });
  await page.waitForFunction(() => !document.querySelector('template')); // verify ponyfill has executed
};

const initPorscheDesignSystem = async (page: Page): Promise<void> => {
  await page.addScriptTag({ content: 'porscheDesignSystem.load();' });

  await page.waitForSelector('html.hydrated');
  const amount = await waitForComponentsReady(page); // very unreliable with lazy loading
  expect(amount).toBe(2);
};

test('should handle initial phase correctly', async ({ page }) => {
  await setPageWithContent(page);
  const [buttonWithTemplate, button] = await getButtons(page);

  // evaluate what the native behavior of the browser looks like
  const hasDSRSupport = await supportsDeclarativeShadowDOM(page);

  expect(await hasTemplateTag(buttonWithTemplate)).toBe(!hasDSRSupport);
  expect(await hasShadowRoot(buttonWithTemplate)).toBe(hasDSRSupport);
  expect(await getComputedColor(buttonWithTemplate)).toBe(hasDSRSupport ? 'rgb(9, 1, 1)' : '');

  expect(await hasTemplateTag(button)).toBe(false);
  expect(await hasShadowRoot(button)).toBe(false);
  expect(await getComputedColor(button)).toBe('');
});

test('should handle dsr ponyfill phase correctly', async ({ page }) => {
  await setPageWithContent(page);
  const [buttonWithTemplate, button] = await getButtons(page);

  await applyPonyfill(page);

  expect(await hasTemplateTag(buttonWithTemplate)).toBe(false);
  expect(await hasShadowRoot(buttonWithTemplate)).toBe(true);
  expect(await getComputedColor(buttonWithTemplate)).toBe('rgb(9, 1, 1)');

  expect(await hasTemplateTag(button)).toBe(false);
  expect(await hasShadowRoot(button)).toBe(false);
  expect(await getComputedColor(button)).toBe('');
});

test('should handle hydration phase after ponyfill correctly', async ({ page }) => {
  await setPageWithContent(page);
  const [buttonWithTemplate, button] = await getButtons(page);

  await applyPonyfill(page);
  await initPorscheDesignSystem(page);

  expect(await hasTemplateTag(buttonWithTemplate)).toBe(false);
  expect(await hasShadowRoot(buttonWithTemplate)).toBe(true);
  expect(await getComputedColor(buttonWithTemplate)).toBe('rgb(251, 252, 255)');

  expect(await hasTemplateTag(button)).toBe(false);
  expect(await hasShadowRoot(button)).toBe(true);
  expect(await getComputedColor(button)).toBe('rgb(251, 252, 255)');
});

test('should handle prop change after ponyfill and hydration correctly', async ({ page }) => {
  await setPageWithContent(page);
  const [buttonWithTemplate, button] = await getButtons(page);

  await applyPonyfill(page);
  await initPorscheDesignSystem(page);

  // apply a prop change to the button component that results in a color change to confirm hydration
  await setProperty(buttonWithTemplate, 'variant', 'primary');
  await setProperty(button, 'variant', 'primary');
  await waitForStencilLifecycle(page);

  expect(await hasTemplateTag(buttonWithTemplate)).toBe(false);
  expect(await hasShadowRoot(buttonWithTemplate)).toBe(true);
  expect(await getComputedColor(buttonWithTemplate)).toBe('rgb(251, 252, 255)');

  expect(await hasTemplateTag(button)).toBe(false);
  expect(await hasShadowRoot(button)).toBe(true);
  expect(await getComputedColor(button)).toBe('rgb(251, 252, 255)');
});
