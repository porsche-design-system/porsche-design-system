import { getComponentCss } from './fieldset-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', 'medium', true],
    ['none', 'medium', false],
    ['none', 'small', true],
    ['none', 'small', false],
    ['success', 'medium', false],
    ['error', 'medium', false],
  ])('should return correct css for state: %s, labelSize: %s and hasLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
