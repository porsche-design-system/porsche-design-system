import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementIndex,
  getElementPositions,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  getShadowRoot,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { devices, Page } from 'puppeteer';

describe('select-wrapper dropdown', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getSelectIcon = () => selectNode(page, 'p-select-wrapper >>> .icon');
  const getLabelText = () => selectNode(page, 'p-select-wrapper >>> .label__text');

  const dropdownSelector = 'p-select-wrapper >>> p-select-wrapper-dropdown';
  const highlightedClass = 'option--highlighted';
  const selectedClass = 'option--selected';
  const disabledClass = 'option--disabled';
  const hiddenClass = 'option--hidden';

  const getDropdown = () => selectNode(page, dropdownSelector);
  const getDropdownShadowRoot = async () => getShadowRoot(await getDropdown());
  const getDropdownOption1 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(1)`);
  const getDropdownOption2 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(2)`);
  const getDropdownOption4 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(4)`);
  const getDisabledDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${disabledClass}`);
  const getSelectedDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${selectedClass}`);
  const getDropdownOptgroup = () => selectNode(page, `${dropdownSelector} >>> .optgroup`);
  const getDropdownCheckmarkIcon = () => selectNode(page, `${dropdownSelector} >>> .icon`);

  const getDropdownAriaActiveDescendant = async () => getAttribute(await getDropdown(), 'aria-activedescendant');
  const getSelectedDropdownOptionId = async () => await getAttribute(await getSelectedDropdownOption(), 'id');

  const getDropdownOpacity = async () => await getElementStyle(await getDropdown(), 'opacity');
  const selectHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('select'));
  const getSelectedIndex = async () => getProperty(await getSelect(), 'selectedIndex');
  const getSelectedDropdownOptionIndex = async () =>
    await getElementIndex(await getDropdownShadowRoot(), `.${selectedClass}`);
  const getHiddenDropdownOptionIndex = async () =>
    await getElementIndex(await getDropdownShadowRoot(), `.${hiddenClass}`);
  const getHighlightedDropdownOptionIndex = async () =>
    await getElementIndex(await getDropdownShadowRoot(), `.${highlightedClass}`);
  const getAriaSelectedTrueDropdownOptionIndex = async () =>
    await getElementIndex(await getDropdownShadowRoot(), '[aria-selected=true]');
  const getAriaDisabledTrueDropdownOptionIndex = async () =>
    await getElementIndex(await getDropdownShadowRoot(), '[aria-disabled=true]');

  const getAmountOfOptions = async () => (await getSelect()).evaluate((el) => el.childElementCount);
  const getAmountOfDropdownOptions = async () => (await getDropdownShadowRoot()).evaluate((el) => el.childElementCount);

  const getAmountOfOptgroups = async () => (await getSelect()).evaluate((el) => el.querySelectorAll('optgroup').length);
  const getAmountOfDropdownOptgroups = async () =>
    (await getDropdownShadowRoot()).evaluate((el) => el.querySelectorAll('.optgroup').length);

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

    const disabledDropdownOption = await getDisabledDropdownOption();

    expect(disabledDropdownOption).not.toBeNull();
    expect(await getAriaSelectedTrueDropdownOptionIndex()).toBe(0);
    expect(await getAriaDisabledTrueDropdownOptionIndex()).toBe(1);
    expect(await getDropdownAriaActiveDescendant()).toEqual(await getSelectedDropdownOptionId());
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

    const dropdownShadowRoot = await getDropdownShadowRoot();
    const dropdownOptgroup = await getDropdownOptgroup();

    expect(dropdownOptgroup).not.toBeNull();
    expect(await getElementIndex(dropdownShadowRoot, '[aria-selected=true]')).toBe(1);
    expect(await getDropdownAriaActiveDescendant()).toEqual(await getSelectedDropdownOptionId());
    expect(await getAmountOfDropdownOptgroups()).toEqual(await getAmountOfOptgroups());
  });

  it('should render with a mix of options and optgroup', async () => {
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

    const dropdownOptgroup = await getDropdownOptgroup();

    expect(dropdownOptgroup).not.toBeNull();
    expect(await getAmountOfDropdownOptgroups()).toEqual(await getAmountOfOptgroups());
  });

  it('should not render dropdown if touch support is detected', async () => {
    await page.emulate(devices['iPhone X']);
    await initSelect();
    const dropdown = await getDropdown();
    expect(dropdown).toBeNull();
  });

  it('should not render dropdown if touch support is detected and native is set to false', async () => {
    await page.emulate(devices['iPhone X']);
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" native="false">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );
    const dropdown = await getDropdown();
    expect(dropdown).toBeNull();
  });

  it('should not render if native prop is set to true', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" native="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );
    const dropdown = await getDropdown();
    expect(dropdown).toBeNull();
  });

  it('should disable select when select is disabled programmatically', async () => {
    await initSelect();
    const select = await getSelect();

    const getSelectCursorStyle = () => getElementStyle(select, 'cursor');

    expect(await getSelectCursorStyle())
      .withContext('initially')
      .toBe('pointer');

    await setProperty(select, 'disabled', true);
    await waitForStencilLifecycle(page);

    expect(await getSelectCursorStyle())
      .withContext('when disabled = true')
      .toBe('not-allowed');

    await setProperty(select, 'disabled', false);
    await waitForStencilLifecycle(page);

    expect(await getSelectCursorStyle())
      .withContext('when disabled = false')
      .toBe('pointer');
  });

  it('should be visible if select is clicked and hidden again when clicked outside', async () => {
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
      </p-select-wrapper>`
    );
    const select = await getSelect();
    const text = await selectNode(page, 'p-text');
    const dropdown = await getDropdown();
    const getOpacity = () => getElementStyle(dropdown, 'opacity');

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

  it('should add custom option if added to native select programmatically', async () => {
    await initSelect();
    const select = await getSelect();

    expect(await getAmountOfDropdownOptions()).toEqual(await getAmountOfOptions());

    await select.evaluate((el: HTMLSelectElement) => {
      const option = document.createElement('option');
      option.text = 'Test';
      el.add(option, 0);
    });
    await waitForStencilLifecycle(page);

    const dropdownOption1Text = await getProperty(await getDropdownOption1(), 'innerHTML');
    expect(dropdownOption1Text).toContain('Test');
    expect(await getAmountOfDropdownOptions()).toEqual(await getAmountOfOptions());
  });

  it('should observe selected property changes of native option if added programmatically', async () => {
    await initSelect();
    const select = await getSelect();

    await select.evaluate((el: HTMLSelectElement) => {
      const option = document.createElement('option');
      option.text = 'Test';
      el.add(option);
      el.options[3].selected = true;
    });
    await waitForStencilLifecycle(page);

    const dropdownOption4 = await getDropdownOption4();

    expect(await getCssClasses(dropdownOption4)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(3);
  });

  it('should add/remove disabled state to custom option item if added/removed to native select programmatically', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownShadowRoot = await getDropdownShadowRoot();
    const dropdownOption2 = await getDropdownOption2();

    await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption2)).toContain(disabledClass);
    expect(await getElementIndex(dropdownShadowRoot, `.${disabledClass}`)).toBe(1);
  });

  it('should synchronize custom option and native select if selected attribute is set programmatically', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();

    expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(0);

    await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
    expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(1);
  });

  it('should synchronize custom option and native select if selected value property is changed programmatically', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();

    expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(0);

    await setProperty(select, 'value', 'b');
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
    expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(1);
  });

  it('should synchronize custom option and native select if selectedIndex property is changed programmatically', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();

    expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(0);

    await setProperty(select, 'selectedIndex', 1);
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
    expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(1);
  });

  it('should add selected state to custom option item if selected property of option is set', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();

    expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(0);

    await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
    expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
    expect(await getSelectedDropdownOptionIndex()).toBe(1);
  });

  it('should hide/show custom option item if hidden attribute is added/removed to native select programmatically', async () => {
    await initSelect();
    const select = await getSelect();
    const dropdownOption2 = await getDropdownOption2();

    await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption2)).toContain(hiddenClass);
    expect(await getHiddenDropdownOptionIndex()).toBe(1);

    await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(dropdownOption2)).not.toContain(hiddenClass);
  });

  it('should not render initial hidden option fields', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value hidden></option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );
    const dropdownOption1 = await getDropdownOption1();

    expect(await getCssClasses(dropdownOption1)).toContain(hiddenClass);
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
      </p-select-wrapper>`
    );

    const select = await getSelect();
    await select.click();
    await waitForStencilLifecycle(page);

    expect(consoleErrors.length).withContext('get errorsAmount after click').toBe(0);

    await page.evaluate(() => {
      const script = document.createElement('script');
      script.innerText = "throw new Error('I am an error');";
      document.body.appendChild(script);
    });

    expect(consoleErrors.length).withContext('get errorsAmount after custom error').toBe(1);
  });

  it('should not set checkmark icon if option is both selected and disabled', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="" disabled selected>Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    expect(await getDropdownCheckmarkIcon()).toBeNull();
  });

  describe('hover state', () => {
    it('should change box-shadow color when select is hovered', async () => {
      await initSelect();

      const select = await getSelect();
      const initialBoxShadow = await getElementStyle(select, 'boxShadow');

      await select.hover();
      expect(await getElementStyle(select, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of select when label text is hovered', async () => {
      await initSelect();

      const select = await getSelect();
      const labelText = await getLabelText();
      const initialBoxShadow = await getElementStyle(select, 'boxShadow');

      await labelText.hover();
      expect(await getElementStyle(select, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });
  });

  describe('dropdown position', () => {
    const expectedDropdownStyle = '0px none rgb(0, 0, 0)';

    it('should set direction to up', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label" dropdown-direction="up">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b" disabled>Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const dropdownStyle = await getElementStyle(await getDropdown(), 'borderBottom');
      expect(dropdownStyle).toBe(expectedDropdownStyle);
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

      const dropdownStyle = await getElementStyle(await getDropdown(), 'borderTop');
      expect(dropdownStyle).toBe(expectedDropdownStyle);
    });

    it('should auto position to up if bottom space is less than dropdown height', async () => {
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

      const dropdownStyle = await getElementStyle(await getDropdown(), 'borderBottom');
      expect(dropdownStyle).toBe(expectedDropdownStyle);
    });
  });

  describe('keyboard and click events', () => {
    it('should highlight first position on arrow down', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected custom option')
        .toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected custom option')
        .toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected custom option')
        .toBe(1);
      expect(await getAriaSelectedTrueDropdownOptionIndex())
        .withContext('for aria selected index')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);

      expect(calls).withContext('for calls').toBe(1);
      expect(await getDropdownAriaActiveDescendant())
        .withContext('for active descendant')
        .toEqual(`option-${await getSelectedDropdownOptionIndex()}`);
    });

    it('should have the correct aria-expanded value if open/closed', async () => {
      await initSelect();

      const host = await getHost();
      const dropdown = await getDropdown();

      expect(await getAttribute(dropdown, 'aria-expanded'))
        .withContext('initially')
        .toBe('false');

      await host.click();
      await waitForStencilLifecycle(page);

      expect(await getAttribute(dropdown, 'aria-expanded'))
        .withContext('after click')
        .toBe('true');
    });

    it('should have aria-selected attribute on selected custom option on click', async () => {
      await initSelect();

      const select = await getSelect();
      const dropdownOption1 = await getDropdownOption1();
      const dropdownOption2 = await getDropdownOption2();

      expect(await getAttribute(dropdownOption1, 'aria-selected'))
        .withContext('Option A initially')
        .toBe('true');
      expect(await getAttribute(dropdownOption2, 'aria-selected'))
        .withContext('Option B initially')
        .toBeNull();

      await select.click();
      await dropdownOption2.click();
      await waitForStencilLifecycle(page);

      expect(await getAttribute(dropdownOption1, 'aria-selected'))
        .withContext('Option A after click')
        .toBeNull();
      expect(await getAttribute(dropdownOption2, 'aria-selected'))
        .withContext('Option B after click')
        .toBe('true');
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
        </p-select-wrapper>`
      );

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex()).toBe(2);
    });

    it('should skip disabled option on arrow up', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">A Option</option>
            <option value="b" disabled>B Option</option>
            <option value="c" selected>C Option</option>
          </select>
        </p-select-wrapper>`
      );

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowUp'); //this just opens the dropdown
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex()).toBe(0);
    });

    it('should highlight correct position on multiple key actions', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label">
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
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(3);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(2);
    });

    it('should open select with spacebar', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      expect(await getDropdownOpacity())
        .withContext('for opacity after tab')
        .toBe('0');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownOpacity())
        .withContext('for opacity after space')
        .toBe('1');
      expect(calls).withContext('for calls').toBe(0);
    });

    it('should select correct option with spacebar', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      expect(await getDropdownOpacity())
        .withContext('for opacity after tab')
        .toBe('0');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownOpacity())
        .withContext('for opacity afer space')
        .toBe('1');

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(1);

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);
      expect(calls).withContext('for calls').toBe(1);
    });

    describe('when dropdown is not open', () => {
      it('should change selected option on ArrowLeft', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(2);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(2);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(2);
        expect(calls).withContext('for calls').toBe(1);
      });

      it('should change selected option on ArrowRight', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(1);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(1);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(1);
        expect(calls).withContext('for calls').toBe(1);
      });

      it('should not select option on PageDown', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(0);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(0);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(0);
      });

      it('should not select option on PageUp', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(0);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(0);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(0);
      });
    });

    describe('when dropdown is open', () => {
      it('should change selected option on ArrowLeft and should close the list', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowLeft');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(2);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(2);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(2);
        expect(await getDropdownOpacity())
          .withContext('for opacity')
          .toBe('0');
        expect(calls).withContext('for calls').toBe(1);
      });

      it('should change selected option on ArrowRight and should close the list', async () => {
        await initSelect();
        const select = await getSelect();
        let calls = 0;
        await addEventListener(select, 'change', () => calls++);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('ArrowRight');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(1);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(1);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(1);
        expect(await getDropdownOpacity())
          .withContext('for opacity')
          .toBe('0');
        expect(calls).withContext('for calls').toBe(1);
      });

      it('should highlight and select last option on PageDown', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(2);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(0);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(0);

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(2);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(2);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(2);
      });

      it('should highlight and select first option on PageUp', async () => {
        await setContentWithDesignSystem(
          page,
          `
          <p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b">B Option</option>
              <option value="c" selected>C Option</option>
            </select>
          </p-select-wrapper>`
        );
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(0);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(2);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(2);

        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(0);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(0);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(0);
      });

      it('should not select option on Escape', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(1);

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(0);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(0);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(0);
        expect(await getDropdownOpacity())
          .withContext('for opacity')
          .toBe('0');
      });

      it('should select option through keyboard search', async () => {
        await setContentWithDesignSystem(
          page,
          `
          <p-select-wrapper label="Some label">
            <select name="some-name">
              <option value="a">A Option</option>
              <option value="b">B Option</option>
              <option value="c">C Option</option>
            </select>
          </p-select-wrapper>`
        );
        await page.keyboard.press('Tab');
        await page.keyboard.press('c');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex())
          .withContext('for highlighted custom option')
          .toBe(2);
        expect(await getSelectedDropdownOptionIndex())
          .withContext('for selected custom option')
          .toBe(2);
        expect(await getSelectedIndex())
          .withContext('for selected index')
          .toBe(2);
      });
    });

    it('should open/close select on mouseclick', async () => {
      await initSelect();
      const select = await getSelect();

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity after 1st click')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option  after 1st click')
        .toBe(0);

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity after 2nd click')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option after 2nd click')
        .toBe(0);
    });

    it('should open/close select on icon click', async () => {
      await initSelect();
      const icon = await getSelectIcon();

      const clickIcon = async () => {
        const { top, bottom, left, right } = await getElementPositions(page, icon);
        // click center of where icon is located
        await page.mouse.click(left + (right - left) / 2, top + (bottom - top) / 2);
        await waitForStencilLifecycle(page);
      };

      await clickIcon();

      expect(await getDropdownOpacity())
        .withContext('for opacity after 1st click')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option after 1st click')
        .toBe(0);

      await clickIcon();

      expect(await getDropdownOpacity())
        .withContext('for opacity after 2nd click')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option after 2nd click')
        .toBe(0);
    });

    it('should select second option on mouseclick', async () => {
      await initSelect();
      const select = await getSelect();
      const dropdownOption2 = await getDropdownOption2();

      await select.click();
      await dropdownOption2.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted custom option')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected custom option')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);
    });

    it('should select second option on mouseclick when used in custom element', async () => {
      const customElementName = 'my-custom-element';

      const initCustomElement = `
<script type="text/javascript">
  window.customElements.define(
    '${customElementName}',
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
        <${customElementName}></${customElementName}>`
      );
      const select = await selectNode(page, `${customElementName} >>> p-select-wrapper select`);

      const nestedDropdownSelector = `${customElementName} >>> ${dropdownSelector}`;
      const dropdownOption2 = await selectNode(page, `${nestedDropdownSelector} >>> .option:nth-child(2)`);
      const dropdownOption2BoundingBox = await dropdownOption2.boundingBox();

      const dropdownInCustomElement = await getShadowRoot(await selectNode(page, nestedDropdownSelector));
      const getSelectedOptionInCustomElement = () => getElementIndex(dropdownInCustomElement, `.${selectedClass}`);

      expect(await getSelectedOptionInCustomElement())
        .withContext('initially')
        .toBe(0);

      await select.click();
      await waitForStencilLifecycle(page);
      await page.mouse.click(dropdownOption2BoundingBox.x + 2, dropdownOption2BoundingBox.y + 2);
      await waitForStencilLifecycle(page);

      expect(await getSelectedOptionInCustomElement())
        .withContext('after click')
        .toBe(1);
    });

    it('should close select on tab', async () => {
      await initSelect();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
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
      await waitForStencilLifecycle(page);

      expect(keyDownEventCounter).toBe(2);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).withContext('componentDidLoad: p-select-wrapper').toBe(1);
      expect(status.componentDidLoad['p-select-wrapper-dropdown'])
        .withContext('componentDidLoad: p-select-wrapper-dropdown')
        .toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(1); // label
      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(2); // arrow down and checkmark

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(5);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips if second option is clicked', async () => {
      await initSelect();
      const select = await getSelect();
      const dropdownOption2 = await getDropdownOption2();

      await select.click();
      await waitForStencilLifecycle(page);
      const initialStatus = await getLifecycleStatus(page);

      expect(initialStatus.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(2);
      expect(initialStatus.componentDidLoad.all).withContext('componentDidLoad: all').toBe(5);

      expect(initialStatus.componentDidUpdate['p-select-wrapper'])
        .withContext('componentDidUpdate: p-select-wrapper')
        .toBe(1);
      expect(initialStatus.componentDidUpdate['p-select-wrapper-dropdown'])
        .withContext('componentDidUpdate: p-select-wrapper-dropdown')
        .toBe(1);
      expect(initialStatus.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(2);

      await dropdownOption2.click();
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(3); // new icon on selected option
      expect(status.componentDidUpdate['p-select-wrapper']).withContext('componentDidUpdate: p-select-wrapper').toBe(2);
      expect(status.componentDidUpdate['p-select-wrapper-dropdown'])
        .withContext('componentDidUpdate: p-select-wrapper-dropdown')
        .toBe(2);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(6);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(4);
    });
  });
});
