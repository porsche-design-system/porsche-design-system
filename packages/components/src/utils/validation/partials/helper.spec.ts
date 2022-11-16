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
// import * as tagNameUtils from '../../tag-name';
import { COMPONENT_TAG_NAMES_WITH_CHUNK } from '@porsche-design-system/shared';

declare global {
  interface Document {
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

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

    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual(['p-text', 'p-accordion', 'p-grid']);
  });
});

describe('getPreloadedTagNamesForVersion()', () => {
  const version = '1.2.3';
  it('should return empty [] for version when version is not found in dom', () => {
    expect(getPreloadedTagNamesForVersion(version)).toEqual([]);
  });
  it('should call getPreloadedTagNamesForCoreChunk() with correct parameter when version is found in dom', () => {
    const coreChunkLinkElement = document.createElement('link');
    coreChunkLinkElement.href = `porsche-design-system.v${version}`;
    document.head.appendChild(coreChunkLinkElement);
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForCoreChunk');

    getPreloadedTagNamesForVersion(version);

    expect(spy).toBeCalledWith(coreChunkLinkElement);
  });
});

describe('getPreloadedTagNamesForVersions()', () => {
  const versions = ['1.2.3', '4.5.6', '7.8.9'];
  it('should return preloaded tag names for versions', () => {
    expect(getPreloadedTagNamesForVersions(versions)).toEqual({ '1.2.3': [], '4.5.6': [], '7.8.9': [] });
  });
  it('should call getPreloadedTagNamesForVersion() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersion');

    getPreloadedTagNamesForVersions(versions);

    expect(spy).toBeCalledTimes(3);
    expect(spy).toBeCalledWith('1.2.3');
    expect(spy).toBeCalledWith('4.5.6');
    expect(spy).toBeCalledWith('7.8.9');
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
    const pdsComponentsSelectorMock = 'somSelector';
    jest.spyOn(helperUtils, 'getPdsComponentsSelector').mockReturnValue(pdsComponentsSelectorMock);
    const spy = jest.spyOn(document, 'querySelectorAll');
    getUsedTagNamesForVersions(prefixesForVersion);

    expect(spy).toBeCalledWith(pdsComponentsSelectorMock);
  });

  // it('should call getTagNameWithoutPrefix() with correct parameter', () => {
  //   const el = document.createElement('p-text');
  //   const el1 = document.createElement('my-prefix-p-text');
  //   const el2 = document.createElement('my-prefix-p-text');
  //   document.body.appendChild(el);
  //   document.body.appendChild(el1);
  //   document.body.appendChild(el2);
  //   console.log(el.tagName);
  //
  //   const nodeList = document.childNodes as NodeListOf<Element>;
  //
  //   jest.spyOn(document, 'querySelectorAll').mockReturnValue();
  //   const spy = jest.spyOn(tagNameUtils, 'getTagNameWithoutPrefix');
  //   getUsedTagNamesForVersions(prefixesForVersion);
  //
  //   expect(spy).toHaveBeenNthCalledWith(1, 'p-text');
  //   expect(spy).toHaveBeenNthCalledWith(2, 'my-prefix-p-text');
  //   expect(spy).toHaveBeenNthCalledWith(3, 'my-prefix-p-text');
  //   expect(spy).toBeCalledTimes(3);
  // });

  it('should call return tagNames for each version without duplicates', () => {});
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
