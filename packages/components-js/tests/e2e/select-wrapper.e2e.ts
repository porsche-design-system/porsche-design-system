import {
  getAttributeFromHandle,
  getClassFromHandle, getElementPosition, getElementStyle, getInnerHTMLFromShadowRoot,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks, waitForInnerHTMLChange, waitForSelector
} from './helpers';

const iPhone = {
  viewport: {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  },
  userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
};

describe('select-wrapper', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const el = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode('p-select-wrapper');
    const getLabelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');

    expect(getLabelText).toBeNull();

    await page.evaluate(el => el.setAttribute('label', 'Some label'), selectComponent);
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode('p-select-wrapper');
    const getMessage = () => selectNode('p-select-wrapper >>> .p-select-wrapper__message'); // has to be a function because it only exists after first setAttribute
    const select = await selectNode('select');

    expect(await getMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', ''), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
    expect(labelText).toBeDefined();

    async function hasSelectFocus() {
      return await page.evaluate(() => {
        const selectElement = document.querySelector('select');
        return document.activeElement === selectElement;
      });
    }

    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();

    expect(await hasSelectFocus()).toBe(true);
  });

  it('should disable fake select when select is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const fakeSelect = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    const select = await selectNode('select');

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = true);
    await waitForSelector(fakeSelect, 'p-select-wrapper__fake-select--disabled');

    expect(await getClassFromHandle(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = false);
    await waitForSelector(fakeSelect, 'p-select-wrapper__fake-select--disabled', {isGone: true});

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
  });

  describe('hover state', () => {

    const getFakeSelect = () => selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');

    it('should change box-shadow color when fake select is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await fakeSelect.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', true)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', true)).not.toBe(initialBoxShadow);
    });
  });

  describe('fake drop down', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const fakeOptionDisabled = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option--disabled');
      const fakeOptionSelected = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option--selected');
      const activeDescendant = await getAttributeFromHandle(fakeOptionList, 'aria-activedescendant');
      const selectedDescendantId = await getAttributeFromHandle(fakeOptionSelected, 'id');

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptionDisabled).not.toBeNull();
      expect(await getElementPosition(fakeOptionList,'[aria-selected=true]')).toBe(0);
      expect(await getElementPosition(fakeOptionList,'[aria-disabled=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
    });

    it('should not render if touch support is detected', async () => {
      await page.emulate(iPhone);
      await setContentWithDesignSystem(`
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      `);
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      expect(fakeOptionList).toBeNull();
      await jestPuppeteer.resetPage();
    });

    it('should be visible if select is clicked and hidden if clicked outside', async () => {
      await setContentWithDesignSystem(`
      <p-text>Some text</p-text>
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await selectNode('select');
      const text = await selectNode('p-text');
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const getOpacity = () => getElementStyle(fakeOptionList, 'opacity');
      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');

      await text.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
    });

    it('should add fake option item if added to native select programmatically', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await selectNode('select');
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const numberOfOptions = await select.evaluate((el:HTMLElement) => {
        return el.childElementCount;
      });
      const numberOfFakeOptions = await fakeOptionList.evaluate((el:HTMLElement) => {
        return el.childElementCount;
      });
      expect(fakeOptionList).not.toBeNull();
      expect(numberOfFakeOptions).toEqual(numberOfOptions);

      await select.evaluate((el: HTMLSelectElement) => {
        const option = document.createElement('option');
        option.text = 'Test';
        el.add(option,0);
      });
      const text = await getInnerHTMLFromShadowRoot('p-select-wrapper >>> .p-select-wrapper__fake-option:first-child');
      expect(text).toContain('Test');
      expect(numberOfFakeOptions + 1).toEqual(numberOfOptions + 1);
    });

    it('should handle keyboard and click events', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c" disabled>Option C</option>
          <option value="d">Option D</option>
          <option value="e">Option E</option>
        </select>
      </p-select-wrapper>
    `);

      const select = await selectNode('select');
      const fakeOptionList = async () => await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const fakeOptionInPosOne = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');
      const activeDescendant = async () => await getAttributeFromHandle(await fakeOptionList(), 'aria-activedescendant');
      const getOpacity = async () => await getElementStyle(await fakeOptionList(), 'opacity');
      const selectHasFocus = () => page.evaluate(() =>
        document.activeElement === document.querySelector('select')
      )

      // initial status of highlight and selected fake option
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow down and enter
      await select.focus();
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(1);

      await select.press('Enter');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(1);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(1);
      expect(await getElementPosition(await fakeOptionList(),'[aria-selected=true]')).toBe(1);
      expect(await activeDescendant()).toEqual(`option-${await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')}`);

      // 1 x arrow down and 1x arrow up should jump over disabled fake option
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(3);
      await select.press('ArrowUp');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(1);

      // 2 x arrow up
      await select.press('ArrowUp');
      await select.press('ArrowUp');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);

      // 1 x arrow down
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);

      // Space
      await select.press(' ');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow left while list is hidden
      await select.press('ArrowLeft');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(4);

      // 1 x arrow right while list is hidden
      await select.press('ArrowRight');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow left while list is visible
      await select.press(' ');
      await select.press('ArrowLeft');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(4);

      // 1 x arrow right while list is visible
      await select.press(' ');
      await select.press('ArrowRight');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow down + ESC
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(1);
      await select.press('Escape');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getOpacity()).toBe('0');

      // PageDown while list is hidden
      await select.press('PageDown');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);

      // PageDown while list is visible
      await select.press(' ');
      await select.press('PageDown');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(0);
      await select.press(' ');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(4);
      await select.press('Escape');
      await waitForEventCallbacks();

      // PageUp while list is hidden
      await select.press('PageUp');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(4);

      // PageUp while list is visible
      await select.press(' ');
      await select.press('PageUp');
      await waitForEventCallbacks();
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(4);
      await select.press('Enter');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');

      // Click on select while list is hidden
      await select.click();
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');

      // Click on select while list is visible
      await select.click();
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');

      // Click on select and click on 2nd option
      await select.click();
      await waitForEventCallbacks();
      await fakeOptionInPosOne.click();
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--highlighted')).toBe(1);
      expect(await getElementPosition(await fakeOptionList(),'.p-select-wrapper__fake-option--selected')).toBe(1);

      // Tab while list is visible
      await select.press(' ');
      await select.press('Tab');
      await waitForEventCallbacks();
      await waitForSelector(await fakeOptionList(), 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await selectHasFocus()).toBe(false);
    });
  });
});
