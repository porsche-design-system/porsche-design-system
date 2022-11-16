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

describe('getUsedTagNamesForVersions()', () => {
  const prefixesForVersion = { '1.2.3': ['', 'my-prefix', 'some-prefix'], '1.2.4': ['', 'my-prefix', 'some-prefix'] };

  it('should call getPdsComponentsSelector() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getPdsComponentsSelector');
    getUsedTagNamesForVersions(prefixesForVersion);

    expect(spy).toHaveBeenNthCalledWith(1, prefixesForVersion['1.2.3']);
    expect(spy).toHaveBeenNthCalledWith(2, prefixesForVersion['1.2.4']);
    expect(spy).toBeCalledTimes(2);
  });

  it('should call document.querySelectorAll() with correct parameter', () => {
    const pdsComponentsSelectorMock = 'somSelector';
    jest.spyOn(helperUtils, 'getPdsComponentsSelector').mockReturnValue(pdsComponentsSelectorMock);
    const spy = jest.spyOn(document, 'querySelectorAll');
    getUsedTagNamesForVersions(prefixesForVersion);

    expect(spy).toBeCalledWith(pdsComponentsSelectorMock);
  });
});

describe('getUsedTagNamesWithoutPreloadForVersions()', () => {
  const tagNames: TagName[] = ['p-text', 'p-tag', 'p-link'];

  it('should return tagNames without preload for multiple versions', () => {
    expect(
      getUsedTagNamesWithoutPreloadForVersions(
        { '1.2.3': tagNames, '1.2.4': tagNames },
        { '1.2.3': ['p-text'], '1.2.4': [] }
      )
    ).toEqual({
      '1.2.3': ['p-tag', 'p-link'],
      '1.2.4': tagNames,
    });
  });

  it('should return tagNames without preload for single version', () => {
    expect(getUsedTagNamesWithoutPreloadForVersions({ '1.2.3': tagNames }, { '1.2.3': [] })).toEqual({
      '1.2.3': tagNames,
    });
    expect(getUsedTagNamesWithoutPreloadForVersions({ '1.2.3': tagNames }, { '1.2.3': ['p-text'] })).toEqual({
      '1.2.3': ['p-tag', 'p-link'],
    });
  });

  it('should return {} when usedTagNames and preloadedTagNames match', () => {
    expect(getUsedTagNamesWithoutPreloadForVersions({ '1.2.3': tagNames }, { '1.2.3': tagNames })).toEqual({});
  });
});

describe('getPorscheDesignSystemPrefixesForVersions()', () => {
  it('should return prefix[] for Pds versions registered on document', () => {
    document.porscheDesignSystem = {
      '1.2.3': { prefixes: [''] },
      '1.2.4': { prefixes: ['prefix', 'another-prefix'] },
      '1.2.5': { prefixes: ['prefix', 'another-prefix'] },
    };

    expect(getPorscheDesignSystemPrefixesForVersions()).toEqual({
      '1.2.3': [''],
      '1.2.4': ['prefix', 'another-prefix'],
      '1.2.5': ['prefix', 'another-prefix'],
    });
  });
});
