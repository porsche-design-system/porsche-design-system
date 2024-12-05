import { Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-flyout');
const getTextarea = (page: Page) => page.locator('p-textarea');
const getNativeTextarea = (page: Page) => page.locator('p-textarea textarea');
const getCheckbox = (page: Page) => page.locator('p-checkbox');
const getForm = (page: Page) => page.locator('form');

const openFlyout = async (page: Page) => {
  await setProperty(getHost(page), 'open', true);
};

test.describe('form', () => {
  test('should reset form component values when reset button is slotted outside the form', async ({ page }) => {
    await goto(page, 'flyout-example-form');
    await waitForComponentsReady(page);

    const newValue = 'some text';

    await openFlyout(page);

    const nativeTextarea = getNativeTextarea(page);
    const textarea = getTextarea(page);
    const checkbox = getCheckbox(page);
    const form = getForm(page);

    await nativeTextarea.fill(newValue);
    await setProperty(checkbox, 'checked', true);

    await expect(textarea).toHaveJSProperty('value', newValue);
    await expect(nativeTextarea).toHaveValue(newValue);
    await expect(checkbox).toHaveJSProperty('checked', true);

    await addEventListener(form, 'reset');
    expect((await getEventSummary(form, 'reset')).counter).toBe(0);

    await page.locator('button[type="reset"]').click();

    await expect(textarea).toHaveJSProperty('value', '');
    await expect(nativeTextarea).toHaveValue('');
    await expect(checkbox).toHaveJSProperty('checked', false);

    expect((await getEventSummary(form, 'reset')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-textarea')).toBe('');
    expect(await getFormDataValue(form, 'some-checkbox')).toBe(null);
  });

  test('should submit form component values when submit button is slotted outside the form', async ({ page }) => {
    await goto(page, 'flyout-example-form');
    await waitForComponentsReady(page);

    const name = 'some-form';
    const newValue = 'some text';

    await openFlyout(page);

    const nativeTextarea = getNativeTextarea(page);
    const textarea = getTextarea(page);
    const checkbox = getCheckbox(page);
    const form = getForm(page);

    await nativeTextarea.fill(newValue);
    await setProperty(checkbox, 'checked', true);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await expect(textarea).toHaveJSProperty('value', newValue);
    await expect(nativeTextarea).toHaveValue(newValue);
    await expect(checkbox).toHaveJSProperty('checked', true);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-checkbox')).toBe('on');
  });
});
