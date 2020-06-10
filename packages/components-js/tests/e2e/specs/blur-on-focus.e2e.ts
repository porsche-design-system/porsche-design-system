import {getActiveElementTagName, selectNode, setContentWithDesignSystem} from "../helpers";
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('blur on focus', () => {
  let page: Page;
  beforeEach(async () => page = await getBrowser().newPage());
  afterEach(async () => await page.close());

  it('should blur element after click', async () => {
    await setContentWithDesignSystem(page, `
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
    `);
    const pButton = await selectNode(page, 'p-button');
    const button = await selectNode(page, 'button');
    const span = await selectNode(page, 'span');
    await pButton.click();
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await button.click();
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await span.click();
    expect(await getActiveElementTagName(page)).toBe('BODY');
  });

  it('should not blur input elements', async () => {
    await setContentWithDesignSystem(page, `
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    const input = await selectNode(page, 'input');
    const select = await selectNode(page, 'select');
    const textarea = await selectNode(page, 'textarea');
    await input.click();
    expect(await getActiveElementTagName(page)).toBe('INPUT');
    await select.click();
    expect(await getActiveElementTagName(page)).toBe('SELECT');
    await textarea.click();
    expect(await getActiveElementTagName(page)).toBe('TEXTAREA');
  });

  it('should not blur on keyboard navigation', async () => {
    await setContentWithDesignSystem(page, `
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BUTTON');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('SPAN');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('INPUT');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('SELECT');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('TEXTAREA');
  });

  it('should not blur on programmatic focus set', async () => {
    await setContentWithDesignSystem(page, `
        <p-button>Some label</p-button>
        <button>Other label</button>
    `);

    const pButton = await selectNode(page, 'p-button');
    const button = await selectNode(page, 'button');

    await pButton.focus();
    expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
    await button.focus();
    expect(await getActiveElementTagName(page)).toBe('BUTTON');
  });

  it('should not blur if exclude class is set to element or parent', async () => {
    await setContentWithDesignSystem(page, `
        <p-button class="p-re-enable-focus-on-click">Some label</p-button>
        <p-button>Other label</p-button>
        <div class="p-re-enable-focus-on-click">
          <button>One more label</button>
        </div>
        <div>
          <button>And another label</button>
        </div>
    `);

    const className = '.p-re-enable-focus-on-click';
    const pButtonExcluded = await selectNode(page, `p-button${className}`);
    const pButton = await selectNode(page, `p-button:not(${className})`);
    const buttonExcluded = await selectNode(page, `${className} button`);
    const button = await selectNode(page, `:not(${className}) > button`);

    await pButtonExcluded.click();
    expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
    await pButton.click();
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await buttonExcluded.click();
    expect(await getActiveElementTagName(page)).toBe('BUTTON');
    await button.click();
    expect(await getActiveElementTagName(page)).toBe('BODY');
  });
});
