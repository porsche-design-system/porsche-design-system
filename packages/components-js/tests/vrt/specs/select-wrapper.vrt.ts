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

        const head = `<style type="text/css">p-select-wrapper:not(:last-child) { margin-bottom: 1rem; }</style>`;

        const slottedMarkup = `<span slot="label">Some slotted label with a <a href="#">link</a>.</span>
<span slot="description">Some slotted description with a <a href="#">link</a>.</span>
<span slot="message">Some slotted validation message with a <a href="#">link</a>.</span>`;

        const selectMarkup = `<select>
  <option value="a">Option A</option>
</select>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-select-wrapper theme="${theme}" label="Some label">
            ${selectMarkup}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="error" message="Some error validation message.">
            ${selectMarkup}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="success" message="Some success validation message.">
            ${selectMarkup}
          </p-select-wrapper>

          <p-select-wrapper theme="${theme}">
            ${slottedMarkup}
            ${selectMarkup}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="error">
            ${slottedMarkup}
            ${selectMarkup}
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" state="success">
            ${slottedMarkup}
            ${selectMarkup}
          </p-select-wrapper>`;
        // TODO add hover test on fake option after select refactoring

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-select-wrapper select');
        await forceHoveredState(page, '.hovered > p-select-wrapper span a');
        await forceFocusedState(page, '.focused > p-select-wrapper select');
        await forceFocusedState(page, '.focused > p-select-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-select-wrapper select');
        await forceFocusedHoveredState(page, '.focused-hovered > p-select-wrapper span a');
      })
    ).toBeFalsy();
  });
});
