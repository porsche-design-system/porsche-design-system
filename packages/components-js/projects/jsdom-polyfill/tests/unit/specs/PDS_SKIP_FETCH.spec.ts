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
    expect(await componentsReady()).toBe(1);

    const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

    expect(picture).toBeNull();
  });

  it('should not fetch crest asset', async () => {
    document.body.innerHTML = '<p-crest></p-crest>';
    expect(await componentsReady()).toBe(1);

    const picture = document.querySelector('p-crest').shadowRoot.querySelector('picture');

    expect(picture).toBeNull();
  });

  it('should not fetch icon asset', async () => {
    const spy = jest.spyOn(global, 'fetch');

    document.body.innerHTML = '<p-icon></p-icon>';
    expect(await componentsReady()).toBe(1);

    const img = document.querySelector('p-icon').shadowRoot.querySelector('img');

    expect(spy).not.toBeCalled();
    expect(img.src).toBe('');
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
    expect(await componentsReady()).toBe(1);

    const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

    expect(picture).not.toBeNull();
  });

  it('should fetch crest asset', async () => {
    document.body.innerHTML = '<p-crest></p-crest>';
    expect(await componentsReady()).toBe(1);

    const picture = document.querySelector('p-crest').shadowRoot.querySelector('picture');

    expect(picture).not.toBeNull();
  });

  it('should fetch icon asset', async () => {
    document.body.innerHTML = '<p-icon></p-icon>';
    expect(await componentsReady()).toBe(1);

    const img = document.querySelector('p-icon').shadowRoot.querySelector('img');

    expect(img.src).toBe(`http://localhost:3001/icons/${ICONS_MANIFEST['arrow-right']}`);
  });
});
