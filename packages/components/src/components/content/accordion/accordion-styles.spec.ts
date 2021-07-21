import { getSlottedAccordionCss } from './accordion-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedAccordionCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedAccordionCss(host)).toMatchSnapshot();
  });
});
