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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'text', '/#text')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('text-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-text theme="${theme}">
          Heading
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-text>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-text a');
      await forceHoverState(page, '.hover p-text button');
      await forceFocusState(page, '.focus p-text a');
      await forceFocusState(page, '.focus p-text button');
      await forceFocusHoverState(page, '.focus-hover p-text a');
      await forceFocusHoverState(page, '.focus-hover p-text button');
    })
  ).toBeFalsy();
});
