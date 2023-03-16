import { getLinkButtonGroupDirectionStyles } from './link-button-group-direction-styles';

describe('getLinkButtonGroupDirectionStyles()', () => {
  it.each<Parameters<typeof getLinkButtonGroupDirectionStyles>>([
    ['column'],
    ['row'],
    [{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' }],
  ])('should return correct css for direction: %s', (...args) => {
    expect(getLinkButtonGroupDirectionStyles(...args)).toMatchSnapshot();
  });
});
