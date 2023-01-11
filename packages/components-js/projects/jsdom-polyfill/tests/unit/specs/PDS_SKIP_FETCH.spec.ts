import { componentsReady } from '@porsche-design-system/components-js';

const prevValue = (window as any).PDS_SKIP_FETCH;
beforeAll(() => {
  (window as any).PDS_SKIP_FETCH = true;
});

afterAll(() => {
  (window as any).PDS_SKIP_FETCH = prevValue;
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
