import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'select-wrapper', '/#select-wrapper', {
      scenario: async (page) => {
        await page.click('#open-options');
        await page.evaluate(() => (window as any).componentsReady());
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('select-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        .playground div {
          display: flex;
        }
        p-select-wrapper {
          width: 20rem;
        }
        p-select-wrapper:not(:last-child) {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      </style>`;

      type GetSelectMarkupOptions = { disabled?: boolean };
      const getSelectMarkup = (opts?: GetSelectMarkupOptions): string => `
<select${opts?.disabled ? ' disabled' : ''}>
  <option value="a">Option A</option>
</select>`;

      const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
<span slot="label">Some${opts?.disabled ? ' disabled' : ''} slotted label with a <a href="#">link</a>.</span>
<span slot="description">Some slotted description with a <a href="#">link</a>.</span>
<span slot="message">Some slotted message with a <a href="#">link</a>.</span>`;

      const disabledOptions: GetSelectMarkupOptions = { disabled: true };

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div class="native">
          <p-select-wrapper theme="${theme}" label="Some native label" native>
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some native label" native state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some native label" native state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
        </div>
        <div>
          <p-select-wrapper theme="${theme}" label="Some dropdown label">
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
        </div>
        <div>
          <p-select-wrapper theme="${theme}" filter label="Some filter label">
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" filter label="Some filter label" state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" filter label="Some filter label" state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-select-wrapper>
        </div>

        <div class="native">
          <p-select-wrapper theme="${theme}" label="Some disabled native label" native>
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some disabled native label" native state="error" message="Some error message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some disabled native label" native state="success" message="Some success message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
        </div>
        <div>
          <p-select-wrapper theme="${theme}" label="Some disabled dropdown label">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
        </div>
        <div>
          <p-select-wrapper theme="${theme}" filter label="Some disabled filter label">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" filter label="Some disabled filter label" state="error" message="Some error message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" filter label="Some disabled filter label" state="success" message="Some success message.">
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
        </div>

        <div>
          <p-select-wrapper theme="${theme}">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="error">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="success">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-select-wrapper>
        </div>
        <div>
          <p-select-wrapper theme="${theme}">
            ${getSlottedMarkup(disabledOptions)}
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="error">
            ${getSlottedMarkup(disabledOptions)}
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="success">
            ${getSlottedMarkup(disabledOptions)}
            ${getSelectMarkup(disabledOptions)}
          </p-select-wrapper>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoveredState(page, '.hovered .native p-select-wrapper select');
      await forceHoveredState(page, '.hovered p-select-wrapper span a');
      await forceHoveredState(page, '.hovered p-select-wrapper >>> p-select-wrapper-dropdown');
      await forceHoveredState(page, '.hovered p-select-wrapper >>> p-select-wrapper-dropdown');
      await forceFocusedState(page, '.focused .native p-select-wrapper select');
      await forceFocusedState(page, '.focused p-select-wrapper span a');
      await forceFocusedState(page, '.focused p-select-wrapper >>> p-select-wrapper-dropdown >>> button');
      await forceFocusedState(page, '.focused p-select-wrapper >>> p-select-wrapper-dropdown >>> input');
      await forceFocusedHoveredState(page, '.focused-hovered .native p-select-wrapper select');
      await forceFocusedHoveredState(page, '.focused-hovered p-select-wrapper span a');
      // actual user interaction happens on multiple nodes that's why forceFocusedHoveredState is wrong
      await forceHoveredState(page, '.focused-hovered p-select-wrapper >>> p-select-wrapper-dropdown');
      await forceFocusedState(page, '.focused-hovered p-select-wrapper >>> p-select-wrapper-dropdown >>> button');
      await forceFocusedState(page, '.focused-hovered p-select-wrapper >>> p-select-wrapper-dropdown >>> input');
    })
  ).toBeFalsy();
});
