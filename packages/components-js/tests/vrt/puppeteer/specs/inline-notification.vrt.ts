import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
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
    await vrtTest(getVisualRegressionTester(viewport), 'inline-notification', '/#inline-notification')
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('inline-notification-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-inline-notification theme="${theme}" action-label="Retry">
          <span slot="heading">Some heading with a <a href="#">link</a>.</span>
          Some description with a <a href="#">link</a>.
        </p-inline-notification>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

      await forceHoverState(page, '.hover > p-inline-notification a');
      await forceHoverState(page, '.hover > p-inline-notification >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus > p-inline-notification a');
      await forceFocusState(page, '.focus > p-inline-notification >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover > p-inline-notification a');
      await forceFocusHoverState(page, '.focus-hover > p-inline-notification >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
