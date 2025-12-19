import {
  CRESTS_CDN_BASE_PATH,
  CRESTS_MANIFEST,
  FLAGS_CDN_BASE_PATH,
  FLAGS_MANIFEST,
  FONT_FACE_CDN_BASE_PATH,
  FONT_FACE_CDN_FILE_CN,
  FONT_FACE_CDN_FILE_COM,
  FONTS_CDN_BASE_PATH,
  FONTS_MANIFEST,
  ICONS_CDN_BASE_PATH,
  ICONS_MANIFEST,
  MARQUES_CDN_BASE_PATH,
  MARQUES_MANIFEST,
  META_ICONS_CDN_BASE_PATH,
  META_ICONS_MANIFEST,
  MODEL_SIGNATURES_CDN_BASE_PATH,
  MODEL_SIGNATURES_MANIFEST,
} from '@porsche-design-system/assets';
import mime from 'mime';
import { describe, expect, test } from 'vitest';
import { CDN_BASE_PATH_COMPONENTS, CDN_BASE_URL_COM } from '../../../../../../cdn.config';
import { COMPONENT_CHUNKS_MANIFEST } from '../../../../projects/components-wrapper/lib/chunksManifest';

describe('cdn', () => {
  let fetchCounter = 0;

  function unpackObject(obj: Object): any[] {
    return typeof obj === 'object' ? Object.values(obj).map(unpackObject) : typeof obj === 'string' ? obj : null;
  }

  function objectToFlatArray(object: Object): string[] {
    return unpackObject(object)
      .flat(3)
      .filter((x) => x !== null);
  }

  function bulkRequestItems(chunks: string[], baseUrl: string): void {
    for (const chunk of chunks) {
      test(`should exist and have correct headers: ${chunk}`, async () => {
        const { status, headers } = await fetch(`${baseUrl}/${chunk}`);
        // Mime library returns application/javascript but should be text/javascript
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
        const ext = chunk.split('.').pop();
        const mimeType = ext === 'js' ? 'text/javascript' : mime.getType(ext);

        expect(status).toBe(200); // 200: OK
        expect(headers.get('content-type')).toBe(mimeType);
        expect(headers.get('access-control-allow-origin')).toBe('*');
        expect(headers.get('cache-control')).toBe('max-age=31536000');

        fetchCounter++;
      });
    }

    test(`should have all ${chunks.length} ${baseUrl.substring(baseUrl.lastIndexOf('/') + 1)}`, () => {
      expect(fetchCounter).toBe(chunks.length);
      fetchCounter = 0; // reset for upcoming test
    });
  }

  describe('components', () => {
    const chunks = objectToFlatArray(COMPONENT_CHUNKS_MANIFEST);
    const baseUrl = `${CDN_BASE_URL_COM}/${CDN_BASE_PATH_COMPONENTS}`;
    bulkRequestItems(chunks, baseUrl);
  });

  describe('crest', () => {
    const crests = objectToFlatArray(CRESTS_MANIFEST);
    bulkRequestItems(crests, `${CDN_BASE_URL_COM}${CRESTS_CDN_BASE_PATH}`);
  });

  describe('fonts', () => {
    const fonts = objectToFlatArray(FONTS_MANIFEST);
    bulkRequestItems(fonts, `${CDN_BASE_URL_COM}${FONTS_CDN_BASE_PATH}`);
  });

  describe('icons', () => {
    const icons = objectToFlatArray(ICONS_MANIFEST);
    bulkRequestItems(icons, `${CDN_BASE_URL_COM}${ICONS_CDN_BASE_PATH}`);
  });

  describe('flags', () => {
    const flags = objectToFlatArray(FLAGS_MANIFEST);
    bulkRequestItems(flags, `${CDN_BASE_URL_COM}${FLAGS_CDN_BASE_PATH}`);
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
    const styles = [FONT_FACE_CDN_FILE_COM, FONT_FACE_CDN_FILE_CN];
    bulkRequestItems(styles, `${CDN_BASE_URL_COM}${FONT_FACE_CDN_BASE_PATH}`);
  });
});
