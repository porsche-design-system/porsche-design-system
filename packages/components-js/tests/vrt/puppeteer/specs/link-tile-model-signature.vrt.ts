import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'link-tile-model-signature', '/#link-tile-model-signature')
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-tile-model-signature-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
          }
        </style>`;

      const image =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

      const getElementsMarkup: GetMarkup = () => `
        <div class="grid">
          <p-link-tile-model-signature heading="Some heading">
            ${image}
            <p-link slot="primary" href="#" variant="primary" theme="dark">Some Label</p-link>
            <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some Label</p-link>
          </p-link-tile-model-signature>
          <p-link-tile-model-signature heading="Some heading" description="Some description">
            <picture>
             ${image}
            </picture>
            <p-link slot="primary" href="#" variant="primary" theme="dark">Some Label</p-link>
            <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some Label</p-link>
           </p-link-tile-model-signature>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-link-tile-model-signature >>> .root');
      await forceHoverState(page, '.hover p-link-tile-model-signature p-link >>> .root');
      await forceHoverState(page, '.hover p-link-tile-model-signature >>> a');
      await forceHoverState(page, '.focus p-link-tile-model-signature >>> .root');
      await forceFocusState(page, '.focus p-link-tile-model-signature p-link >>> .root');
      await forceFocusState(page, '.focus p-link-tile-model-signature >>> a');
      await forceHoverState(page, '.focus-hover p-link-tile-model-signature >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile-model-signature >>> a');
      await forceFocusHoverState(page, '.focus-hover p-link-tile-model-signature p-link >>> .root');
    })
  ).toBeFalsy();
});
