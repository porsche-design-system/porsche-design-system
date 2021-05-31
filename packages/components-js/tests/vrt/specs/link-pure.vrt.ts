import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  GetThemedElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Link Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-pure',
        async () => {
          await vrt.goTo('/#link-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-pure-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-link-pure:not(:last-child) { margin-right: 8px; }</style>`;

        const getElements: GetThemedElements = (theme = 'light') => `
          <p-link-pure theme="${theme}" href="#">Some label</p-link-pure>
          <p-link-pure theme="${theme}" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          <p-link-pure theme="${theme}"><a href="#">Some label</a></p-link-pure>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-link-pure >>> a');
        await forceHovered(page, '.hovered > p-link-pure >>> span');
        await forceFocused(page, '.focused > p-link-pure >>> a');
        await forceFocused(page, '.focused > p-link-pure >>> span');
        await forceFocusedHovered(page, '.focused-hovered > p-link-pure >>> a');
        await forceFocusedHovered(page, '.focused-hovered > p-link-pure >>> span');
      })
    ).toBeFalsy();
  });
});
