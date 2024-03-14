import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const getHost = (page: Page) => page.$('p-button-tile');
const getRoot = (page: Page) => page.$('p-button-tile .root');
const getButton = (page: Page) => page.$('p-button-tile p-button button');

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=';

const initButtonTile = (page: Page, opts?: { compact?: boolean }): Promise<void> => {
  const { compact = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-button-tile label="Some label" description="Some description" compact="${compact}" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-button-tile>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initButtonTile(page);
  const root = await getRoot(page);

  // await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initButtonTile(page);
  const host = await getHost(page);
  const button = await getButton(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
    'aria-expanded': true,
    'aria-haspopup': true,
  });

  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, button, { message: 'initial aria attributes' });

  await setProperty(host, 'aria', {
    'aria-pressed': true,
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, button, { message: 'aria-pressed attribute' });
});
