import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.$('p-button');
const getButton = (page: Page) => page.$('p-button button');

const initButton = (page: Page, opts?: { isLoading?: boolean; isDisabled?: boolean }): Promise<void> => {
  const { isLoading = false, isDisabled = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button ${loading} ${disabled}>
      Some label
    </p-button>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initButton(page);
  const button = await getButton(page);

  // await expectA11yToMatchSnapshot(page, button);
});

test.fixme('should expose correct accessibility name when hide-label prop is set', async ({ page }) => {
  await initButton(page);
  const host = await getHost(page);
  const button = await getButton(page);

  await setProperty(host, 'hide-label', 'true');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button);
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initButton(page);
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
