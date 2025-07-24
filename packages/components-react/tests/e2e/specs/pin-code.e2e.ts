import { expect, type Page, test } from '@playwright/test';
import { addEventListener, getEventSummary, getFormDataValue } from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-pin-code');
const getForm = (page: Page) => page.locator('form');
const getInput = (page: Page, n: number) => page.locator(`p-pin-code .wrapper input:nth-child(${n})`);

test.describe('form', () => {
  test('should reset pin-code value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'pin-code-example');
    await waitForComponentsReady(page);
    const name = 'name';
    const host = getHost(page);
    const input1 = getInput(page, 1);

    const form = getForm(page);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await input1.focus();
    await input1.clear();
    await input1.fill('1');

    await expect(input1).toHaveValue('1');

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(input1).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'pin-code-example');
    await waitForComponentsReady(page);

    const name = 'pin-code';
    const value = '1234';
    const form = getForm(page);

    const input1 = getInput(page, 1);
    const input2 = getInput(page, 2);
    const input3 = getInput(page, 3);
    const input4 = getInput(page, 4);

    await input1.fill('1');
    await input2.fill('2');
    await input3.fill('3');
    await input4.fill('4');

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });
});
