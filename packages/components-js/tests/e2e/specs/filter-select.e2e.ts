import {
  addEventListener,
  getAttribute,
  getBrowser,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

describe('select-wrapper combobox', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getSelectOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');

  describe('fake drop down with filter (combobox)', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
      );

      const fakeOptionList = await getSelectOptionList();
      const fakeOptionFilter = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
      const fakeOptionSelected = await selectNode(
        page,
        'p-select-wrapper >>> .p-select-wrapper__fake-option--selected'
      );
      const activeDescendant = await getAttribute(fakeOptionFilter, 'aria-activedescendant');
      const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptionFilter).not.toBeNull();
      expect(activeDescendant).toEqual(selectedDescendantId);
    });

    it('should focus filter when label text is clicked', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const labelText = await getSelectLabel();
      const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
      let afterFocusCalls = 0;
      await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

      expect(afterFocusCalls).toBe(0);
      await labelText.click();
      await waitForStencilLifecycle(page);
      expect(afterFocusCalls).toBe(1);
    });

    it('should focus filter when tab key is pressed', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
      let afterFocusCalls = 0;
      await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

      expect(afterFocusCalls).toBe(0);
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect(afterFocusCalls).toBe(1);
    });
  });
});
