import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  GetThemedElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Link', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link',
        async () => {
          await vrt.goTo('/#link');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-link:not(:last-child) { margin-right: 8px; }</style>`;

        const getElements: GetThemedElements = (theme = 'light') => `
          <p-link theme="${theme}" variant="primary" href="#">Some label</p-link>
          <p-link theme="${theme}" variant="secondary" href="#">Some label</p-link>
          <p-link theme="${theme}" variant="tertiary" href="#">Some label</p-link>
          <p-link theme="${theme}">
            <a href="#">Some label</a>
          </p-link>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-link >>> a');
        await forceHovered(page, '.hovered > p-link >>> span');
        await forceFocused(page, '.focused > p-link >>> a');
        await forceFocused(page, '.focused > p-link >>> span');
        await forceFocusedHovered(page, '.focused-hovered > p-link >>> a');
        await forceFocusedHovered(page, '.focused-hovered > p-link >>> span');
      })
    ).toBeFalsy();
  });
});
