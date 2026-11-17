import { expect, harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { getOuterHTML, goto } from '../helpers';

const console = require('console');

test.describe('overview', () => {
  test.use({
    expectedConsole: async ({ expectedConsole }, use) =>
      use([...expectedConsole, ...harnessPageConsole['overview-components']]),
  });

  test('overview should work without errors', async ({ page }) => {
    await goto(page, 'overview-components');
  });

  test('should stringify object props correctly', async ({ page }) => {
    await goto(page, 'overview-components');

    const innerHTML = await page.evaluate(() => {
      const app = document.querySelector('#app');
      if (!app) throw new Error('#app not found');
      return app.innerHTML;
    });

    expect(innerHTML).toContain('<p-heading');
    expect(innerHTML).toContain('<my-prefix-p-heading');
    expect(innerHTML).not.toContain('[object Object]');
  });
});

test.fixme('should initialize component deterministically', async ({ page }) => {
  await goto(page, 'core-initializer');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [component1, component2] = await page.locator('p-input-text').all();

  const component1HTML = await getOuterHTML(component1);
  const component2HTML = await getOuterHTML(component2);

  expect(component1HTML).toBe(component2HTML);

  if (component1HTML !== component2HTML) {
    console.log('component1HTML', component1HTML);
    console.log('component2HTML', component2HTML);
  }
});
