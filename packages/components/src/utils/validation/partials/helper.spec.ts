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
import * as detectDuplicatesUtils from '../../is-already-in-array';

declare global {
  interface Document {
    porscheDesignSystem: {
      [key: `${number}.${number}.${number}`]: {
        prefixes: string[];
        isReady: () => Promise<void>;
        readyResolve: () => void;
      };
      cdn: {
        url: string;
        prefixes: string[]; // to not break older versions
      };
    };
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

  it('should return all preloaded tag names belonging to one core chunk link if nextSibling.href includes "porsche-design-system."', () => {
    [
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.text.6c494c2050a87f393ea4.js',
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.accordion.672e1be1ea3640e24667.js',
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.link-pure.6194d2792ab5808e241b.js',
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.v2.17.0.9a579f8ff7708b1885a9.js', // Next core chunk
      'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.grid.f471d5944c4c0bc0bcb5.js',
    ].forEach((href) => {
      const link = document.createElement('link');
      link.href = href;
      document.head.appendChild(link);
    });

    expect(getPreloadedTagNamesForCoreChunk(coreChunkLinkElement)).toEqual(['p-text', 'p-accordion', 'p-link-pure']);
  });
});

describe('getPreloadedTagNamesForVersion()', () => {
  const version = '1.2.3';

  it('should call document.querySelector() with correct parameters', () => {
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

  it('should return empty [] for version if no core chunk link is found', () => {
    expect(getPreloadedTagNamesForVersion(version)).toEqual([]);
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

  it('should call getPreloadedTagNamesForVersion() with correct parameters', () => {
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersion');
    getPreloadedTagNamesForVersions(versions);

    expect(spy).toBeCalledWith('1.2.3');
    expect(spy).toBeCalledWith('4.5.6');
    expect(spy).toBeCalledWith('7.8.9');
    expect(spy).toBeCalledTimes(3);
  });
});

describe('getPdsComponentsSelector()', () => {
  it('should return joined TAG_NAMES_WITH_CHUNK if no prefixes are passed', () => {
    expect(getPdsComponentsSelector([''])).toMatchInlineSnapshot(`"p-accordion,p-banner,p-button,p-button-group,p-button-pure,p-button-tile,p-carousel,p-checkbox-wrapper,p-content-wrapper,p-crest,p-display,p-divider,p-fieldset,p-fieldset-wrapper,p-flex,p-flyout,p-grid,p-heading,p-headline,p-icon,p-inline-notification,p-link,p-link-pure,p-link-social,p-link-tile,p-link-tile-model-signature,p-marque,p-modal,p-model-signature,p-multi-select,p-pagination,p-pin-code,p-popover,p-radio-button-wrapper,p-scroller,p-segmented-control,p-select-wrapper,p-spinner,p-stepper-horizontal,p-switch,p-table,p-tabs,p-tabs-bar,p-tag,p-tag-dismissible,p-text,p-text-field-wrapper,p-text-list,p-textarea-wrapper,p-toast,p-wordmark"`);
  });

  it('should return joined and prefixed TAG_NAMES_WITH_CHUNK for passed prefixes', () => {
    expect(getPdsComponentsSelector(['my-prefix', 'some-prefix'])).toMatchInlineSnapshot(`"my-prefix-p-accordion,my-prefix-p-banner,my-prefix-p-button,my-prefix-p-button-group,my-prefix-p-button-pure,my-prefix-p-button-tile,my-prefix-p-carousel,my-prefix-p-checkbox-wrapper,my-prefix-p-content-wrapper,my-prefix-p-crest,my-prefix-p-display,my-prefix-p-divider,my-prefix-p-fieldset,my-prefix-p-fieldset-wrapper,my-prefix-p-flex,my-prefix-p-flyout,my-prefix-p-grid,my-prefix-p-heading,my-prefix-p-headline,my-prefix-p-icon,my-prefix-p-inline-notification,my-prefix-p-link,my-prefix-p-link-pure,my-prefix-p-link-social,my-prefix-p-link-tile,my-prefix-p-link-tile-model-signature,my-prefix-p-marque,my-prefix-p-modal,my-prefix-p-model-signature,my-prefix-p-multi-select,my-prefix-p-pagination,my-prefix-p-pin-code,my-prefix-p-popover,my-prefix-p-radio-button-wrapper,my-prefix-p-scroller,my-prefix-p-segmented-control,my-prefix-p-select-wrapper,my-prefix-p-spinner,my-prefix-p-stepper-horizontal,my-prefix-p-switch,my-prefix-p-table,my-prefix-p-tabs,my-prefix-p-tabs-bar,my-prefix-p-tag,my-prefix-p-tag-dismissible,my-prefix-p-text,my-prefix-p-text-field-wrapper,my-prefix-p-text-list,my-prefix-p-textarea-wrapper,my-prefix-p-toast,my-prefix-p-wordmark,some-prefix-p-accordion,some-prefix-p-banner,some-prefix-p-button,some-prefix-p-button-group,some-prefix-p-button-pure,some-prefix-p-button-tile,some-prefix-p-carousel,some-prefix-p-checkbox-wrapper,some-prefix-p-content-wrapper,some-prefix-p-crest,some-prefix-p-display,some-prefix-p-divider,some-prefix-p-fieldset,some-prefix-p-fieldset-wrapper,some-prefix-p-flex,some-prefix-p-flyout,some-prefix-p-grid,some-prefix-p-heading,some-prefix-p-headline,some-prefix-p-icon,some-prefix-p-inline-notification,some-prefix-p-link,some-prefix-p-link-pure,some-prefix-p-link-social,some-prefix-p-link-tile,some-prefix-p-link-tile-model-signature,some-prefix-p-marque,some-prefix-p-modal,some-prefix-p-model-signature,some-prefix-p-multi-select,some-prefix-p-pagination,some-prefix-p-popover,some-prefix-p-radio-button-wrapper,some-prefix-p-scroller,some-prefix-p-segmented-control,some-prefix-p-select-wrapper,some-prefix-p-spinner,some-prefix-p-stepper-horizontal,some-prefix-p-switch,some-prefix-p-table,some-prefix-p-tabs,some-prefix-p-tabs-bar,some-prefix-p-tag,some-prefix-p-tag-dismissible,some-prefix-p-text,some-prefix-p-text-field-wrapper,some-prefix-p-text-list,some-prefix-p-textarea-wrapper,some-prefix-p-toast,some-prefix-p-wordmark"`);
  });
});

describe('getUsedTagNamesForVersions()', () => {
  describe("when prefix 'phn' and phn-header is not found", () => {
    const prefixesForVersion = { '1.2.3': ['', 'my-prefix', 'some-prefix'], '1.2.4': ['', 'my-prefix', 'some-prefix'] };

    it('should call getPdsComponentsSelector() with correct parameters', () => {
      const spy = jest.spyOn(helperUtils, 'getPdsComponentsSelector');
      getUsedTagNamesForVersions(prefixesForVersion);

      expect(spy).toBeCalledWith(prefixesForVersion['1.2.3']);
      expect(spy).toBeCalledWith(prefixesForVersion['1.2.4']);
      expect(spy).toBeCalledTimes(2);
    });

    it('should call document.querySelectorAll() with correct parameters', () => {
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
      getUsedTagNamesForVersions({ '1.2.3': ['p-text', 'my-prefix-p-text'] }); // Pass only one version to reduce number of calls

      expect(spy).toBeCalledWith(el, 0, mockReturnValue);
      expect(spy).toBeCalledWith(el1, 1, mockReturnValue);
      expect(spy).toBeCalledWith(el2, 2, mockReturnValue);
      expect(spy).toBeCalledTimes(3);
    });

    it('should call document.querySelector() with correct parameters', () => {
      const spy = jest.spyOn(document, 'querySelector');
      getUsedTagNamesForVersions(prefixesForVersion);

      expect(spy).toBeCalledWith('phn-header');
    });

    it('should call isAlreadyInArray() with correct parameters and return tagNames for each version without duplicates', () => {
      const el = document.createElement('p-text');
      const mockReturnValueArrayFrom = [el];
      jest.spyOn(Array, 'from').mockReturnValue(mockReturnValueArrayFrom);
      const mockReturnValueMap: TagName[] = ['p-text', 'p-text', 'p-button', 'p-button', 'p-link'];
      jest.spyOn(mockReturnValueArrayFrom, 'map').mockReturnValue(mockReturnValueMap);
      const spy = jest.spyOn(detectDuplicatesUtils, 'isAlreadyInArray');

      expect(
        getUsedTagNamesForVersions({
          '1.2.3': [''],
          '1.2.4': [''],
        })
      ).toEqual({
        '1.2.3': ['p-text', 'p-button', 'p-link'],
        '1.2.4': ['p-text', 'p-button', 'p-link'],
      });
      expect(spy).toBeCalledWith('p-text', 0, ['p-text', 'p-text', 'p-button', 'p-button', 'p-link']);
      expect(spy).toBeCalledWith('p-text', 1, ['p-text', 'p-text', 'p-button', 'p-button', 'p-link']);
      expect(spy).toBeCalledWith('p-button', 2, ['p-text', 'p-text', 'p-button', 'p-button', 'p-link']);
      expect(spy).toBeCalledWith('p-button', 3, ['p-text', 'p-text', 'p-button', 'p-button', 'p-link']);
      expect(spy).toBeCalledWith('p-link', 4, ['p-text', 'p-text', 'p-button', 'p-button', 'p-link']);
      expect(spy).toBeCalledTimes(10); // isAlreadyInArray() is called for each version
    });
  });

  describe("when prefix 'phn' and phn-header is found", () => {
    const prefixesForVersion = { '1.2.3': ['', 'phn'] };

    const phnHeader = document.createElement('phn-header');
    phnHeader.attachShadow({ mode: 'open' });
    document.body.appendChild(phnHeader);
    const child = document.createElement('phn-p-button');
    phnHeader.shadowRoot.append(child);

    it('should call querySelectorAll() with correct parameters', () => {
      const pdsComponentsSelectorMock = 'someSelector';
      jest.spyOn(helperUtils, 'getPdsComponentsSelector').mockReturnValue(pdsComponentsSelectorMock);
      const spy = jest.spyOn(document, 'querySelectorAll');
      getUsedTagNamesForVersions(prefixesForVersion);

      expect(spy).toBeCalledWith(pdsComponentsSelectorMock);
    });

    it('should call getTagNameWithoutPrefix() with correct parameters', () => {
      const el = document.createElement('phn-p-text');
      const el1 = document.createElement('phn-p-text');
      const el2 = document.createElement('phn-p-text');
      const mockReturnValue = [el, el1, el2];
      jest.spyOn(Array, 'from').mockReturnValueOnce([]); // first Array.from() call is not relevant for this unit test
      jest.spyOn(Array, 'from').mockReturnValue(mockReturnValue);
      const spy = jest.spyOn(tagNameUtils, 'getTagNameWithoutPrefix');
      getUsedTagNamesForVersions(prefixesForVersion);

      expect(spy).toBeCalledWith(el, 0, mockReturnValue);
      expect(spy).toBeCalledWith(el1, 1, mockReturnValue);
      expect(spy).toBeCalledWith(el2, 2, mockReturnValue);
      expect(spy).toBeCalledTimes(3);
    });

    it('should call isAlreadyInArray() with correct parameters and return all tagNames for each version without duplicates', () => {
      const el = document.createElement('p-button');
      document.body.append(el);
      const elShadow = document.createElement('phn-p-button');
      phnHeader.shadowRoot.append(elShadow);
      const spy = jest.spyOn(detectDuplicatesUtils, 'isAlreadyInArray');

      expect(
        getUsedTagNamesForVersions({
          '1.2.3': ['', 'phn'],
        })
      ).toEqual({
        '1.2.3': ['p-button'],
      });
      expect(spy).toBeCalledWith('p-button', 0, ['p-button', 'p-button', 'p-button']);
      expect(spy).toBeCalledWith('p-button', 1, ['p-button', 'p-button', 'p-button']);
      expect(spy).toBeCalledWith('p-button', 2, ['p-button', 'p-button', 'p-button']);
      expect(spy).toBeCalledTimes(3);
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
});

describe('getPorscheDesignSystemPrefixesForVersions()', () => {
  it('should return prefix[] for PDS versions registered on document', () => {
    const sharedProps = {
      readyResolve: () => {},
      isReady: Promise.resolve,
    };
    document.porscheDesignSystem = {
      cdn: { url: 'local', prefixes: [] },
      '1.2.3': { ...sharedProps, prefixes: [''] },
      '1.2.4': { ...sharedProps, prefixes: ['prefix', 'another-prefix'] },
      '1.2.5': { ...sharedProps, prefixes: ['prefix', 'another-prefix'] },
    };

    expect(getPorscheDesignSystemPrefixesForVersions()).toEqual({
      '1.2.3': [''],
      '1.2.4': ['prefix', 'another-prefix'],
      '1.2.5': ['prefix', 'another-prefix'],
    });
  });
});
