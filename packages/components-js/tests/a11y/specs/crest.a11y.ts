import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const setContent = (page: Page) => setContentWithDesignSystem(page, `<p-crest></p-crest>`);
const setContentWithLink = (page: Page) =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-crest id="hostElement" href="about:blank#"></p-crest>
    </div>`
  );

const getHost = (page: Page) => page.$('p-crest');
const getLink = (page: Page) => page.$('p-crest a');
const getImage = (page: Page) => page.$('p-crest img');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await setContent(page);
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
