import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementIndex,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { devices, ElementHandle, Page } from 'puppeteer';

describe('select-wrapper fake-dropdown', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getFakeSelect = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelect = (customElement?: string) =>
    selectNode(page, `${customElement ? customElement + ' >>> ' : ''}p-select-wrapper select`);
  const getLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getFakeOptionList = (customElement?: string) =>
    selectNode(
      page,
      `${customElement ? customElement + ' >>> ' : ''}p-select-wrapper >>> .p-select-wrapper__fake-option-list`
    );
  const getFakeOptionInPosOne = () =>
    selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(1)');
  const getFakeOptionInPosTwo = (customElement?: string) =>
    selectNode(
      page,
      `${customElement ? customElement + ' >>> ' : ''}p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)`
    );

  const initSelect = (): Promise<void> => {
    return setContentWithDesignSystem(
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
  };

  describe('hover state', () => {
    it('should change box-shadow color when fake select is hovered', async () => {
      await initSelect();

      const fakeSelect = await getFakeSelect();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await fakeSelect.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await initSelect();

      const fakeSelect = await getFakeSelect();
      const labelText = await getLabel();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });
  });

  describe('custom drop down', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b" disabled>Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const fakeOptionList = await getFakeOptionList();
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
      expect(await getElementIndex(fakeOptionList, '[aria-selected=true]')).toBe(0);
      expect(await getElementIndex(fakeOptionList, '[aria-disabled=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
    });

    it('should render with optgroups', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label">
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

      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
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
      expect(await getElementIndex(fakeOptionList, '[aria-selected=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
      expect(numberOfOptgroups).toEqual(numberOfFakeOptgroups);
    });

    it('should render with mix of options and optgroup', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label">
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

      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
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
      await initSelect();
      const fakeOptionList = await getFakeOptionList();
      expect(fakeOptionList).toBeNull();
    });

    it('should not render if touch support is detected and native is set to false', async () => {
      await page.emulate(devices['iPhone X']);
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" native="false">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );
      const fakeOptionList = await getFakeOptionList();
      expect(fakeOptionList).toBeNull();
    });

    it('should not render if native prop is set to true', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" native="true">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );
      const fakeOptionList = await getFakeOptionList();
      expect(fakeOptionList).toBeNull();
    });

    it('should be visible if select is clicked and hidden if clicked outside', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-text>Some text</p-text>
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelect();
      const text = await selectNode(page, 'p-text');
      const fakeOptionList = await getFakeOptionList();
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
      await initSelect();
      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
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
      await initSelect();
      const select = await getSelect();
      const fakeOptionList = async () => await getFakeOptionList();
      const fakeOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');

      await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = true));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOption)).toContain('p-select-wrapper__fake-option--disabled');
      expect(await getElementIndex(await fakeOptionList(), '.p-select-wrapper__fake-option--disabled')).toBe(1);
    });

    it('should synchronize fake option and native select if selected attribute is set programmatically', async () => {
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
      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
      const fakeOptionA = await getFakeOptionInPosOne();
      const fakeOptionB = await getFakeOptionInPosTwo();
      const selectedClass = 'p-select-wrapper__fake-option--selected';

      expect(await getCssClasses(fakeOptionA)).toContain(selectedClass);
      expect(await getElementIndex(fakeOptionList, `.${selectedClass}`)).toBe(0);

      await select.evaluate((el: HTMLSelectElement) => el.options[1].setAttribute('selected', 'selected'));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOptionA)).not.toContain(selectedClass);
      expect(await getCssClasses(fakeOptionB)).toContain(selectedClass);
      expect(await getElementIndex(fakeOptionList, `.${selectedClass}`)).toBe(1);
    });

    it('should not add selected state to fake option item if added to native select programmatically as JS prop', async () => {
      /**
       * This test is for Browser specific behaviour which does not reflect the "selected" property as attribute and will therefore not be observed by the MutationObserver
       */
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
      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
      const fakeOptionA = await getFakeOptionInPosOne();
      const fakeOptionB = await getFakeOptionInPosTwo();
      const selectedClass = 'p-select-wrapper__fake-option--selected';

      expect(await getCssClasses(fakeOptionA)).toContain(selectedClass);
      expect(await getElementIndex(fakeOptionList, `.${selectedClass}`)).toBe(0);

      await select.evaluate((el: HTMLSelectElement) => (el.options[0].selected = false));
      await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOptionA)).toContain(selectedClass);
      expect(await getCssClasses(fakeOptionB)).not.toContain(selectedClass);
      expect(await getElementIndex(fakeOptionList, `.${selectedClass}`)).toBe(0);
    });

    it('should hide/show fake option item if hidden attribute is added/removed to native select programmatically', async () => {
      await initSelect();
      const select = await getSelect();
      const fakeOptionList = await getFakeOptionList();
      const fakeOption = await getFakeOptionInPosTwo();

      await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = true));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOption)).toContain('p-select-wrapper__fake-option--hidden');
      expect(await getElementIndex(fakeOptionList, '.p-select-wrapper__fake-option--hidden')).toBe(1);

      await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = false));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOption)).not.toContain('p-select-wrapper__fake-option--hidden');
    });

    it('should not render initial hidden option fields', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label">
          <select name="some-name">
            <option value hidden></option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );
      const fakeOption = await getFakeOptionInPosOne();

      expect(await getCssClasses(fakeOption)).toContain('p-select-wrapper__fake-option--hidden');
    });

    it('should not throw error with long option list and the same item is selected and disabled', async () => {
      const consoleErrors: string[] = [];

      page.on('pageerror', function (error) {
        consoleErrors.push(error.toString());
      });

      await setContentWithDesignSystem(
        page,
        `
         <p-select-wrapper label="Some label">
           <select name="some-name">
             <option value="default" disabled selected>Bitte wählen Sie Ihr Land</option>
             <option value="AF">Afghanistan</option>
             <option value="AX">Åland Islands</option>
             <option value="AL">Albania</option>
             <option value="DZ">Algeria</option>
             <option value="AS">American Samoa</option>
             <option value="AD">Andorra</option>
             <option value="AO">Angola</option>
             <option value="AI">Anguilla</option>
             <option value="AQ">Antarctica</option>
             <option value="AG">Antigua and Barbuda</option>
             <option value="AR">Argentina</option>
             <option value="AM">Armenia</option>
             <option value="AW">Aruba</option>
             <option value="AU">Australia</option>
             <option value="AT">Austria</option
          </select>
        </p-select-wrapper>
        `
      );

      const select = await getSelect();

      await select.click();

      await waitForStencilLifecycle(page);

      expect(consoleErrors.length).toBe(0, 'get errorsAmount after click');

      await page.evaluate(() => {
        const script = document.createElement('script');
        script.innerText = "throw new Error('I am an error');";
        document.body.appendChild(script);
      });

      expect(consoleErrors.length).toBe(1, 'get errorsAmount after custom error');
    });

    describe('dropdown position', () => {
      it('should set direction to up', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label" dropdown-direction="up">
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b" disabled>Option B</option>
              <option value="c">Option C</option>
            </select>
          </p-select-wrapper>`
        );

        const fakeOptionListDirectionUp = await selectNode(
          page,
          'p-select-wrapper >>> .p-select-wrapper__fake-option-list--direction-up'
        );

        expect(fakeOptionListDirectionUp).not.toBeNull();
      });

      it('should set direction to down', async () => {
        await page.setViewport({
          width: 800,
          height: 600,
        });
        await setContentWithDesignSystem(
          page,
          `
      <div style="height: 500px;"></div>
      <p-select-wrapper label="Some label" dropdown-direction="down">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
        );

        const fakeOptionListDirectionDown = await selectNode(
          page,
          'p-select-wrapper >>> .p-select-wrapper__fake-option-list--direction-down'
        );

        expect(fakeOptionListDirectionDown).not.toBeNull();
      });

      it('should auto position to top if bottom space is less than dropdown height', async () => {
        await page.setViewport({
          width: 800,
          height: 600,
        });
        await setContentWithDesignSystem(
          page,
          `<div style="height: 400px;"></div>
          <p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b" disabled>Option B</option>
              <option value="c">Option C</option>
              <option value="d">Option D</option>
              <option value="e">Option E</option>
              <option value="f">Option F</option>
              <option value="g">Option G</option>
              <option value="h">Option H</option>
            </select>
          </p-select-wrapper>`
        );

        const select = await getSelect();
        await select.click();
        await waitForStencilLifecycle(page);

        const fakeOptionListDirectionUp = await selectNode(
          page,
          'p-select-wrapper >>> .p-select-wrapper__fake-option-list--direction-up'
        );

        expect(fakeOptionListDirectionUp).not.toBeNull();
      });
    });

    describe('keyboard and click events', () => {
      const getActiveDescendant = async () => await getAttribute(await getFakeOptionList(), 'aria-activedescendant');
      const getOpacity = async () => await getElementStyle(await getFakeOptionList(), 'opacity');
      const selectHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('select'));
      const getSelectedIndex = () =>
        page.evaluate(() => {
          return document.querySelector('select').selectedIndex;
        });
      const getHighlightedFakeOption = async () =>
        await getElementIndex(await getFakeOptionList(), '.p-select-wrapper__fake-option--highlighted');
      const getSelectedFakeOption = async (customElement?: string) =>
        await getElementIndex(await getFakeOptionList(customElement), '.p-select-wrapper__fake-option--selected');

      it('should highlight first position on arrow down', async () => {
        await initSelect();
        const select = await getSelect();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected fake option');

        await page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
        expect(await getElementIndex(await getFakeOptionList(), '[aria-selected=true]')).toBe(
          1,
          'for aria selected index'
        );
        expect(await getSelectedIndex()).toBe(1, 'for selected index');

        expect(calls).toBe(1, 'for calls');
        expect(await getActiveDescendant()).toEqual(
          `option-${await getSelectedFakeOption()}`,
          ' for active descendant'
        );
      });

      it('should have the correct aria-expanded value if open/closed', async () => {
        await initSelect();

        const host = await getHost();
        const fakeInput = await getFakeOptionList();

        expect(await getAttribute(fakeInput, 'aria-expanded')).toBe('false', 'for aria-expanded attribute');

        await host.click();
        await waitForStencilLifecycle(page);

        expect(await getAttribute(fakeInput, 'aria-expanded')).toBe('true', 'for aria-expanded attribute');
      });

      it('should show aria-selected attribute on selected fake option on click', async () => {
        await initSelect();

        const select = await getSelect();
        const fakeOptionA = await getFakeOptionInPosOne();
        const fakeOptionB = await getFakeOptionInPosTwo();

        expect(await getAttribute(fakeOptionA, 'aria-selected')).toBe(
          'true',
          'for aria-selected attribute of Option A'
        );
        expect(await getAttribute(fakeOptionB, 'aria-selected')).toBeNull('for aria-selected attribute of Option B');

        await select.click();
        await fakeOptionB.click();
        await waitForStencilLifecycle(page);

        expect(await getAttribute(fakeOptionA, 'aria-selected')).toBeNull(
          'for aria-selected attribute of Option A after click'
        );
        expect(await getAttribute(fakeOptionB, 'aria-selected')).toBe(
          'true',
          'for aria-selected attribute of Option B after click'
        );
      });

      it('should skip disabled option on arrow down', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b" disabled>B Option</option>
              <option value="c">C Option</option>
            </select>
          </p-select-wrapper>`
        );

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      });

      it('should skip disabled option on arrow up', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b" disabled>B Option</option>
              <option value="c" selected>C Option</option>
            </select>
          </p-select-wrapper>`
        );
        await waitForStencilLifecycle(page);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        await page.keyboard.press('ArrowUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      });

      it('should highlight correct position on multiple key actions', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b" disabled>B Option</option>
              <option value="c">C Option</option>
              <option value="d">D Option</option>
              <option value="e">E Option</option>
            </select>
          </p-select-wrapper>`
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(3, 'for highlighted fake option');

        await page.keyboard.press('ArrowUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      });

      it('should open fake select with spacebar', async () => {
        await initSelect();
        const select = await getSelect();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('0', 'for opacity');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('1', 'for opacity');
        expect(calls).toBe(0, 'for calls');
      });

      it('should select correct option with spacebar', async () => {
        await initSelect();
        const select = await getSelect();

        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('0', 'for opacity');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(await getOpacity()).toBe('1', 'for opacity');

        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        expect(await getSelectedIndex()).toBe(1, 'for selected index');
        expect(calls).toBe(1, 'for calls');
      });

      it('should change selected option on ArrowLeft while list is hidden', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(2, 'for selected index');
        expect(calls).toBe(1, 'for calls');
      });

      it('should change selected option on ArrowRight while list is hidden', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(1, 'for selected index');
        expect(calls).toBe(1, 'for calls');
      });

      it('should change selected option on ArrowLeft while list is open and should close the list', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(2, 'for selected index');
        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(calls).toBe(1, 'for calls');
      });

      it('should change selected option on ArrowRight while list is open and should close the list', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(1, 'for selected index');
        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(calls).toBe(1, 'for calls');
      });

      it('should not select option on Escape', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake eoption');

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected index');
        expect(await getOpacity()).toBe('0', 'for opacity');
      });

      it('should not select option on PageDown while list is hidden', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected index');
      });

      it('should not select option on PageUp while list is hidden', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected index');
      });

      it('should highlight and select last option on PageDown while list is visible', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected index');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(2, 'for selected index');
      });

      it('should highlight and select first option on PageUp while list is visible', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b">B Option</option>
              <option value="c" selected>C Option</option>
            </select>
          </p-select-wrapper>`
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(2, 'for selected index');

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(0, 'for selected index');
      });

      it('should select option through keyboard search', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b">B Option</option>
              <option value="c">C Option</option>
            </select>
          </p-select-wrapper>`
        );
        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('c');
        await page.waitForTimeout(120);

        expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(2, 'for selected index');
      });

      it('should open/close fake select on mouseclick', async () => {
        await initSelect();
        const select = await getSelect();

        await select.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');

        await select.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      });

      it('should select second option on mouseclick', async () => {
        await initSelect();
        const select = await getSelect();
        const fakeOptionB = await getFakeOptionInPosTwo();

        await select.click();
        await fakeOptionB.click();
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
        expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
        expect(await getSelectedIndex()).toBe(1, 'for selected index');
      });

      it('should select second option on mouseclick when used in custom element', async () => {
        const initCustomElement = `
<script type="text/javascript">
  window.customElements.define(
    'my-custom-element',
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = \`
<p-select-wrapper>
  <select>
    <option value='Option A'>Option A</option>
    <option value='Option B'>Option B</option>
    <option value='Option C'>Option C</option>
  </select>
</p-select-wrapper>
\`; }});
</script>`;

        await setContentWithDesignSystem(
          page,
          `
${initCustomElement}
<my-custom-element></my-custom-element>
`
        );
        const customElementName = 'my-custom-element';
        const select = await getSelect(customElementName);

        const fakeOptionPosTwo = await getFakeOptionInPosTwo(customElementName);
        const posFakeOption = await fakeOptionPosTwo.boundingBox();

        expect(await getSelectedFakeOption(customElementName)).toBe(0, 'for selected fake option');

        await select.click();
        await waitForStencilLifecycle(page);
        await page.mouse.click(posFakeOption.x + 2, posFakeOption.y + 2);
        await waitForStencilLifecycle(page);

        expect(await getSelectedFakeOption(customElementName)).toBe(1, 'for selected fake option');
      });

      it('should close fakeSelect on Tab', async () => {
        await initSelect();

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('1', 'for opacity');

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        expect(await getOpacity()).toBe('0', 'for opacity');
        expect(await selectHasFocus()).toBe(false);
      });

      it('should remove and re-attach events', async () => {
        await initSelect();
        const select = await getSelect();

        let mouseDownEventCounter = 0;
        let keyDownEventCounter = 0;
        await addEventListener(select, 'mousedown', () => mouseDownEventCounter++);
        await addEventListener(select, 'keydown', () => keyDownEventCounter++);

        // Remove and re-attach component to check if events are duplicated / fire at all
        await reattachElement(page, 'p-select-wrapper');

        await select.click();
        await waitForStencilLifecycle(page);

        expect(mouseDownEventCounter).toBe(1);

        await select.click();
        await waitForStencilLifecycle(page);

        expect(mouseDownEventCounter).toBe(2);

        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowDown');

        expect(keyDownEventCounter).toBe(2);
      });
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).toBe(1, 'componentDidLoad: p-select-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text'); // label
      expect(status.componentDidLoad['p-icon']).toBe(2, 'componentDidLoad: p-icon'); // arrow down and checkmark

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips if second option is clicked', async () => {
      await initSelect();
      const select = await getSelect();
      const secondOption = await getFakeOptionInPosTwo();

      await select.click();
      await waitForStencilLifecycle(page);
      const initStatus = await getLifecycleStatus(page);

      expect(initStatus.componentDidLoad['p-icon']).toBe(2, 'componentDidLoad: p-icon');
      expect(initStatus.componentDidLoad.all).toBe(4, 'componentDidLoad: all');

      expect(initStatus.componentDidUpdate['p-select-wrapper']).toBe(1, 'componentDidUpdate: p-select-wrapper');
      expect(initStatus.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');

      await secondOption.click();
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-icon']).toBe(3, 'componentDidLoad: p-icon'); // new icon on selected option
      expect(status.componentDidUpdate['p-select-wrapper']).toBe(2, 'componentDidUpdate: p-select-wrapper');

      expect(status.componentDidLoad.all).toBe(5, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(2, 'componentDidUpdate: all');
    });
  });
});
