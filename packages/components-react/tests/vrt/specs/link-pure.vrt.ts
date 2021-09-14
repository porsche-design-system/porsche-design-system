import { getVisualRegressionTester, testOptions } from '../helpers';
import { vrtTest } from '@porsche-design-system/shared';

describe('Link Pure', () => {
  fit('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'link-pure', '/link-pure', testOptions)).toBeFalsy();
  });
});
