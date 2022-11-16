import {
  getPreloadedTagNamesForCoreChunk,
  // getPreloadedTagNamesForVersion,
  // getPorscheDesignSystemPrefixes,
} from './helper';

describe('getPreloadedTagNamesForCoreChunk()', () => {
  let coreChunkLinkElement;
  beforeEach(() => {
    coreChunkLinkElement = document.createElement('link');
    document.head.appendChild(coreChunkLinkElement);
  });
  it('should return empty [] if nextSibling is undefined', () => {
    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
  it('should return empty [] if nextSibling.href is undefined', () => {
    const nextSibling = document.createElement('link');
    document.head.appendChild(nextSibling);
    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
  it('should return empty [] if nextSibling.href does not include "porsche-design-system."', () => {
    const nextSibling = document.createElement('link');
    nextSibling.href = 'some-href';
    document.head.appendChild(nextSibling);
    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });

  it('should return preloaded tag names if nextSibling.href includes "porsche-design-system."', () => {
    const nextSibling = document.createElement('link');
    nextSibling.href = 'porsche-design-system.';
    document.head.appendChild(nextSibling);
    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
});

describe('getPreloadedTagNamesForVersion()', () => {
  it('', () => {});
});

describe('getPorscheDesignSystemPrefixes()', () => {
  it('', () => {});
});
