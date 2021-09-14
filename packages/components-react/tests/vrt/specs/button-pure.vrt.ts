import { getVisualRegressionTester, testOptions } from '../helpers';
import { vrtTest } from '@porsche-design-system/shared';

describe('Button Pure', () => {
  fit('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'button-pure', '/button-pure', testOptions)).toBeFalsy();
  });
});
