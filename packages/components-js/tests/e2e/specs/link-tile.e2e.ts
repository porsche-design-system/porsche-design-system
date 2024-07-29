import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const getHost = (page: Page) => page.locator('p-link-tile');

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
test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initLinkTile(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact="true"', async ({ page }) => {
    await initLinkTile(page, { compact: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact responsive', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-link-tile href="#" label="Some label" description="Some description" compact="{ base: true, s: false, l: true }" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-link-tile>`
    );
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initLinkTile(page);
    const host = getHost(page);

    await setProperty(host, 'compact', 'true');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1); // changes the rendered link when compact changes
    expect(status.componentDidUpdate['p-link-tile'], 'componentDidUpdate: p-link-tile').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
