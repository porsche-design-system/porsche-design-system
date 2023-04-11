import type { Page } from 'puppeteer';
import {
  CRESTS_CDN_BASE_URL,
  CRESTS_MANIFEST,
  FALLBACKS_MANIFEST,
  FALLBACKS_CDN_BASE_URL,
  FONTS_CDN_BASE_URL,
  FONTS_MANIFEST,
  ICONS_CDN_BASE_URL,
  ICONS_MANIFEST,
  MARQUES_CDN_BASE_URL,
  MARQUES_MANIFEST,
  META_ICONS_CDN_BASE_URL,
  META_ICONS_MANIFEST,
  MODEL_SIGNATURES_MANIFEST,
  MODEL_SIGNATURES_CDN_BASE_URL,
} from '@porsche-design-system/assets';
import { getFontFaceStylesheet } from '@porsche-design-system/components-js/partials';
import { COMPONENT_CHUNKS_MANIFEST } from '../../../projects/components-wrapper/lib/chunksManifest';
import { CDN_BASE_PATH_COMPONENTS, CDN_BASE_PATH_STYLES, CDN_BASE_URL } from '../../../../../cdn.config';
import { setContentWithDesignSystem } from '../helpers';

describe('cdn', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type RequestType = { url: string };
  type ResponseType = { url: string; status: number };
  const requests: RequestType[] = [];
  const responses: ResponseType[] = [];

  beforeEach(async () => {
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);

    requests.length = 0; // clear old array
    responses.length = 0; // clear old array

    page.removeAllListeners('request');
    page.removeAllListeners('response');

    page.on('request', (req) => {
      const url = req.url();

      if (url.includes('cdn.ui.porsche')) {
        requests.push({ url });
      }
      req.continue();
    });

    page.on('response', (resp) => {
      const url = resp.url();
      const status = resp.status();

      if (url.includes('cdn.ui.porsche')) {
        // console.log(status, url);
        responses.push({ url, status });
      }
    });
  });

  const isStatusNot200 = (item: Response): boolean => item.status !== 200;
  const isStatus400 = (item: Response): boolean => item.status === 400;
  const urlIncludes =
    (str: string) =>
    (item: Response): boolean =>
      item.url.includes(str);
  const urlStartsWith =
    (str: string) =>
    (item: Response): boolean =>
      item.url.startsWith(str);
  const fetchUrl = (url: string): Promise<void> =>
    page.evaluate(async (url: string) => {
      await fetch(url);
    }, url);

  describe('.com and .cn domains', () => {
    const assetPaths = {
      components: 'components/porsche-design-system.v',
      styles: 'styles/font-face.min.',
      icons: 'icons/arrow-right.min.',
      fonts: 'fonts/porsche-next-w-la-regular.min.',
      marque: 'marque/porsche-marque-trademark.medium.min.',
    };

    const content = `
<p-content-wrapper>
  <p-marque></p-marque>
  <p-heading size="xx-large">Some Headline</p-heading>
  <p-button icon="arrow-right">Some label</p-button>
</p-content-wrapper>`;

    it('should request from .com cdn for { cdn: "auto" } when outside of china', async () => {
      await setContentWithDesignSystem(page, content, 'auto');

      const cdnDomain = 'cdn.ui.porsche.com';
      const baseUrl = `https://${cdnDomain}/porsche-design-system`;

      expect(requests.length).toBe(responses.length);
      expect(responses.filter(isStatusNot200).length).toBe(0);
      expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.styles}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.marque}`)).length).toBe(1);

      const responseErrors = responses.filter(isStatus400);
      if (responseErrors.length) {
        console.log('status 400', responseErrors);
      }
    });

    it('should request always from .cn cdn for { cdn: "cn" }', async () => {
      await setContentWithDesignSystem(page, content, 'cn');

      const cdnDomain = 'cdn.ui.porsche.cn';
      const baseUrl = `https://${cdnDomain}/porsche-design-system`;

      expect(requests.length).toBe(responses.length);
      expect(responses.filter(isStatusNot200).length).toBe(0);
      expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.styles}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
      expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.marque}`)).length).toBe(1);

      const responseErrors = responses.filter(isStatus400);
      if (responseErrors.length) {
        console.log('status 400', responseErrors);
      }
    });
  });

  describe('assets', () => {
    let responseCounter = 0;

    const unpackObject = (obj: Object) => (typeof obj === 'object' ? Object.values(obj).map(unpackObject) : obj);

    const objectToFlatArray = (object: Object): string[] =>
      unpackObject(object)
        // @ts-ignore
        .flat(3);

    const bulkRequestItems = (items: string[], baseUrl: string) => {
      for (const item of items) {
        ((item: string) => {
          it(`should exist: ${item}`, async () => {
            await fetchUrl(`${baseUrl}/${item}`);
            expect(responses.filter(isStatusNot200).length).toBe(0);
            responseCounter += responses.length;

            const responseErrors = responses.filter(isStatus400);
            if (responseErrors.length) {
              console.log('status 400', responseErrors);
            }
          });
        })(item);
      }

      it(`should have all ${items.length} ${baseUrl.substring(baseUrl.lastIndexOf('/') + 1)}`, () => {
        expect(responseCounter).toBe(items.length);
        responseCounter = 0; // reset for upcoming test
      });
    };

    describe('components', () => {
      const chunks = objectToFlatArray(COMPONENT_CHUNKS_MANIFEST);
      const baseUrl = `${CDN_BASE_URL}/${CDN_BASE_PATH_COMPONENTS}`;
      bulkRequestItems(chunks, baseUrl);
    });

    describe('crest', () => {
      const crests = objectToFlatArray(CRESTS_MANIFEST);
      bulkRequestItems(crests, CRESTS_CDN_BASE_URL);
    });

    describe('fallbacks', () => {
      const fallbacks = objectToFlatArray(FALLBACKS_MANIFEST);
      bulkRequestItems(fallbacks, FALLBACKS_CDN_BASE_URL);
    });

    describe('fonts', () => {
      const fonts = objectToFlatArray(FONTS_MANIFEST);
      bulkRequestItems(fonts, FONTS_CDN_BASE_URL);
    });

    describe('icons', () => {
      const icons = objectToFlatArray(ICONS_MANIFEST);
      bulkRequestItems(icons, ICONS_CDN_BASE_URL);
    });

    describe('marque', () => {
      const marques = objectToFlatArray(MARQUES_MANIFEST);
      bulkRequestItems(marques, MARQUES_CDN_BASE_URL);
    });

    describe('meta-icons', () => {
      const metaIcons = objectToFlatArray(META_ICONS_MANIFEST);
      bulkRequestItems(metaIcons, META_ICONS_CDN_BASE_URL);
    });

    describe('model-signatures', () => {
      const modelSignatures = objectToFlatArray(MODEL_SIGNATURES_MANIFEST);
      bulkRequestItems(modelSignatures, MODEL_SIGNATURES_CDN_BASE_URL);
    });

    describe('styles', () => {
      // retrieve css file names via partial since FONT_FACE_CDN_URL returns different value based on flag in window
      const comStyle = getFontFaceStylesheet({ cdn: 'auto' });
      const cnStyle = getFontFaceStylesheet({ cdn: 'cn' });

      // extract file name from full path
      const getFileName = (path: string): string => {
        path = path.replace(/(.*)(https:\/\/[a-z0-9./-]+\.css)(.*)/, '$2');
        return path.substring(path.lastIndexOf('/') + 1);
      };

      const styles = [comStyle, cnStyle].map(getFileName);
      const baseUrl = `${CDN_BASE_URL}/${CDN_BASE_PATH_STYLES}`;
      bulkRequestItems(styles, baseUrl);
    });
  });
});
