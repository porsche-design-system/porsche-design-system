import { test, expect } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver, waitForComponentsReady } from '../helpers';

/*
This test is used to verify the fix for issue #3364
For more details, visit: https://github.com/porsche-design-system/porsche-design-system/issues/3364
*/
test('should not throw console errors when components are dynamically rendered', async ({ page }) => {
  initConsoleObserver(page);
  await goto(page, '/lifecycle-overlapping');
  await waitForComponentsReady(page);

  const button = page.getByRole('button', { name: 'Set Active' });
  await button.click();

  expect(getConsoleErrorsAmount()).toBe(0);
});
