import { newSpecPage } from '@stencil/core/testing';
import { Marque } from '../../../src/components/basic/marque/marque';
import { CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';

describe('Component <p-marque>', () => {
  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Marque],
      html: `<p-marque></p-marque>`
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-marque')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-marque')).toBeTruthy();
  });

  it('should have every png from manifest on cdn', async () => {
    const fileNames = Object.keys(MARQUES_MANIFEST)
      .map((marqueKey) =>
        Object.keys(MARQUES_MANIFEST[marqueKey]).map((sizeKey) =>
          Object.keys(MARQUES_MANIFEST[marqueKey][sizeKey]).map(
            (resKey) => MARQUES_MANIFEST[marqueKey][sizeKey][resKey]
          )
        )
      )
      // @ts-ignore
      .flat(2);

    let cdnResponseCounter = 0;
    await Promise.all(
      fileNames.map(async (fileName) => {
        const marque = await fetch(`${CDN_BASE_URL}/${fileName}`);
        expect(marque).toBeDefined();
        expect(marque.headers.get('content-type')).toBe('image/png');
        cdnResponseCounter++;
      })
    );
    expect(cdnResponseCounter).toEqual(fileNames.length);
  });
});
