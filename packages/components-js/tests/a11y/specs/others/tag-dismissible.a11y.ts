import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

type InitOpts = {
  withLabel?: boolean;
};

const initTagDismissible = (page: Page, props?: InitOpts) => {
  const { withLabel = false } = props || {};
  const attributes = withLabel ? ' label="Some label"' : '';

  const content = `<p-tag-dismissible${attributes}>Some Tag</p-tag-dismissible>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-tag-dismissible');
const getButton = (page: Page) => page.locator('p-tag-dismissible button');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initTagDismissible(page);
  // await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree with label', async ({ page }) => {
  await initTagDismissible(page, { withLabel: true });
  // await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initTagDismissible(page, { withLabel: true });
  const host = getHost(page);
  await setProperty(host, 'aria', { 'aria-label': 'Some aria-label' });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
});
