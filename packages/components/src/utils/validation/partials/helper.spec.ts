import * as helper from './helper';

describe('getPreloadedTagNamesForCoreChunk()', () => {
  let coreChunkLinkElement;
  beforeEach(() => {
    coreChunkLinkElement = document.createElement('link');
    document.head.appendChild(coreChunkLinkElement);
  });
  it('should return empty [] if nextSibling is undefined', () => {
    expect(helper.getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
  it('should return empty [] if nextSibling.href is undefined', () => {
    const nextSibling = document.createElement('link');
    document.head.appendChild(nextSibling);

    expect(helper.getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
  it('should return empty [] if nextSibling.href does not include "porsche-design-system."', () => {
    const nextSibling = document.createElement('link');
    nextSibling.href = 'some-href';
    document.head.appendChild(nextSibling);

    expect(helper.getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual([]);
  });
  it('should return preloaded tag names if nextSibling.href includes "porsche-design-system."', () => {
    const nextSibling1 = document.createElement('link');
    nextSibling1.href =
      'href="https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.text.6c494c2050a87f393ea4.js';
    const nextSibling2 = document.createElement('link');
    nextSibling2.href =
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.accordion.672e1be1ea3640e24667.js';
    const nextSibling3 = document.createElement('link');
    nextSibling3.href =
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.grid.f471d5944c4c0bc0bcb5.js';
    document.head.appendChild(nextSibling1);
    document.head.appendChild(nextSibling2);
    document.head.appendChild(nextSibling3);

    expect(helper.getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual(['p-text', 'p-accordion', 'p-grid']);
  });
});

describe('getPreloadedTagNamesForVersion()', () => {
  it('should return empty [] for version when version is not found in dom', () => {
    const version = '1.2.3';

    expect(helper.getPreloadedTagNamesForVersion(version)).toEqual([]);
  });
  it('should call getPreloadedTagNamesForCoreChunk() with correct parameter when version is found in dom', () => {
    const version = '1.2.3';
    const coreChunkLinkElement = document.createElement('link');
    coreChunkLinkElement.href = `porsche-design-system.v${version}`;
    document.head.appendChild(coreChunkLinkElement);
    const spy = jest.spyOn(helper, 'getPreloadedTagNamesForCoreChunk');

    helper.getPreloadedTagNamesForVersion(version);

    expect(spy).toBeCalledWith('<link href="porsche-design-system.v1.2.3" />');
  });
});

describe('getPreloadedTagNamesForVersions()', () => {
  it('', () => {});
});

describe('getPorscheDesignSystemPrefixes()', () => {
  it('', () => {});
});
