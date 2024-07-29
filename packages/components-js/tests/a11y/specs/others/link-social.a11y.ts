import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const initLinkSocial = (page: Page, opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link-social onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''} icon="logo-facebook">
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
    </p-link-social>`
  );
};

const getHost = (page: Page) => page.locator('p-link-social');
const getLink = (page: Page) => page.locator('p-link-social a');
const getIcon = (page: Page) => page.locator('p-link-social p-icon svg');

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initLinkSocial(page);
  const link = getLink(page);
  const icon = await getIcon(page);

  // await expectA11yToMatchSnapshot(page, link);
  // await expectA11yToMatchSnapshot(page, icon, { interestingOnly: false });
});

test.fixme('should expose correct accessibility name if label is hidden', async ({ page }) => {
  await initLinkSocial(page);
  const host = getHost(page);
  const link = getLink(page);
  await setProperty(host, 'hide-label', 'true');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, link);
});
