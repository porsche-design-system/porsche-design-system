import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

const runVrtTest = (id: string) =>
  vrtTest(getVisualRegressionStatesTester(), `focus-${id}`, '/#/scss-focus', {
    regressionSuffix: 'scss',
    scenario: (page) => page.focus(`#focusable-element-${id}`),
  });

it('should have no visual regression', async () => {
  expect(await runVrtTest('regular')).toBeFalsy();
});

it('should have no visual regression custom element', async () => {
  expect(await runVrtTest('custom')).toBeFalsy();
});

it('should have no visual regression custom pseudo element', async () => {
  expect(await runVrtTest('custom-pseudo')).toBeFalsy();
});

it('should have no visual regression pseudo element', async () => {
  expect(await runVrtTest('pseudo')).toBeFalsy();
});
