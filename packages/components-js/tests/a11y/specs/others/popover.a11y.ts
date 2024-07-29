import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import type { PopoverDirection } from '@porsche-design-system/components/dist/types/bundle';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-popover');
const getButton = (page: Page) => page.locator('p-popover button');

const togglePopover = async (page: Page): Promise<void> => {
  const button = await getButton(page);
  await button.click();
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withStrong?: boolean;
  withButtonOutside?: boolean;
};
const initPopover = (page: Page, opts?: InitOptions): Promise<void> => {
  const { direction = 'bottom', withLink = false, withStrong = false, withButtonOutside = false } = opts || {};

  const linkMarkup = withLink ? '<a href="#">Some Link</a>' : '';
  const strongMarkup = withStrong ? '<strong>strong</strong>' : '';
  const buttonMarkup = withButtonOutside ? '<button>Some Button</button>' : '';

  return setContentWithDesignSystem(
    page,
    `
<p-popover direction="${direction}">
  ${linkMarkup}
  ${strongMarkup}
  Some Popover Content
</p-popover>
${buttonMarkup}`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initPopover(page);

  // await expectA11yToMatchSnapshot(page, await getButton());
});

test.fixme('should expose correct accessibility tree when aria property is changed', async ({ page }) => {
  await initPopover(page);
  const host = getHost(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, await getButton());
});

test.fixme('should expose correct accessibility tree when popover is opened', async ({ page }) => {
  await initPopover(page);
  await togglePopover(page);

  // await expectA11yToMatchSnapshot(page, await getButton());
});
