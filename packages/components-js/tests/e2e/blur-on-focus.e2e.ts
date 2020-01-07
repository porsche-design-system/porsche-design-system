import { newE2EPage } from '@stencil/core/testing';

describe('blur on focus', () => {
  function getFocusedElementTagName(page) {
    return page.evaluate(() => {
      return document.activeElement.tagName;
    });
  }

  it('should blur element after click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
    `);
    const pButton = await page.find('p-button');
    const button = await page.find('button');
    const span = await page.find('span');
    await pButton.click();
    expect(await getFocusedElementTagName(page)).toBe('BODY');
    await button.click();
    expect(await getFocusedElementTagName(page)).toBe('BODY');
    await span.click();
    expect(await getFocusedElementTagName(page)).toBe('BODY');
  });

  it('should not blur input elements', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    const input = await page.find('input');
    const select = await page.find('select');
    const textarea = await page.find('textarea');
    await input.click();
    expect(await getFocusedElementTagName(page)).toBe('INPUT');
    await select.click();
    expect(await getFocusedElementTagName(page)).toBe('SELECT');
    await textarea.click();
    expect(await getFocusedElementTagName(page)).toBe('TEXTAREA');
  });

  it('should not blur on keyboard navigation', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('P-BUTTON');
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('BUTTON');
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('SPAN');
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('INPUT');
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('SELECT');
    await page.keyboard.press('Tab');
    expect(await getFocusedElementTagName(page)).toBe('TEXTAREA');
  });

  it('should not blur on programmatic focus set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <p-button>Some label</p-button>
        <button>Other label</button>
    `);

    const pButton = await page.find('p-button');
    const button = await page.find('button');

    pButton.focus();
    expect(await getFocusedElementTagName(page)).toBe('P-BUTTON');
    button.focus();
    expect(await getFocusedElementTagName(page)).toBe('BUTTON');
  });

  it('should not blur if exclude class is set to element or parent', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <p-button class="p-re-enable-focus-on-click">Some label</p-button>
        <p-button>Other label</p-button>
        <div class="p-re-enable-focus-on-click">
          <button>One more label</button>
        </div>
        <div>
          <button>And another label</button>
        </div>
    `);
    const pButtonExcluded = await page.find('p-button.p-re-enable-focus-on-click');
    const pButton = await page.find('p-button:not(.p-re-enable-focus-on-click)');
    const buttonExcluded = await page.find('.p-re-enable-focus-on-click button');
    const button = await page.find(':not(.p-re-enable-focus-on-click) > button');

    await pButtonExcluded.click();
    expect(await getFocusedElementTagName(page)).toBe('P-BUTTON');
    await pButton.click();
    expect(await getFocusedElementTagName(page)).toBe('BODY');
    await buttonExcluded.click();
    expect(await getFocusedElementTagName(page)).toBe('BUTTON');
    await button.click();
    expect(await getFocusedElementTagName(page)).toBe('BODY');
  });
});
