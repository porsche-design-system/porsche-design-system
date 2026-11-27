import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { getLifecycleStatus, setContentWithDesignSystem, skipInBrowsers, waitForStencilLifecycle } from '../helpers';

skipInBrowsers(['firefox', 'webkit']);

// The React SSR wrapper serializes the props a component got on the server into `data-ssr-props`,
// the patched Stencil runtime applies them before the first render (see patches/@stencil+core+*.patch).
const ssrProps = (props: object): string => `data-ssr-props='${JSON.stringify(props)}'`;

// The wrapper renders every component with a declarative shadow root, which only the parser of a document attaches.
const serverRendered = (tagName: string, attributes: string, children = 'Some label'): string =>
  `<${tagName} ${attributes}><template shadowrootmode="open"></template>${children}</${tagName}>`;

const getHost = (page: Page) => page.locator('p-button').first();
const getInsertedHost = (page: Page) => page.locator('#inserted');

test('should apply serialized props before the first render', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    serverRendered(
      'p-button',
      ssrProps({ variant: 'secondary', icon: 'arrow-right', aria: { 'aria-label': 'Some aria label' } })
    )
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
  // stands in for the parser of the document, `setHTMLUnsafe()` attaches declarative shadow roots as well
  await page.evaluate(
    (markup) => document.body.appendChild(document.createElement('div')).setHTMLUnsafe(markup),
    serverRendered('p-button', `id="inserted" ${ssrProps({ variant: 'secondary' })}`)
  );
  await waitForStencilLifecycle(page);
  const host = getInsertedHost(page);

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect(host).not.toHaveAttribute('data-ssr-props');

  const status = await getLifecycleStatus(page);
  expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
  expect(status.componentDidUpdate['p-button'], 'componentDidUpdate: p-button').toBe(0);
});

test.describe('markup a script inserted', () => {
  test.use({
    expectedConsole: async ({ expectedConsole }, use) =>
      // the browser itself points out that `insertAdjacentHTML()` doesn't attach the declarative shadow root
      use([...expectedConsole, /declarative Shadow DOM is not being parsed/]),
  });

  test('should ignore serialized props', async ({ page }) => {
    await setContentWithDesignSystem(page, '<p-button>Some label</p-button>');
    // e.g. sanitized user content: a sanitizer keeps `data-*` attributes, but can't check the props in them
    await page.evaluate(
      (markup) => document.body.insertAdjacentHTML('beforeend', markup),
      serverRendered('p-button', `id="inserted" data-ssr ${ssrProps({ variant: 'secondary' })}`)
    );
    await waitForStencilLifecycle(page);
    const host = getInsertedHost(page);

    await expect(host).toHaveJSProperty('variant', 'primary');
    await expect(host).not.toHaveAttribute('data-ssr-props');
  });
});

test('should not apply a script URL', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    [
      `id="script-url" ${ssrProps({ href: 'JavaScript:alert(1)', size: 'inherit' })}`,
      `id="obfuscated-script-url" ${ssrProps({ href: ' java\tscript:alert(1)' })}`,
      `id="url" ${ssrProps({ href: 'https://porsche.com' })}`,
    ]
      .map((attributes) => serverRendered('p-wordmark', attributes, ''))
      .join('')
  );

  await expect(page.locator('#script-url')).toHaveJSProperty('href', undefined);
  await expect(page.locator('#script-url')).toHaveJSProperty('size', 'inherit');
  await expect(page.locator('#obfuscated-script-url')).toHaveJSProperty('href', undefined);
  await expect(page.locator('#url')).toHaveJSProperty('href', 'https://porsche.com');
  await expect(page.locator('#url a')).toHaveAttribute('href', 'https://porsche.com');
});

test('should only apply declared props', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    serverRendered(
      'p-button',
      ssrProps({ variant: 'secondary', innerHTML: '<b>Injected</b>', unknownProp: 'Some value' })
    )
  );
  const host = getHost(page);

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect(host).toHaveText('Some label');
  await expect(host).toHaveJSProperty('unknownProp', undefined);
});

test('should ignore invalid serialized props', async ({ page }) => {
  await setContentWithDesignSystem(page, serverRendered('p-button', `data-ssr-props='{"variant":'`));
  const host = getHost(page);

  await expect(host).toHaveJSProperty('variant', 'primary');
  await expect(host).not.toHaveAttribute('data-ssr-props');
});
