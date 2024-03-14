import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.$('p-link-tile');
const getRoot = (page: Page) => page.$('p-link-tile .root');
const getLink = (page: Page) => page.$('p-link-tile p-link a');

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=';

const initLinkTile = (page: Page, opts?: { compact?: boolean }): Promise<void> => {
  const { compact = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-link-tile href="#" label="Some label" description="Some description" compact="${compact}" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-link-tile>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initLinkTile(page);
  const root = await getRoot(page);

  // await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initLinkTile(page);
  const host = await getHost(page);
  const link = await getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, link);
});
