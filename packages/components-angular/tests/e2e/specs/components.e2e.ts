import { test, expect } from '@playwright/test';
import {
  getConsoleErrorsAmount,
  getElementProp,
  getOuterHTML,
  goto,
  initConsoleObserver,
  waitForComponentsReady,
} from '../helpers';

const console = require('console');

test('overview should work without errors', async ({ page }) => {
  initConsoleObserver(page);
  await goto(page, 'overview');

  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

test.describe('without prefix', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const [component1, component2] = await page.$$('p-text-field-wrapper');

    const component1HTML = await getOuterHTML(component1);
    const component2HTML = await getOuterHTML(component2);

    expect(component1HTML).toBe(component2HTML);

    if (component1HTML !== component2HTML) {
      console.log('component1HTML', component1HTML);
      console.log('component2HTML', component2HTML);
    }
  });
});

test.describe('with prefix', () => {
  const regularSelector = 'p-text-field-wrapper';
  const prefixedSelector = `my-prefix-${regularSelector}`;

  test('should initialize angular component', async ({ page }) => {
    await goto(page, 'core-initializer-prefixed');

    const prefixedComponent = await page.$(prefixedSelector);

    expect(await getElementProp(prefixedComponent, 'description')).toBe('Some Description');
    expect(await getElementProp(prefixedComponent, 'label')).toBe('Some Label');
  });
});

test.describe('Form Wrapper with slotted input', () => {
  test('should have no console error if input type is bound', async ({ page }) => {
    initConsoleObserver(page);
    await goto(page, 'form-wrapper-binding');

    await page.locator('select[name="route"]').selectOption('overview');
    await waitForComponentsReady(page);

    // back and forth navigation seems to be necessary to reproduce a bug
    await page.locator('select[name="route"]').selectOption('form-wrapper-binding');

    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});

test.describe('Stepper Horizontal states', () => {
  test('should have no console error if navigated between two pages', async ({ page }) => {
    initConsoleObserver(page);
    await goto(page, 'stepper-horizontal-navigation-example-start-component');
    expect(getConsoleErrorsAmount()).toBe(0);

    await goto(page, 'stepper-horizontal-navigation-example-second-component');
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});
