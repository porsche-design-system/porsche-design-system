import type { Page } from 'puppeteer';
import {
  CRESTS_CDN_BASE_PATH,
  CRESTS_MANIFEST,
  FALLBACKS_MANIFEST,
  FALLBACKS_CDN_BASE_PATH,
  FONTS_CDN_BASE_PATH,
  FONTS_MANIFEST,
  ICONS_CDN_BASE_PATH,
  ICONS_MANIFEST,
  MARQUES_CDN_BASE_PATH,
  MARQUES_MANIFEST,
  META_ICONS_CDN_BASE_PATH,
  META_ICONS_MANIFEST,
  MODEL_SIGNATURES_MANIFEST,
  MODEL_SIGNATURES_CDN_BASE_PATH,
} from '@porsche-design-system/assets';
import { getFontFaceStylesheet } from '@porsche-design-system/components-js/partials';
import { COMPONENT_CHUNKS_MANIFEST } from '../../../../projects/components-wrapper/lib/chunksManifest';
import { CDN_BASE_PATH_COMPONENTS, CDN_BASE_PATH_STYLES, CDN_BASE_URL_COM } from '../../../../../../cdn.config';
import { setContentWithDesignSystem } from './helpers';
import * as mime from 'mime';

describe('cdn', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type RequestType = { url: string };
  type ResponseType = { url: string; status: number; headers: Record<string, string> };
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
      const headers = resp.headers();

      if (url.includes('cdn.ui.porsche')) {
        // console.log(status, url);
        responses.push({ url, status, headers });
      }
    });
  });

  const isStatusNot200 = (item: ResponseType, _index: number, _arr: ResponseType[]): boolean => item.status !== 200;
  const isStatus400 = (item: ResponseType, _index: number, _arr: ResponseType[]): boolean => item.status === 400;
  const urlIncludes =
    (str: string) =>
    (item: ResponseType, _index: number, _arr: ResponseType[]): boolean =>
      item.url.includes(str);
  const urlStartsWith =
    (str: string) =>
    (item: ResponseType, _index: number, _arr: ResponseType[]): boolean =>
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
          it(`should exist and have correct headers: ${item}`, async () => {
            await fetchUrl(`${baseUrl}/${item}`);

            expect(responses.filter(isStatusNot200).length).toBe(0);
            responses.forEach((response) => {
              const ext = item.split('.').pop();
              // Mime library returns application/javascript but should be text/javascript
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
              const mimeType = ext === 'js' ? 'text/javascript' : mime.getType(ext);
              expect(response.headers['content-type']).toBe(mimeType);
              expect(response.headers['access-control-allow-origin']).toBe('*');
            });
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
      const baseUrl = `${CDN_BASE_URL_COM}/${CDN_BASE_PATH_COMPONENTS}`;
      bulkRequestItems(chunks, baseUrl);
    });

    describe('crest', () => {
      const crests = objectToFlatArray(CRESTS_MANIFEST);
      bulkRequestItems(crests, `${CDN_BASE_URL_COM}${CRESTS_CDN_BASE_PATH}`);
    });

    describe('fallbacks', () => {
      const fallbacks = objectToFlatArray(FALLBACKS_MANIFEST);
      bulkRequestItems(fallbacks, `${CDN_BASE_URL_COM}${FALLBACKS_CDN_BASE_PATH}`);
    });

    describe('fonts', () => {
      const fonts = objectToFlatArray(FONTS_MANIFEST);
      bulkRequestItems(fonts, `${CDN_BASE_URL_COM}${FONTS_CDN_BASE_PATH}`);
    });

    describe('icons', () => {
      const icons = objectToFlatArray(ICONS_MANIFEST);
      bulkRequestItems(icons, `${CDN_BASE_URL_COM}${ICONS_CDN_BASE_PATH}`);
    });

    describe('marque', () => {
      const marques = objectToFlatArray(MARQUES_MANIFEST);
      bulkRequestItems(marques, `${CDN_BASE_URL_COM}${MARQUES_CDN_BASE_PATH}`);
    });

    describe('meta-icons', () => {
      const metaIcons = objectToFlatArray(META_ICONS_MANIFEST);
      bulkRequestItems(metaIcons, `${CDN_BASE_URL_COM}${META_ICONS_CDN_BASE_PATH}`);
    });

    describe('model-signatures', () => {
      const modelSignatures = objectToFlatArray(MODEL_SIGNATURES_MANIFEST);
      bulkRequestItems(modelSignatures, `${CDN_BASE_URL_COM}${MODEL_SIGNATURES_CDN_BASE_PATH}`);
    });

    describe('styles', () => {
      // retrieve css file names via partial
      const comStyle = getFontFaceStylesheet({ cdn: 'auto' });
      const cnStyle = getFontFaceStylesheet({ cdn: 'cn' });

      // extract file name from full path
      const getFileName = (path: string): string => {
        path = path.replace(/(.*)(https:\/\/[a-z0-9./-]+\.css)(.*)/, '$2');
        return path.substring(path.lastIndexOf('/') + 1);
      };

      const styles = [comStyle, cnStyle].map(getFileName);
      const baseUrl = `${CDN_BASE_URL_COM}/${CDN_BASE_PATH_STYLES}`;
      bulkRequestItems(styles, baseUrl);
    });
  });
});
