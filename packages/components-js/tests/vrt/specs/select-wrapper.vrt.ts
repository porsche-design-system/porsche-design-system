import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Select Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'select-wrapper',
        async () => {
          await vrt.goTo('/#select-wrapper');
          await vrt.click('#open-options');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('select-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">
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
          <div>
            <p-select-wrapper theme="${theme}" label="Some label">
              ${getSelectMarkup()}
            </p-select-wrapper>
            <p-select-wrapper theme="${theme}" label="Some label" state="error" message="Some error message.">
              ${getSelectMarkup()}
            </p-select-wrapper>
            <p-select-wrapper theme="${theme}" label="Some label" state="success" message="Some success message.">
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

          <div>
            <p-select-wrapper theme="${theme}" label="Some disabled label">
              ${getSelectMarkup(disabledOptions)}
            </p-select-wrapper>
            <p-select-wrapper theme="${theme}" label="Some disabled label" state="error" message="Some error message.">
              ${getSelectMarkup(disabledOptions)}
            </p-select-wrapper>
            <p-select-wrapper theme="${theme}" label="Some disabled label" state="success" message="Some success message.">
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
        // TODO add hover test on fake option after select refactoring

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered p-select-wrapper select');
        await forceHoveredState(page, '.hovered p-select-wrapper span a');
        await forceHoveredState(page, '.hovered p-select-wrapper >>> p-select-wrapper-filter >>> input');
        await forceFocusedState(page, '.focused p-select-wrapper select');
        await forceFocusedState(page, '.focused p-select-wrapper span a');
        await forceFocusedState(page, '.focused p-select-wrapper >>> p-select-wrapper-filter >>> input');
        await forceFocusedHoveredState(page, '.focused-hovered p-select-wrapper select');
        await forceFocusedHoveredState(page, '.focused-hovered p-select-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered p-select-wrapper >>> p-select-wrapper-filter >>> input');
      })
    ).toBeFalsy();
  });
});
