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
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1">Default</p-segmented-control-item>
          <p-segmented-control-item value="2">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" label="Some label">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" label="Some label">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" label="Some label" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" icon="arrow-head-right">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" icon="arrow-head-right">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" label="Some label" icon="arrow-head-right">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" label="Some label" icon="arrow-head-right">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" label="Some label" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
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
