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

xit.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link-tile', '/#link-tile')).toBeFalsy();
});

xit('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-tile-states', async () => {
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
          <p-link-tile href="#" label="Some Label" description="Default">
           ${image}
          </p-link-tile>
          <p-link-tile href="#" label="Some Label" description="Compact" compact="true">
           ${image}
          </p-link-tile>
          <p-link-tile href="#" label="Some Label" description="Picture tag" compact="true">
            <picture>
             ${image}
            </picture>
          </p-link-tile>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-link-tile >>> .root');
      await forceHoverState(page, '.hover p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.hover p-link-tile >>> p-link-pure >>> .root');
      await forceFocusState(page, '.focus p-link-tile >>> a');
      await forceHoverState(page, '.focus-hover p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile >>> p-link-pure >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-link-tile >>> a');
    })
  ).toBeFalsy();
});
