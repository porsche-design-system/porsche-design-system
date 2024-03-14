import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem } from '../helpers';

type InitOpts = {
  withIcon?: boolean;
};

const initTag = (page: Page, props?: InitOpts) => {
  const { withIcon = false } = props || {};
  const attributes = withIcon ? ' icon="car"' : '';

  const content = `<p-tag${attributes}>Some Tag</p-tag>`;

  return setContentWithDesignSystem(page, content);
};
const getSpan = (page: Page) => page.$('p-tag span');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initTag(page);
  // await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree with icon', async ({ page }) => {
  await initTag(page, { withIcon: true });

  // await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
});
