import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

describe('Switch', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'switch',
        async () => {
          await vrt.goTo('/#switch');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('switch-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-switch ~ p-switch { margin-top: 8px; }</style>`;

        const getElements = (theme: Theme = 'light'): string => `
          <p-switch theme="${theme}">Some label</p-switch>
          <p-switch theme="${theme}" checked="true">Some label</p-switch>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-switch >>> button');
        await forceFocused(page, '.focused > p-switch >>> button');
        await forceFocusedHovered(page, '.focused-hovered > p-switch >>> button');
      })
    ).toBeFalsy();
  });
});
