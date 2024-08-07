import { type Page, test } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const setContentWithoutTrademark = (page: Page) =>
  setContentWithDesignSystem(page, `<p-marque trademark="false"></p-marque>`);
const setContentWithTrademark = (page: Page) => setContentWithDesignSystem(page, `<p-marque></p-marque>`);
const setContentWithLink = (page: Page) =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-marque id="hostElement" href="about:blank#"></p-marque>
    </div>`
  );

const getHost = (page: Page) => page.locator('p-marque');
const getSource = (page: Page) => page.locator('p-marque source');
const getLink = (page: Page) => page.locator('p-marque a');
const getImage = (page: Page) => page.locator('p-marque img');

const getImageRequest = (page: Page) =>
  page.waitForRequest((request) => request.url().endsWith('.png') || request.url().endsWith('.webp'));

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await setContentWithTrademark(page);
  const image = getImage(page);

  // await expectA11yToMatchSnapshot(page, image);
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await setContentWithLink(page);
  const host = getHost(page);
  const link = getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, link);
});
