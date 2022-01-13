import { getComponentCss } from './fieldset-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', true, 'medium', true, true],
    ['none', true, 'medium', true, false],
    ['none', true, 'medium', false, false],
    ['none', true, 'medium', true, true],
    ['none', true, 'small', true, true],
    ['none', true, 'small', true, true],
    ['success', true, 'medium', true, true],
    ['error', true, 'medium', true, true],
  ])(
    'should return correct css for state: %s, required: %s, labelSize: %s, hasLabel: %s and hasMessage: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
