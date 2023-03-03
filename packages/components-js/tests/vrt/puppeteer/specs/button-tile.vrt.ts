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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'button-tile', '/#button-tile')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('button-tile-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
          }
        </style>`;

      const image =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

      const getElementsMarkup: GetMarkup = () => `
        <div class="grid">
          <p-button-tile label="Some Label" description="Default">
           ${image}
          </p-button-tile>
          <p-button-tile label="Some Label" description="Compact" compact="true">
           ${image}
          </p-button-tile>
          <p-button-tile label="Some Label" description="Picture tag" compact="true">
            <picture>
             ${image}
            </picture>
          </p-button-tile>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-button-tile >>> .root');
      await forceHoverState(page, '.hover p-button-tile >>> p-button >>> .root');
      await forceHoverState(page, '.hover p-button-tile >>> p-button-pure >>> .root');
      await forceFocusState(page, '.focus p-button-tile >>> p-button >>> .root');
      await forceFocusState(page, '.focus p-button-tile >>> p-button-pure >>> .root');
      await forceFocusState(page, '.focus p-button-tile >>> button');
      await forceHoverState(page, '.focus-hover p-button-tile >>> p-button >>> .root');
      await forceHoverState(page, '.focus-hover p-button-tile >>> p-button-pure >>> .root');
      await forceHoverState(page, '.focus-hover p-button-tile >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-button-tile >>> p-button >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-button-tile >>> p-button-pure >>> .root');
    })
  ).toBeFalsy();
});
