import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { getLifecycleStatus, setContentWithDesignSystem, skipInBrowsers, waitForStencilLifecycle } from '../helpers';

skipInBrowsers(['firefox', 'webkit']);

// The React SSR wrapper serializes the props a component got on the server into `data-ssr-props`,
// the patched Stencil runtime applies them before the first render (see patches/@stencil+core+*.patch).
const ssrProps = (props: object): string => `data-ssr-props='${JSON.stringify(props)}'`;

const getHost = (page: Page) => page.locator('p-button').first();
const getStreamedHost = (page: Page) => page.locator('#streamed');

test('should apply serialized props before the first render', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `<p-button ${ssrProps({ variant: 'secondary', icon: 'arrow-right', aria: { 'aria-label': 'Some aria label' } })}>Some label</p-button>`
  );
  const host = getHost(page);

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect(host).toHaveJSProperty('icon', 'arrow-right');
  await expect(host).toHaveJSProperty('aria', { 'aria-label': 'Some aria label' });
  await expect(page.locator('p-button button')).toHaveAttribute('aria-label', 'Some aria label');
  await expect(host).not.toHaveAttribute('data-ssr-props');

  const status = await getLifecycleStatus(page);
  expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);
  expect(status.componentDidUpdate['p-button'], 'componentDidUpdate: p-button').toBe(0);
});

test('should apply serialized props before the first render when the component is already defined', async ({
  page,
}) => {
  await setContentWithDesignSystem(page, '<p-button>Some label</p-button>');
  await page.evaluate(
    (markup) => document.body.insertAdjacentHTML('beforeend', markup),
    `<p-button id="streamed" ${ssrProps({ variant: 'secondary' })}>Streamed label</p-button>`
  );
  await waitForStencilLifecycle(page);
  const host = getStreamedHost(page);

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect(host).not.toHaveAttribute('data-ssr-props');

  const status = await getLifecycleStatus(page);
  expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
  expect(status.componentDidUpdate['p-button'], 'componentDidUpdate: p-button').toBe(0);
});

test('should only apply declared props', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `<p-button ${ssrProps({ variant: 'secondary', innerHTML: '<b>Injected</b>', unknownProp: 'Some value' })}>Some label</p-button>`
  );
  const host = getHost(page);

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect(host).toHaveText('Some label');
  await expect(host).toHaveJSProperty('unknownProp', undefined);
});

test('should ignore invalid serialized props', async ({ page }) => {
  await setContentWithDesignSystem(page, `<p-button data-ssr-props='{"variant":'>Some label</p-button>`);
  const host = getHost(page);

  await expect(host).toHaveJSProperty('variant', 'primary');
  await expect(host).not.toHaveAttribute('data-ssr-props');
});
