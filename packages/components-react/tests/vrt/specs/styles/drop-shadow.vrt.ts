import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

const id = 'styles-drop-shadow';
it('should have no visual regression', async () => {
  expect(await vrtTest(getVisualRegressionStatesTester(), id, `/${id}`)).toBeFalsy();
});
