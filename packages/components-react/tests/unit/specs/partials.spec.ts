import {
  getComponentChunkLinks,
  getFontFaceStylesheet,
  getFontLinks,
  getIconLinks,
  getInitialStyles,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '../../../projects/components-wrapper/src/partials';

describe('getFontFaceStylesheet()', () => {
  it('should be a function', () => {
    expect(typeof getFontFaceStylesheet).toBe('function');
  });
});

describe('getInitialStyles()', () => {
  it('should be a function', () => {
    expect(typeof getInitialStyles).toBe('function');
  });
});

describe('getFontLinks()', () => {
  it('should be a function', () => {
    expect(typeof getFontLinks).toBe('function');
  });
});

describe('getIconLinks()', () => {
  it('should be a function', () => {
    expect(typeof getIconLinks).toBe('function');
  });
});

describe('getComponentChunkLinks()', () => {
  it('should be a function', () => {
    expect(typeof getComponentChunkLinks).toBe('function');
  });
});

describe('getMetaTagsAndIconLinks()', () => {
  it('should be a function', () => {
    expect(typeof getMetaTagsAndIconLinks).toBe('function');
  });
});

describe('getLoaderScript()', () => {
  it('should be a function', () => {
    expect(typeof getLoaderScript).toBe('function');
  });
});
