import { newSpecPage } from '@stencil/core/testing';
import { Marque } from '../../../src/components/basic/marque/marque';
import { MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/assets';

describe('Component <p-marque>', () => {
  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Marque],
      html: `<p-marque></p-marque>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('picture')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('picture')).toBeTruthy();
  });

  it('should have every png from manifest on cdn', async () => {
    const fileNames = Object.values(MARQUES_MANIFEST)
      .map((x) => Object.values(x).map(Object.values))
      // @ts-ignore
      .flat(2);

    let cdnResponseCounter = 0;
    await Promise.all(
      fileNames.map(async (fileName) => {
        const marque = await fetch(`${MARQUES_CDN_BASE_URL}/${fileName}`);
        expect(marque).toBeDefined();
        expect(marque.headers.get('content-type')).toBe('image/png');
        cdnResponseCounter++;
      })
    );
    expect(cdnResponseCounter).toEqual(fileNames.length);
  });
});
