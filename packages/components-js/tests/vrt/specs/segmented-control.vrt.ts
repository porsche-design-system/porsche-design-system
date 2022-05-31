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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'segmented-control', '/#segmented-control')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('segmented-control-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        p-segmented-control:not(:last-child) { margin-bottom: 0.5rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-segmented-control theme="${theme}">
          <p-segmented-control-item>Default</p-segmented-control-item>
          <p-segmented-control-item selected>Default</p-segmented-control-item>
          <p-segmented-control-item disabled>Default</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control theme="${theme}">
          <p-segmented-control-item label="Some label">With label</p-segmented-control-item>
          <p-segmented-control-item label="Some label" selected>With label</p-segmented-control-item>
          <p-segmented-control-item label="Some label" disabled>With label</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control theme="${theme}">
          <p-segmented-control-item icon="arrow-head-right">With icon</p-segmented-control-item>
          <p-segmented-control-item icon="arrow-head-right" selected>With icon</p-segmented-control-item>
          <p-segmented-control-item icon="arrow-head-right" disabled>With icon</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control theme="${theme}">
          <p-segmented-control-item label="Some label" icon="arrow-head-right">With label and icon</p-segmented-control-item>
          <p-segmented-control-item label="Some label" icon="arrow-head-right" selected>With label and icon</p-segmented-control-item>
          <p-segmented-control-item label="Some label" icon="arrow-head-right" disabled>With label and icon</p-segmented-control-item>
        </p-segmented-control>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark'] }), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-segmented-control-item >>> button');
      await forceFocusState(page, '.focus p-segmented-control-item'); // native outline should not be visible
      await forceFocusState(page, '.focus p-segmented-control-item >>> button');
      await forceFocusHoverState(page, '.focus-hover p-segmented-control-item >>> button');
    })
  ).toBeFalsy();
});
