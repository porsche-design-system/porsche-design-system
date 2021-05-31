import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

describe('Button', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button',
        async () => {
          await vrt.goTo('/#button');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('button-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-button:not(:last-child) { margin-right: 8px; }</style>`;

        const getElements = (theme: Theme = 'light'): string => `
          <p-button theme="${theme}" variant="primary">Some label</p-button>
          <p-button theme="${theme}" variant="secondary">Some label</p-button>
          <p-button theme="${theme}" variant="tertiary">Some label</p-button>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-button >>> button');
        await forceFocused(page, '.focused > p-button >>> button');
        await forceFocusedHovered(page, '.focused-hovered > p-button >>> button');
      })
    ).toBeFalsy();
  });
});
