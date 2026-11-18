import { test } from '@porsche-design-system/testing/playwright';
import { goto, waitForComponentsReady } from '../helpers';

/*
This test is used to verify the fix for issue #3364
For more details, visit: https://github.com/porsche-design-system/porsche-design-system/issues/3364
*/
test('should not throw console errors when components are dynamically rendered', async ({ page }) => {
  await goto(page, '/lifecycle-overlapping');
  await waitForComponentsReady(page);

  const button = page.getByRole('button', { name: 'Set Active' });
  await button.click();
});
