import { componentsReady } from '@porsche-design-system/components-js';
import { ICONS_MANIFEST } from '@porsche-design-system/assets';

let prevValue: boolean;

beforeAll(() => {
  prevValue = (window as any).PDS_SKIP_FETCH;
});

afterAll(() => {
  (window as any).PDS_SKIP_FETCH = prevValue;
});

describe('window.PDS_SKIP_FETCH = true', () => {
  beforeEach(() => {
    (window as any).PDS_SKIP_FETCH = true;
  });

  it('should not fetch font-face css', () => {
    const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');

    expect(link).toBeNull();
  });

  it('should not fetch marque asset', async () => {
    document.body.innerHTML = '<p-marque></p-marque>';
    await componentsReady();

    const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

    expect(picture).toBeNull();
  });

  it('should not fetch icon asset', async () => {
    const spy = jest.spyOn(global, 'fetch');

    document.body.innerHTML = '<p-icon></p-icon>';
    await componentsReady();

    // let's wait a little for the promise exception
    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(spy).not.toBeCalled();
  });
});

describe('window.PDS_SKIP_FETCH = false', () => {
  beforeEach(() => {
    (window as any).PDS_SKIP_FETCH = false;
  });

  // TODO: cant' get this since this is skipped in the jsdom-polyfill entry
  xit('should fetch font-face css', () => {
    const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');
    console.log(link);

    expect(link).not.toBeNull();
  });

  it('should fetch marque asset', async () => {
    document.body.innerHTML = '<p-marque></p-marque>';
    await componentsReady();

    const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

    expect(picture).not.toBeNull();
  });

  // TODO: requestCache of icon-utils.ts is already set from previous test..
  xit('should fetch icon asset', async () => {
    const spy = jest.spyOn(global, 'fetch');
    console.log('yo', (window as any).PDS_SKIP_FETCH);
    document.body.innerHTML = '<p-icon></p-icon>';
    await componentsReady();

    // let's wait a little for the promise exception
    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(spy).toBeCalledWith(`http://localhost:3001/icons/${ICONS_MANIFEST.arrowHeadRight}`, undefined);
  });
});
