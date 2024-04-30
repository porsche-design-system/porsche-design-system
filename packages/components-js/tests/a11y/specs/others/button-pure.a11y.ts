import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.$('p-button-pure');
const getButton = (page: Page) => page.$('p-button-pure button');

const initButtonPure = (
  page: Page,
  opts?: { isLoading?: boolean; isDisabled?: boolean; withSubline?: boolean }
): Promise<void> => {
  const { isLoading = false, isDisabled = false, withSubline = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button-pure ${loading} ${disabled}>
      Some label
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-button-pure>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initButtonPure(page);
  const button = await getButton(page);

  // // await expectA11yToMatchSnapshot(page, button);
});

test.fixme('should expose correct accessibility name when hide-label prop is set', async ({ page }) => {
  await initButtonPure(page);
  const host = await getHost(page);
  const button = await getButton(page);
  await setProperty(host, 'hide-label', 'true');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button);
});

test.fixme('should expose accessibility tree description with slotted subline', async ({ page }) => {
  await initButtonPure(page, { withSubline: true });
  const button = await getButton(page);

  // await expectA11yToMatchSnapshot(page, button);
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initButtonPure(page);
  const host = await getHost(page);
  const button = await getButton(page);
  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
    'aria-expanded': true,
    'aria-haspopup': true,
  });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Initial' });

  await setProperty(host, 'aria', {
    'aria-pressed': true,
  });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' }); // need to split the test in 2, because aria-expanded and aria-pressed are invalid if used simultaneously. Also aria-pressed removes the accessible name.
});
