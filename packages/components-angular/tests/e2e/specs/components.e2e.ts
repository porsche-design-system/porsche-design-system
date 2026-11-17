import { expect, harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { getOuterHTML, getProperty, goto, waitForComponentsReady } from '../helpers';

const console = require('console');

test.describe('overview', () => {
  test.use({
    expectedConsole: async ({ expectedConsole }, use) =>
      use([...expectedConsole, ...harnessPageConsole['overview-components']]),
  });

  test('overview should work without errors', async ({ page }) => {
    await goto(page, 'overview-components');
  });
});

test.describe('without prefix', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-input-text').length === 2);

    const [component1, component2] = await page.locator('p-input-text').all();

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
  const regularSelector = 'p-input-text';
  const prefixedSelector = `my-prefix-${regularSelector}`;

  test('should initialize angular component', async ({ page }) => {
    await goto(page, 'core-initializer-prefixed');

    const prefixedComponent = page.locator(prefixedSelector);

    expect(await getProperty(prefixedComponent, 'description')).toBe('Some Description');
    expect(await getProperty(prefixedComponent, 'label')).toBe('Some Label');
  });
});

test.describe('Stepper Horizontal states', () => {
  test('should have no console error if navigated between two pages', async ({ page }) => {
    await goto(page, 'stepper-horizontal-navigation-example-start-component');
    await goto(page, 'stepper-horizontal-navigation-example-second-component');
  });
});
