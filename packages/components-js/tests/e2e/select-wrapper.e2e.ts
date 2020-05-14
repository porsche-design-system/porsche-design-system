import {
  getAttributeFromHandle,
  getBoxShadow,
  getClassFromHandle, getInnerHTMLFromShadowRoot,
  selectNode,
  setContentWithDesignSystem, waitForInnerHTMLChange, waitForSelector
} from './helpers';
import * as devices from "puppeteer/DeviceDescriptors";

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
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await fakeSelect.hover();

      expect(await getBoxShadow(fakeSelect, {waitForTransition: true})).not.toBe(initialBoxShadow);
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
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await labelText.hover();

      expect(await getBoxShadow(fakeSelect, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });

  fdescribe('fake drop down', () => {
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
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      expect(fakeOptionList).not.toBeNull();
    });

    it('should not render if touch support is detected', async () => {
      await page.emulate(devices['iPhone X']);
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

    it('should be visible if select is clicked', async () => {
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
      const getOpacity = async () => await fakeOptionList.evaluate((el: HTMLElement) => {
        const style = getComputedStyle(el);
        return style.opacity;
      });
      expect(await getOpacity()).toBe('0');

      await select.click();
      expect(await getOpacity()).toBe('1');
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
  });
});
