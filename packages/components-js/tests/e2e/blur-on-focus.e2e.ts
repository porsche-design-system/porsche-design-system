import {getActiveElementTagName, selectNode, setContentWithDesignSystem} from "./helpers";

describe('blur on focus', () => {
  it('should blur element after click', async () => {
    await setContentWithDesignSystem(`
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
    `);
    const pButton = await selectNode('p-button');
    const button = await selectNode('button');
    const span = await selectNode('span');
    await pButton.click();
    expect(await getActiveElementTagName()).toBe('BODY');
    await button.click();
    expect(await getActiveElementTagName()).toBe('BODY');
    await span.click();
    expect(await getActiveElementTagName()).toBe('BODY');
  });

  it('should not blur input elements', async () => {
    await setContentWithDesignSystem(`
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    const input = await selectNode('input');
    const select = await selectNode('select');
    const textarea = await selectNode('textarea');
    await input.click();
    expect(await getActiveElementTagName()).toBe('INPUT');
    await select.click();
    expect(await getActiveElementTagName()).toBe('SELECT');
    await textarea.click();
    expect(await getActiveElementTagName()).toBe('TEXTAREA');
  });

  it('should not blur on keyboard navigation', async () => {
    await setContentWithDesignSystem(`
        <p-button>Some label</p-button>
        <button>Other label</button>
        <span tabindex="0">One more label</span>
        <input type="text">Some label</input>
        <select><option>Other label</option></select>
        <textarea>One more label</span>
    `);
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('P-BUTTON');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('BUTTON');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('SPAN');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('INPUT');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('SELECT');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName()).toBe('TEXTAREA');
  });

  it('should not blur on programmatic focus set', async () => {
    await setContentWithDesignSystem(`
        <p-button>Some label</p-button>
        <button>Other label</button>
    `);

    const pButton = await selectNode('p-button');
    const button = await selectNode('button');

    await pButton.focus();
    expect(await getActiveElementTagName()).toBe('P-BUTTON');
    await button.focus();
    expect(await getActiveElementTagName()).toBe('BUTTON');
  });

  it('should not blur if exclude class is set to element or parent', async () => {
    await page.reload(); // reload fixes flaky test 🤷‍♂️
    await setContentWithDesignSystem(`
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
    const pButtonExcluded = await selectNode(`p-button${className}`);
    const pButton = await selectNode(`p-button:not(${className})`);
    const buttonExcluded = await selectNode(`${className} button`);
    const button = await selectNode(`:not(${className}) > button`);

    await pButtonExcluded.click();
    expect(await getActiveElementTagName()).toBe('P-BUTTON');
    await pButton.click();
    expect(await getActiveElementTagName()).toBe('BODY');
    await buttonExcluded.click();
    expect(await getActiveElementTagName()).toBe('BUTTON');
    await button.click();
    expect(await getActiveElementTagName()).toBe('BODY');
  });
});
