import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

const runVrtTest = (id: string) =>
  vrtTest(getVisualRegressionStatesTester(), `focus-${id}`, '/#/js-focus', {
    regressionSuffix: 'js',
    scenario: (page) => page.focus(`#focusable-element-${id}`),
  });

xit('should have no visual regression', async () => {
  expect(await runVrtTest('regular')).toBeFalsy();
});

xit('should have no visual regression custom element', async () => {
  expect(await runVrtTest('custom')).toBeFalsy();
});

xit('should have no visual regression custom pseudo element', async () => {
  expect(await runVrtTest('custom-pseudo')).toBeFalsy();
});

xit('should have no visual regression pseudo element', async () => {
  expect(await runVrtTest('pseudo')).toBeFalsy();
});
