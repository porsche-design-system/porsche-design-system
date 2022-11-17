import {
  getPdsComponentsSelector,
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForCoreChunk,
  getPreloadedTagNamesForVersion,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';
import type { TagName } from '@porsche-design-system/shared';
import * as helperUtils from './helper';
import * as tagNameUtils from '../../tag-name';
import { COMPONENT_TAG_NAMES_WITH_CHUNK } from '@porsche-design-system/shared';

declare global {
  interface Document {
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

describe('getPreloadedTagNamesForCoreChunk()', () => {
  let coreChunkLinkElement;
  beforeEach(() => {
    document.head.innerHTML = ''; // Clear head before each test
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

  it('should return preloaded tag names for core chunk link if nextSibling.href includes "porsche-design-system."', () => {
    [
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.text.6c494c2050a87f393ea4.js',
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.accordion.672e1be1ea3640e24667.js',
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.v2.17.0.9a579f8ff7708b1885a9.js', // Next core chunk
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.grid.f471d5944c4c0bc0bcb5.js',
    ].forEach((href) => {
      const link = document.createElement('link');
      link.href = href;
      document.head.appendChild(link);
    });

    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual(['p-text', 'p-accordion']);
  });
});

describe('getPreloadedTagNamesForVersion()', () => {
  const version = '1.2.3';

  it('should return empty [] for version if no core chunk link is found', () => {
    expect(getPreloadedTagNamesForVersion(version)).toEqual([]);
  });

  it('should call document.querySelector() with correct parameter', () => {
    const documentQuerySelectorSpy = jest.spyOn(document, 'querySelector');

    getPreloadedTagNamesForVersion(version);
    expect(documentQuerySelectorSpy).toBeCalledWith('[href*=porsche-design-system\\.v1\\.2\\.3]');

    getPreloadedTagNamesForVersion('1.2.4');
    expect(documentQuerySelectorSpy).toBeCalledWith('[href*=porsche-design-system\\.v1\\.2\\.4]');
  });

  it('should call getPreloadedTagNamesForCoreChunk() with correct parameter when core chunk link is found', () => {
    const querySelectorMockReturn = document.createElement('link');
    jest.spyOn(document, 'querySelector').mockReturnValue(querySelectorMockReturn);
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForCoreChunk');

    getPreloadedTagNamesForVersion(version);

    expect(spy).toBeCalledWith(querySelectorMockReturn);
  });
});

describe('getPreloadedTagNamesForVersions()', () => {
  const versions = ['1.2.3', '4.5.6', '7.8.9'];

  it('should return preloaded tag names for versions', () => {
    const mockReturnValue: TagName[] = ['p-text'];
    jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersion').mockReturnValue(mockReturnValue);

    expect(getPreloadedTagNamesForVersions(versions)).toEqual({
      '1.2.3': mockReturnValue,
      '4.5.6': mockReturnValue,
      '7.8.9': mockReturnValue,
    });
  });

  it('should call getPreloadedTagNamesForVersion() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersion');

    getPreloadedTagNamesForVersions(versions);

    expect(spy).toHaveBeenNthCalledWith(1, '1.2.3');
    expect(spy).toHaveBeenNthCalledWith(2, '4.5.6');
    expect(spy).toHaveBeenNthCalledWith(3, '7.8.9');
    expect(spy).toBeCalledTimes(3);
  });
});

describe('getPdsComponentsSelector()', () => {
  it('should return joined COMPONENT_TAG_NAMES_WITH_CHUNK if no prefixes are passed', () => {
    expect(getPdsComponentsSelector([''])).toEqual(COMPONENT_TAG_NAMES_WITH_CHUNK.join());
  });

  // TODO: how to test it without it failing as soon as a new chunk is created?
  it('should return joined and prefixed COMPONENT_TAG_NAMES_WITH_CHUNK for passed prefixes', () => {
    expect(getPdsComponentsSelector(['my-prefix', 'some-prefix'])).toEqual(
      'my-prefix-p-accordion,my-prefix-p-banner,my-prefix-p-button,my-prefix-p-button-group,my-prefix-p-button-pure,my-prefix-p-carousel,my-prefix-p-checkbox-wrapper,my-prefix-p-content-wrapper,my-prefix-p-divider,my-prefix-p-fieldset-wrapper,my-prefix-p-flex,my-prefix-p-grid,my-prefix-p-headline,my-prefix-p-icon,my-prefix-p-inline-notification,my-prefix-p-link,my-prefix-p-link-pure,my-prefix-p-link-social,my-prefix-p-link-tile,my-prefix-p-marque,my-prefix-p-modal,my-prefix-p-pagination,my-prefix-p-popover,my-prefix-p-radio-button-wrapper,my-prefix-p-scroller,my-prefix-p-segmented-control,my-prefix-p-select-wrapper,my-prefix-p-spinner,my-prefix-p-stepper-horizontal,my-prefix-p-switch,my-prefix-p-table,my-prefix-p-tabs,my-prefix-p-tabs-bar,my-prefix-p-tag,my-prefix-p-tag-dismissible,my-prefix-p-text,my-prefix-p-text-field-wrapper,my-prefix-p-text-list,my-prefix-p-textarea-wrapper,my-prefix-p-toast,some-prefix-p-accordion,some-prefix-p-banner,some-prefix-p-button,some-prefix-p-button-group,some-prefix-p-button-pure,some-prefix-p-carousel,some-prefix-p-checkbox-wrapper,some-prefix-p-content-wrapper,some-prefix-p-divider,some-prefix-p-fieldset-wrapper,some-prefix-p-flex,some-prefix-p-grid,some-prefix-p-headline,some-prefix-p-icon,some-prefix-p-inline-notification,some-prefix-p-link,some-prefix-p-link-pure,some-prefix-p-link-social,some-prefix-p-link-tile,some-prefix-p-marque,some-prefix-p-modal,some-prefix-p-pagination,some-prefix-p-popover,some-prefix-p-radio-button-wrapper,some-prefix-p-scroller,some-prefix-p-segmented-control,some-prefix-p-select-wrapper,some-prefix-p-spinner,some-prefix-p-stepper-horizontal,some-prefix-p-switch,some-prefix-p-table,some-prefix-p-tabs,some-prefix-p-tabs-bar,some-prefix-p-tag,some-prefix-p-tag-dismissible,some-prefix-p-text,some-prefix-p-text-field-wrapper,some-prefix-p-text-list,some-prefix-p-textarea-wrapper,some-prefix-p-toast'
    );
  });
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
    const pdsComponentsSelectorMock = 'someSelector';
    jest.spyOn(helperUtils, 'getPdsComponentsSelector').mockReturnValue(pdsComponentsSelectorMock);
    const spy = jest.spyOn(document, 'querySelectorAll');
    getUsedTagNamesForVersions(prefixesForVersion);

    expect(spy).toBeCalledWith(pdsComponentsSelectorMock);
  });

  it('should call getTagNameWithoutPrefix() with correct parameters', () => {
    const el = document.createElement('p-text');
    const el1 = document.createElement('my-prefix-p-text');
    const el2 = document.createElement('my-prefix-p-text');

    const mockReturnValue = [el, el1, el2];
    jest.spyOn(Array, 'from').mockReturnValue(mockReturnValue);
    const spy = jest.spyOn(tagNameUtils, 'getTagNameWithoutPrefix');
    getUsedTagNamesForVersions({ '1.2.3': ['p-text', 'my-prefix-p-text'] });

    expect(spy).toHaveBeenNthCalledWith(1, el, 0, mockReturnValue);
    expect(spy).toHaveBeenNthCalledWith(2, el1, 1, mockReturnValue);
    expect(spy).toHaveBeenNthCalledWith(3, el2, 2, mockReturnValue);
    expect(spy).toBeCalledTimes(3);
  });

  it('should return tagNames for each version without duplicates', () => {
    const el = document.createElement('p-text');
    const mockReturnValueArrayFrom = [el];
    jest.spyOn(Array, 'from').mockReturnValue(mockReturnValueArrayFrom);

    const mockReturnValueMap: TagName[] = ['p-text', 'p-text', 'p-button', 'p-button', 'p-link'];
    jest.spyOn(mockReturnValueArrayFrom, 'map').mockReturnValue(mockReturnValueMap);

    expect(
      getUsedTagNamesForVersions({
        '1.2.3': [''],
        '1.2.4': [''],
      })
    ).toEqual({
      '1.2.3': ['p-text', 'p-button', 'p-link'],
      '1.2.4': ['p-text', 'p-button', 'p-link'],
    });
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
  it('should return prefix[] for PDS versions registered on document', () => {
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
