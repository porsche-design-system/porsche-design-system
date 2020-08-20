import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementPosition,
  getElementStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { devices, Page } from 'puppeteer';

fdescribe('select-wrapper fake-select', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectFakeInput = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getSelectOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');

  describe('hover state', () => {
    it('should change box-shadow color when fake select is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
      );

      const fakeSelect = await getSelectFakeInput();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await fakeSelect.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const fakeSelect = await getSelectFakeInput();
      const labelText = await getSelectLabel();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });
  });

  describe('fake drop down', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
      );

      const fakeOptionList = await getSelectOptionList();
      const fakeOptionDisabled = await selectNode(
        page,
        'p-select-wrapper >>> .p-select-wrapper__fake-option--disabled'
      );
      const fakeOptionSelected = await selectNode(
        page,
        'p-select-wrapper >>> .p-select-wrapper__fake-option--selected'
      );
      const activeDescendant = await getAttribute(fakeOptionList, 'aria-activedescendant');
      const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptionDisabled).not.toBeNull();
      expect(await getElementPosition(fakeOptionList, '[aria-selected=true]')).toBe(0);
      expect(await getElementPosition(fakeOptionList, '[aria-disabled=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
    });

    it('should render with optgroups', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <optgroup label="Some optgroup label 1">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </optgroup>
          <optgroup label="Some optgroup label 1">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </optgroup>
        </select>
      </p-select-wrapper>`
      );

      const select = await getSelectRealInput();
      const fakeOptionList = await getSelectOptionList();
      const fakeOptgroup = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-optgroup-label');
      const fakeOptionSelected = await selectNode(
        page,
        'p-select-wrapper >>> .p-select-wrapper__fake-option--selected'
      );
      const activeDescendant = await getAttribute(fakeOptionList, 'aria-activedescendant');
      const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

      const numberOfOptgroups = await select.evaluate((el: HTMLElement) => {
        return el.querySelectorAll('optgroup').length;
      });
      const numberOfFakeOptgroups = await fakeOptionList.evaluate((el: HTMLElement) => {
        return el.querySelectorAll('.p-select-wrapper__fake-optgroup-label').length;
      });

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptgroup).not.toBeNull();
      expect(await getElementPosition(fakeOptionList, '[aria-selected=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
      expect(numberOfOptgroups).toEqual(numberOfFakeOptgroups);
    });

    it('should render with mix of options and optgroup', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <optgroup label="Some optgroup label 2">
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </optgroup>
        </select>
      </p-select-wrapper>`
      );

      const select = await getSelectRealInput();
      const fakeOptionList = await getSelectOptionList();
      const fakeOptgroup = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-optgroup-label');

      const numberOfOptgroups = await select.evaluate((el: HTMLElement) => {
        return el.querySelectorAll('optgroup').length;
      });
      const numberOfFakeOptgroups = await fakeOptionList.evaluate((el: HTMLElement) => {
        return el.querySelectorAll('.p-select-wrapper__fake-optgroup-label').length;
      });

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptgroup).not.toBeNull();
      expect(numberOfOptgroups).toEqual(numberOfFakeOptgroups);
    });

    it('should not render if touch support is detected', async () => {
      await page.emulate(devices['iPhone X']);
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      `
      );
      const fakeOptionList = await getSelectOptionList();
      expect(fakeOptionList).toBeNull();
    });

    it('should be visible if select is clicked and hidden if clicked outside', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text>Some text</p-text>
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
      );
      const select = await getSelectRealInput();
      const text = await selectNode(page, 'p-text');
      const fakeOptionList = await getSelectOptionList();
      const getOpacity = () => getElementStyle(fakeOptionList, 'opacity');

      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      await text.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
    });

    it('should add fake option item if added to native select programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
      );
      const select = await getSelectRealInput();
      const fakeOptionList = await getSelectOptionList();
      const getNumberOfOptions = async () =>
        await select.evaluate((el: HTMLElement) => {
          return el.childElementCount;
        });
      const getNumberOfFakeOptions = async () =>
        await fakeOptionList.evaluate((el: HTMLElement) => {
          return el.childElementCount;
        });
      expect(fakeOptionList).not.toBeNull();
      expect(await getNumberOfFakeOptions()).toEqual(await getNumberOfOptions());

      await select.evaluate((el: HTMLSelectElement) => {
        const option = document.createElement('option');
        option.text = 'Test';
        el.add(option, 0);
      });
      const text = await getProperty(
        await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:first-child'),
        'innerHTML'
      );
      expect(text).toContain('Test');
      await waitForStencilLifecycle(page);
      expect(await getNumberOfOptions()).toEqual(await getNumberOfFakeOptions());
    });

    it('should add/remove disabled state to fake option item if added/removed to native select programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
      );
      const select = await getSelectRealInput();
      const fakeOptionList = async () => await getSelectOptionList();
      const fakeOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');

      await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = true));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOption)).toContain('p-select-wrapper__fake-option--disabled');
      expect(await getElementPosition(await fakeOptionList(), '.p-select-wrapper__fake-option--disabled')).toBe(1);
    });

    describe('keyboard and click events', () => {
      const getFakeOptionInPosOne = async () =>
        await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');
      const getActiveDescendant = async () => await getAttribute(await getSelectOptionList(), 'aria-activedescendant');
      const getOpacity = async () => await getElementStyle(await getSelectOptionList(), 'opacity');
      const selectHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('select'));
      const getSelectedIndex = () =>
        page.evaluate(() => {
          return document.querySelector('select').selectedIndex;
        });
      const getHighlightedFakeOption = async () =>
        await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted');
      const getSelectedFakeOption = async () =>
        await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected');

      it('should highlight first position on arrow down', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">A Option</option>
          <option value="b">B Option</option>
          <option value="c">C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(0);

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1');
        expect(await getHighlightedFakeOption()).toBe(1);
        expect(await getSelectedIndex()).toBe(0);

        await page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0');
        expect(await getHighlightedFakeOption()).toBe(1);
        expect(await getSelectedFakeOption()).toBe(1);
        expect(await getElementPosition(await getSelectOptionList(), '[aria-selected=true]')).toBe(1);
        expect(await getSelectedIndex()).toBe(1);

        expect(calls).toBe(1);
        expect(await getActiveDescendant()).toEqual(`option-${await getSelectedFakeOption()}`);
      });

      it('should skip disabled option on arrow down', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">A Option</option>
          <option value="b" disabled>B Option</option>
          <option value="c">C Option</option>
        </select>
      </p-select-wrapper>
    `
        );

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(
          await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')
        ).toBe(2);
      });

      it('should skip disabled option on arrow up', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" disabled>B Option</option>
          <option value="c" selected>C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await waitForStencilLifecycle(page);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        await page.keyboard.press('ArrowUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
      });

      it('should skip disabled option on arrow up', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" disabled>B Option</option>
          <option value="c" selected>C Option</option>
        </select>
      </p-select-wrapper>
    `
        );

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        await page.keyboard.press('ArrowUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
      });

      it('should highlight correct position on multiple key actions', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" disabled>B Option</option>
          <option value="c" >C Option</option>
          <option value="d" >D Option</option>
          <option value="e" >E Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1');
        expect(await getHighlightedFakeOption()).toBe(3);

        await page.keyboard.press('ArrowUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2);
      });

      it('should open fake select with spacebar', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('0');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('1');
        expect(calls).toBe(0);
      });

      it('should select correct option with spacebar', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('0');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('1');

        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        expect(await getHighlightedFakeOption()).toBe(1);

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(calls).toBe(1);
        expect(await getSelectedIndex()).toBe(1);
      });

      it('should change selected option on ArrowLeft while list is hidden', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2);
        expect(await getSelectedFakeOption()).toBe(2);
        expect(await getSelectedIndex()).toBe(2);
        expect(calls).toBe(1);
      });

      it('should change selected option on ArrowRight while list is hidden', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(1);
        expect(await getSelectedFakeOption()).toBe(1);
        expect(await getSelectedIndex()).toBe(1);
        expect(calls).toBe(1);
      });

      it('should change selected option on ArrowLeft while list is open', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2);
        expect(await getSelectedFakeOption()).toBe(2);
        expect(await getSelectedIndex()).toBe(2);
        expect(calls).toBe(1);
      });

      it('should change selected option on ArrowRight while list is open', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(1);
        expect(await getSelectedFakeOption()).toBe(1);
        expect(await getSelectedIndex()).toBe(1);
        expect(calls).toBe(1);
      });

      it('should not select option on Escape', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        expect(await getHighlightedFakeOption()).toBe(1);

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(0);
        expect(await getSelectedIndex()).toBe(0);
        expect(await getOpacity()).toBe('0');
      });

      it('should not select option on PageDown while list is hidden', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(0);
        expect(await getSelectedIndex()).toBe(0);
      });

      it('should not select option on PageUp while list is hidden', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(0);
        expect(await getSelectedIndex()).toBe(0);
      });

      it('should select last option on PageDown while list is visible', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2);
        expect(await getSelectedFakeOption()).toBe(0);
        expect(await getSelectedIndex()).toBe(0);

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2);
        expect(await getSelectedFakeOption()).toBe(2);
        expect(await getSelectedIndex()).toBe(2);
      });

      it('should select first option on PageUp while list is visible', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" selected>C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(2);
        expect(await getSelectedIndex()).toBe(2);

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0);
        expect(await getSelectedFakeOption()).toBe(0);
        expect(await getSelectedIndex()).toBe(0);
      });

      it('should select option through keyboard search', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('c');
        await page.waitFor(120);

        expect(await getHighlightedFakeOption()).toBe(2);
        expect(await getSelectedFakeOption()).toBe(2);
        expect(await getSelectedIndex()).toBe(2);
      });

      it('should select open/close fake select on mouseclick', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();

        await select.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1');
        expect(await getHighlightedFakeOption()).toBe(0);

        await select.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0');
        expect(await getHighlightedFakeOption()).toBe(0);
      });

      it('should select second option on mouseclick', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );
        const select = await getSelectRealInput();
        const fakeOptionInPosOne = await getFakeOptionInPosOne();

        await select.click();
        await fakeOptionInPosOne.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0');
        expect(await getHighlightedFakeOption()).toBe(1);
        expect(await getSelectedFakeOption()).toBe(1);
        expect(await getSelectedIndex()).toBe(1);
      });

      it('should close fakeSelect on Tab', async () => {
        await setContentWithDesignSystem(
          page,
          `
      <p-select-wrapper label="Some label">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b" >B Option</option>
          <option value="c" >C Option</option>
        </select>
      </p-select-wrapper>
    `
        );

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1');

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0');
        expect(await selectHasFocus()).toBe(false);
      });
    });
  });
});
