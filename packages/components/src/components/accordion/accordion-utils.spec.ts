import {
  ACCORDION_ALIGN_MARKERS,
  ACCORDION_HEADINGS_DEPRECATED,
  ACCORDION_SIZES,
  ACCORDIONS_BACKGROUNDS,
} from './accordion-utils';

describe('ACCORDIONS_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(ACCORDIONS_BACKGROUNDS).toStrictEqual(['canvas', 'surface', 'frosted', 'none']);
  });
});

describe('ACCORDION_ALIGN_MARKERS', () => {
  it('should list supported align-marker values', () => {
    expect(ACCORDION_ALIGN_MARKERS).toStrictEqual(['start', 'end']);
  });
});

describe('ACCORDION_HEADINGS_DEPRECATED', () => {
  it('should list deprecated heading tags', () => {
    expect(ACCORDION_HEADINGS_DEPRECATED).toStrictEqual(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
  });
});

describe('ACCORDION_SIZES', () => {
  it('should list supported size values', () => {
    expect(ACCORDION_SIZES).toStrictEqual(['small', 'medium']);
  });
});
