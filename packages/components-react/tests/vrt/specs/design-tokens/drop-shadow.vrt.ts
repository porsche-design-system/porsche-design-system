import { vrtTest } from '@porsche-design-system/shared/testing';
import { getVisualRegressionStatesTester } from 'shared/src/testing/vrt';

const designToken = 'utilities-drop-shadow-example';
it('should have no visual regression for viewport %s', async () => {
  expect(await vrtTest(getVisualRegressionStatesTester(), designToken, `/${designToken}`)).toBeFalsy();
});
