import { expect, Page, test } from '@playwright/test';
import { setProperty } from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-multi-select');

test.describe('form', () => {
  test('should reset multi-select value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'multi-select-example');
    await waitForComponentsReady(page);
    const host = getHost(page);
    const newValue = ['b'];
    await setProperty(host, 'value', newValue);
    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();
    await expect(host).toHaveJSProperty('value', []);
  });

  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    // TODO fix multi-select and implement test case
  });
});
