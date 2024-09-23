import { expect, Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-checkbox');
const getForm = (page: Page) => page.locator('form');

test('should include name & value in FormData submit', async ({ page }) => {
  await goto(page, 'checkbox-example');
  expect(await waitForComponentsReady(page)).toBe(2); // p-checkbox and p-text
  const host = getHost(page);
  const form = getForm(page);
  const testValue = 'test';
  await setProperty(host, 'value', testValue);
  await setProperty(host, 'checked', true);
  await expect(host).toHaveJSProperty('value', testValue);

  await addEventListener(form, 'submit');
  expect((await getEventSummary(form, 'submit')).counter).toBe(0);

  await page.locator('button[type="submit"]').click();

  expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
});
