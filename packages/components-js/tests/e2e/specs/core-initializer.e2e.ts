import type { ElementHandle } from 'playwright';
import { expect, test } from '@playwright/test';
import { goto } from '../helpers';

test.describe('core-initializer', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const [component1, component2] = await page.$$('p-text-field-wrapper');
    const getOuterHTML = (elHandle: ElementHandle<HTMLElement | SVGElement>) => elHandle.evaluate((el) => el.outerHTML);

    const component1HTML = await getOuterHTML(component1);
    const component2HTML = await getOuterHTML(component2);

    expect(component1HTML).toBe(component2HTML);

    if (component1HTML !== component2HTML) {
      console.log('component1HTML', component1HTML);
      console.log('component2HTML', component2HTML);
    }
  });
});
