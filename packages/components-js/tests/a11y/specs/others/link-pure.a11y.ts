import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-link-pure');
const getLink = (page: Page) => page.locator('p-link-pure a');
const getIcon = (page: Page) => page.locator('p-link-pure p-icon svg');
const getSpan = (page: Page) => page.locator('p-link-pure span').first();

const initLinkPure = (page: Page, opts?: { useSlottedAnchor?: boolean; withSubline?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false, withSubline = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link-pure onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''}>
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-link-pure>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initLinkPure(page);
  const link = getLink(page);
  const icon = getIcon(page);

  // await expectA11yToMatchSnapshot(page, link);
  // await expectA11yToMatchSnapshot(page, icon, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if label is hidden', async ({ page }) => {
  await initLinkPure(page);
  const host = getHost(page);
  const link = getLink(page);
  await setProperty(host, 'hide-label', 'true');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, link);
});

test.fixme('should expose correct accessibility tree description if subline property is set', async ({ page }) => {
  await initLinkPure(page, { withSubline: true });
  const link = getLink(page);

  // await expectA11yToMatchSnapshot(page, link);
});

test('should not expose accessibility tree description with slotted anchor and subline', async ({ page }) => {
  await initLinkPure(page, { useSlottedAnchor: true, withSubline: true });
  const span = getSpan(page);

  const snapshot = await page.accessibility.snapshot({
    root: await span.elementHandle(),
  });

  expect(snapshot).toBeNull();
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initLinkPure(page);
  const host = getHost(page);
  const link = getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, link);
});
