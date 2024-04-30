import { type ElementHandle, type Page, test, expect } from '@playwright/test';
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

const getHost = (page: Page) => page.$('p-marque');
const getSource = (page: Page) => page.$('p-marque source');
const getLink = (page: Page) => page.$('p-marque a');
const getImage = (page: Page) => page.$('p-marque img');

const getImageRequest = (page: Page) =>
  page.waitForRequest((request) => request.url().endsWith('.png') || request.url().endsWith('.webp'));

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await setContentWithTrademark(page);
  const image = await getImage(page);

  // await expectA11yToMatchSnapshot(page, image);
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await setContentWithLink(page);
  const host = await getHost(page);
  const link = await getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, link);
});
